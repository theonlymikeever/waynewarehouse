const router = require('express').Router();
const User = require('../../models/User');
const Address = require('../../models/User');
const session = require('express-session');

router.get('/', (req, res, next) => {
	User.findById(req.session.userId, {
		include: [{ all: true }]
	})
		.then(user => {
			res.send(user);
		})
})

router.post('/', (req, res, next) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	}, { include: [{ all: true }] })
		.then(user => {

			if (!user) {
				res.send({ err: 'User not found' })
			}

			user.correctPassword(req.body.password)
				.then(auth => {
					if (auth) {
						req.session.userId = user.id;
						res.status(200).send(user);
					}
					else {
						res.send({ err: 'Incorrect password' })
					}
				}).catch(next);

		})
		.catch(next);
});

router.delete('/', (req, res, next) => {
	console.log('routes/logout');
	req.session.userId = '';
	console.log('session: ', req.session);
	res.sendStatus(200);

});

router.use('/google', require('./google'));

module.exports = router;