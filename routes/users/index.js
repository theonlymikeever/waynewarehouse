const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res, next) => {
    User.findAll({ include: [{ all: true }] })
        .then(users => {
            res.send(users);
        }).catch(next);
});

router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId,
        { include: [{ all: true }] })
        .then(user => {
            res.send(user);
        }).catch(next);
})

router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.send(user)
        }).catch(next);
});

//edit user
router.put('/:userId', (req, res, next) => {
    
})

module.exports = router;