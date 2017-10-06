const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res, next) => {
    User.findAll(
        { include: [{ all: true }] },
        { attributes: ['id', 'email'] }
    )
        .then(users => {
            res.send(users);
        })
})

router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId * 1,
        { include: [{ all: true }] },
        { attributes: ['id', 'email'] })
        .then(user => {
            res.send(user);
        })
})

module.exports = router;