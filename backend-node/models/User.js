const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    resetToken: { type: String },
    resetExpires: { type: Date },
    role: { type: String, enum: ["admin", "analyst"], default: "analyst" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
