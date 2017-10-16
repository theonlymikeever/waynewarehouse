const router = require('express').Router();
const User = require('../../models/User');
module.exports = router;

router.post('/', (req, res, next) => {
	User.findOne({
		where: {email: req.body.email}
	})
		.then(user => {
			if (!user) {
				console.log('no user, so create new user')
				return User.create(req.body)}
			else {
				console.log('user found, update googleId')
				User.update({googleId: req.body.googleId}, {where: {email: req.body.email}})
				return user;
			}
		})
		.then(user => {
				req.session.userId = user.id;
				console.log('Google session: ', req.session)
				res.status(200).send(user);
		})
		.catch(next);
});

