
const mongoose = require("mongoose");
//Imports Mongoose, the ODM (Object Data Mapper) for MongoDB. Used to define schemas and models.
const bcrypt = require("bcryptjs"); 
//Imports bcryptjs for hashing and comparing passwords.

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },      // friendly field (use name)
  username: { type: String, required: true, unique: true, trim: true }, // keep exists
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["user","counselor","admin"], default: "user" },
  // createdAt: { type: Date, default: Date.now }
});

// Hash password before save (only if changed)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
