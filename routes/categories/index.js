const router = require('express').Router();
const Category = require('../../models/Category');
const Product = require('../../models/Product');

router.get('/', (req, res, next) => {
  Category.findAll({ include: [ Product ] })
    .then(categories => {
      res.send(categories)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next);
})

router.delete('/:categoryId', (req, res, next) => {
  Category.destroy({ where: { id: +req.params.categoryId }})
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next);
})

module.exports = router;
