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
            res.send({error: 'Email already registered'})
        });
});

router.put('/:userId', (req, res, next) => {
    const detail = req.body.user;    
    console.log(detail);
    User.findById(req.params.userId, { include: [{ all: true }] })
        .then(user => {
            if (detail.address) {
                Address.create({
                    address: detail.address,
                    userId: user.id
                })
            }

            // console.log('detail', detail.address);
            for (let property in detail) {
                if (property === 'address') continue
                user[property] = detail[property];
            }
            return user.save()
                .then(user => {
                    res.send(user);
                })



        })
})

router.delete('/:userId', (req, res, next) => {
  User.destroy({ where: { id: +req.params.userId }})
    .then(() => res.sendStatus(200))
    .catch(next);
})


module.exports = router;
