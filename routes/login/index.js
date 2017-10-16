const router = require('express').Router();
const User = require('../../models/User');
const session = require('express-session');

router.get('/', (req, res, next) => {
	User.findById(req.session.userId)
		.then(user => {
			res.send(user);
		})
})

router.post('/', (req, res, next) => {
	User.findOne({
		where: req.body
	})
		.then(user => {
			if (!user) {
				res.sendStatus(401)
			} else {
				req.session.userId = user.id;
				// console.log('session: ', req.session)
				res.status(200).send(user);
			}
		})
		.catch(next);
});

router.delete('/', (req, res, next) => {
	console.log('routes/logout');
	req.session.userId = '';
	// console.log('session: ', req.session);
	res.sendStatus(200);

});

router.use('/google', require('./google'));

module.exports = router;