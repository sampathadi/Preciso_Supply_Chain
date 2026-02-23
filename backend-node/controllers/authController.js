const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  console.log("BODY RECEIVED:", req.body);   // 👈 VERY IMPORTANT

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("USER FOUND:", user);         // 👈 VERY IMPORTANT

    if (!user) return res.status(400).json({ message: "Invalid credentials (user not found)" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);  // 👈 VERY IMPORTANT

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials (password wrong)" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${FRONTEND_URL}/reset?token=${token}`;
    // In a real app send email. Here we log the link for development.
    console.log(`Password reset for ${email}: ${resetUrl}`);

    res.json({ message: 'If the email exists, a reset link will be sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({ resetToken: token, resetExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.resetExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

