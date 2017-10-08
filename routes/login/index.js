const router = require('express').Router();
const User = require('../../models/User');
const session = require('express-session');


router.post('/', (req, res, next) => {
	console.log('routes/login')
	User.findOne({
		where: req.body
	})
	.then(user => {
		if (!user){
			res.sendStatus(401)
		} else {
			req.session.userId = user.id;
			console.log('session: ', req.session)
			res.status(200).send(user);
		}
	})
	.catch(next);
})


module.exports = router;