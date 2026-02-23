const express = require('express');
const passport = require('passport');

const router = express.Router();

// start Google auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err || !user) return res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/login');
    // generate token and redirect
    req.app.generateAndRedirect(res, user);
  })(req, res, next);
});

// start Microsoft auth
router.get('/microsoft', passport.authenticate('microsoft'));

// Microsoft callback
router.get('/microsoft/callback', (req, res, next) => {
  passport.authenticate('microsoft', (err, user) => {
    if (err || !user) return res.redirect((process.env.FRONTEND_URL || 'http://localhost:3000') + '/login');
    req.app.generateAndRedirect(res, user);
  })(req, res, next);
});

module.exports = router;
