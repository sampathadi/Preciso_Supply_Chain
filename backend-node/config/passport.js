const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

module.exports = function configurePassport(app) {
  app.use(passport.initialize());

  // Google
  // Google (register only if credentials present)
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] && profile.emails[0].value;
      if (!email) return done(new Error('No email from Google')); 
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ name: profile.displayName || email.split('@')[0], email });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
    }));
  } else {
    console.warn('Google OAuth not configured: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing');
  }

  // Microsoft
  // Microsoft (register only if credentials present)
  if (process.env.MICROSOFT_CLIENT_ID && process.env.MICROSOFT_CLIENT_SECRET) {
    passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/microsoft/callback`,
    scope: ['user.read']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0];
      if (!email) return done(new Error('No email from Microsoft'));
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({ name: profile.displayName || email.split('@')[0], email });
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
    }));
  } else {
    console.warn('Microsoft OAuth not configured: MICROSOFT_CLIENT_ID or MICROSOFT_CLIENT_SECRET missing');
  }

  // helper to create jwt and redirect
  app.generateAndRedirect = function (res, user) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const redirect = `${FRONTEND_URL}/oauth-success?token=${token}`;
    return res.redirect(redirect);
  };
};
