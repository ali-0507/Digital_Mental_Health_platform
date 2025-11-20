exports.authorize = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({ message: "Unauthenticated" });
  }
  if (!allowedRoles || allowedRoles.length === 0) {
    return next();
  }
    const userRoles = Array.isArray(req.user.roles) ? req.user.roles : [req.user.role].filter(Boolean);
    const allowed = allowedRoles.some((r) => userRoles.includes(r));
    if (!allowed) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
