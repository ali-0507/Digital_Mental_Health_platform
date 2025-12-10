const crypto = require("crypto");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Session = require("../models/Session");

// helper: Generate Access Token
const signAccessToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m" }
  );
};

// Generate Refresh Token
const signRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id},
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d" }
  );
};
  // Hash refresh token before storing (in case DB is leaked)
  const hashToken = (t) => crypto.createHash("sha256").update(t).digest("hex");

  // send refresh token in a secure HTTP-only cookie
  const setRefreshCookie = (res, token) => {
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000; // sync with REFRESH_TOKEN_EXPIRES if you change it
  res.cookie("rt", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "lax", // later write none ...production time
    path: "/", // cookie is only sent to refresh endpoint
    maxAge: maxAgeMs,
  });
};
  
exports.signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const role = "user"; // default role

     // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }


     // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }  

    const user = await User.create({ name, username, email, password, role });

    // issue tokens
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    // store hashed refresh token in DB
      await Session.create({
      user: user._id,
      tokenHash: hashToken(refreshToken),
      userAgent: req.get("user-agent"),
      ip: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // set refresh token in cookie
    setRefreshCookie(res, refreshToken);

    return res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
 
// Login with username or email
exports.login = async (req, res) => {
  try {
    const  usernameOrEmail = req.body.usernameOrEmail || req.body.email || req.body.username;
    const  {password } = req.body;
    if (!usernameOrEmail || !password)
      return res.status(400).json({ message: "Missing credentials" });


    // allow login with username OR email //  find user by username or email
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    }).select("+password");


    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    
    // Compare entered password with stored hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

   // issue tokens
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    // store hashed refresh token in DB
      await Session.create({
      user: user._id,
      tokenHash: hashToken(refreshToken),
      userAgent: req.get("user-agent"),
      ip: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // set refresh token in cookie
    setRefreshCookie(res, refreshToken);

    return res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};





// ---- new: refresh access token (with rotation) ----
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.rt;
    if (!token) return res.status(401).json({ message: "Missing refresh token" });

    // verify refresh token
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // check DB session
    const existing = await Session.findOne({
      user: payload.userId,
      tokenHash: hashToken(token),
    });
    if (!existing) return res.status(403).json({ message: "Refresh token revoked" });

    // rotate: delete old, create new
    await Session.deleteOne({ _id: existing._id });

    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    const newAccess = signAccessToken(user);
    const newRefresh = signRefreshToken(user);

    await Session.create({
      user: user._id,
      tokenHash: hashToken(newRefresh),
      userAgent: req.get("user-agent"),
      ip: req.ip,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    setRefreshCookie(res, newRefresh);

    return res.json({ accessToken: newAccess });
  } catch (err) {
    console.error("Refresh error:", err.message);
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};


//logout current device
exports.logout = async (req, res) => {
  try {
    const token = req.cookies?.rt;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        await Session.deleteOne({ user: payload.userId, tokenHash: hashToken(token) });
      } catch { /* ignore invalid */ }
    }

    res.clearCookie("rt", { path: "/api/auth/refresh" });
    return res.json({ message: "Logged out" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};


// For testing protected route
exports.me = async (req, res) => {
  // protect middleware attaches req.user
  return res.json({ user: req.user });
};
