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

router.delete('/:userId', (req, res, next) => {
  User.destroy({ where: { id: +req.params.userId }})
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next);
})

router.put('/:userId', (req, res, next) => {
  User.findById(+req.params.userId)
    .then(user => {
      return user.update(req.body)
    })
    .then(() => res.sendStatus(200))
    .catch(next);  
})


module.exports = router;