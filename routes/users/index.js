const router = require('express').Router();
const User = require('../../models/User');
const Address = require('../../models/Address');
const session = require('express-session');

router.get('/', (req, res, next) => {
    User.findAll({ include: [{ model: Address }] })
        .then(users => {
            res.send(users);
        }).catch(next);
});

router.post('/signup', (req, res, next) => {
    User.signUp(req.body)
        .then(user => {
            req.session.userId = user.id;
            res.send(user)
        }).catch(err => {
            console.log(err.error);
        });
});

router.put('/:userId', (req, res, next) => {
    const detail = req.body;
    User.findById(req.params.userId)
        .then(user => {
            if (detail.address) {
                Address.create({
                    address: detail.address,
                    userId: user.id
                })
            }

            // console.log('detail', detail.address);
            // for (let property in detail) {
            //     user[property] = detail[property];
            // }
            // return user.save();
            res.send(user);
        })
})


module.exports = router;