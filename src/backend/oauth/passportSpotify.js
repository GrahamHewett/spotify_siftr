// const express = require('express');
// const app = express();

const app = require('express')();
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(
	new SpotifyStrategy(
	  {
		clientID: '9a83fea5e2d04504a311aee6166ef775',
		clientSecret: '92955232e75842e8ae6049bf18fbbba7',
		callbackURL: 'http://localhost:8888/auth/spotify/callback'
	  },
	  function(accessToken, refreshToken, expires_in, profile, done) {
		User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
		  return done(err, user);
		});
	  }
	)
  );

  app.get('/auth/spotify', passport.authenticate('spotify', {
	scope: ['user-read-email', 'user-read-private', 'playlist-modify-private', 'playlist-modify-public'],  
	showDialog: true
  }), function(req, res) {
	// The request will be redirected to spotify for authentication, so this
	// function will not be called.
  });
  
  app.get(
	'/auth/spotify/callback',
	passport.authenticate('spotify', { failureRedirect: '/login' }),
	function(req, res) {
	  // Successful authentication, redirect home.
	  res.redirect('/');
	}
  );

// Testing npm install --dev
// make test