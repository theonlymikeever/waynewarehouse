const router = require('express').Router();
const User = require('../../models/User');
const Address = require('../../models/Address');
const session = require('express-session');

router.get('/', (req, res, next) => {
    User.findAll({ include: [{ all: true }] })
        .then(users => {
            res.send(users);
        }).catch(next);
});

router.post('/signup', (req, res, next) => {
    // const address = req.body.address;
    // const body = {}
    // for (let entry in req.body) {
    //     if (entry !== 'address') {
    //         body[entry] = req.body[entry];
    //     }
    // }
    // Promise.all([User.create(body), Address.create({ address: address })])
    User.signUp(req.body)
        .then(([user, address]) => {
            req.session.userId = user.id;
            address.setUser(user);
            res.send(user)
        }).catch(err => {
            console.log(err.error);
        });
});


module.exports = router;