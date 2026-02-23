require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email) {
    console.error('Usage: node scripts/checkUser.js <email> [password]');
    process.exit(1);
  }

  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/enterprise-supply_chain_db';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to Mongo');

  const user = await User.findOne({ email }).lean();
  if (!user) {
    console.log('User not found for', email);
    process.exit(0);
  }

  console.log('User:', { id: user._id.toString(), email: user.email, name: user.name, role: user.role, hasPassword: !!user.password });

  if (password) {
    if (!user.password) {
      console.log('No password set for this user (probably OAuth-created)');
    } else {
      const match = await bcrypt.compare(password, user.password);
      console.log('Password match:', match);
    }
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
