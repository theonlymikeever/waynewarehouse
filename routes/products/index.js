const router = require('express').Router();
const Product = require('../../models/Product');

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.send(product))
    .catch(next);
});

router.post('/', (req, res, next) => {
  console.log('posting!', req.body)
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
})

router.put('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then()
});

router.delete('/:productId', (req, res, next) => {
  Product.destroy(req.params.productId)
    .then(() => res.sendStatus(201))
    .catch(next);
});

module.exports = router;
