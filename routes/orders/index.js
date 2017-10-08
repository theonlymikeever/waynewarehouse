const router = require('express').Router(), 
  Order = require('../../models/Order');


router.get('/', (req, res, next) => {
  Order.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Order.destroy({ where: { id: +req.params.id }})
    .then(data => {
      res.sendStatus(204)
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

router.put('/:id', (rq, res, next) => {
  Order.update(req.body, { where: { id: +req.params.id }})
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

module.exports = router;