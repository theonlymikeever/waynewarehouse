const router = require('express').Router();
const User = require('../../models/User');
const session = require('express-session');

router.get('/', (req, res, next) => {
    User.findAll({ include: [{ all: true }] })
        .then(users => {
            res.send(users);
        }).catch(next);
});

router.post('/signup', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            req.session.userId = user.id;
            res.send(user)
        }).catch(err => {
            console.log(err.error);
        });
});


module.exports = router;