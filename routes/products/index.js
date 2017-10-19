const router = require('express').Router();
const Product = require('../../models/Product');

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

router.put('/updateList', (req, res, next) => {
  console.log(req.body)
  Product.changeProducts(req.body)
    .then(products => {
      console.log(products);
      res.send(products);
    }).catch(next);
})

router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.send(product))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    // .then(product => res.send(product))
    .then(() => res.sendStatus(201))
    .catch(next);
})

router.put('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      return product.update(req.body)
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.delete('/:productId', (req, res, next) => {
  Product.destroy({ where: { id: req.params.productId } })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
