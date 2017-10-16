const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../models/User');
module.exports = router;


// const googleConfig = {
// 	clientId: process.env.GOOGLE_CLIENT_ID,
// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 	callBackURL: process.env.GOOGLE_CALLBACK
// };

const googleConfig = {
	clientId: '391665016504-uhipib5jlme25jqhiqhv1i0ic4sfu5df.apps.googleusercontent.com',
	clientSecret: 'i_SB9PMjPLdwd63qLEQM1G_z',
	callBackURL: '/login/google/callback'
};

// const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
// 	const googleId =  profile.id;
// 	const name = profile.displayName;
// 	const email = profile.emails[0].value;

// 	User.find({where: googleId })
// 	.then(user => user
// 		? done(null, user) 
// 		: User.create({name, email, googleId})
// 		.then(user => done(null, user)) 
// 	)
// 	.catch(done);
// });

// passport.use(strategy);

router.get('/', passport.authenticate('google', {scope: 'email'}));

router.get('/callback', passport.authenticate('google', {
	successRedirect: '/home',
	failureRedirect: '/login'
}));