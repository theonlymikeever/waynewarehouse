const router = require('express').Router()
const Order = require('../../models/Order');
const LineItem = require('../../models/LineItem');
const Product = require('../../models/Product');

//Get All Orders
router.get('/', (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: LineItem, as: 'lineItems',
        include: [Product]
      }
    ]
  })
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

// router.get('/:orderId', (req, res, next) => {
//   Order.findById(req.params.id)
//   .then(res.send)
// }

//Get Cart for User
router.get('/:userId', (req, res, next) => {
  Order.fetchCart(req.params.userId)
    .then(data => {

      res.send(data)
    })
    .catch(next);
});

//Get Cart based on the status
//for future implementation where we have
// 'SHIPPED', 'CART', 'PROCESSED'
router.get('/:userId/:filter', (req, res, next) => {
  Order.findOne({
    where: {
      userId: req.params.userId,
      isCart: req.params.filter
    }
  })
    .then(cart => {
      console.log(cart.userId);
      res.send(cart)}
    )
    .catch(next);
})

//Add Product
router.post('/:id/lineItems', (req, res, next) => {
  Order.addProduct(req.params.id, req.body.productId)
    .then(() => res.sendStatus(200))
    .catch(next);
})

//Remove Product
router.delete('/:id/lineItems/:productId', (req, res, next) => {

  Order.removeProduct(req.params.id, req.params.productId)
    .then(() => res.sendStatus(200))
    .catch(next);
})

//Create & Finalize the Order
router.put('/:cartId', (req, res, next) => {

  Order.findOne({
    where: {
      id: req.params.cartId,
      isCart: true
    }
  })
    .then(order => {

      order.isCart = false;
      return order.save()
    })
    .then(() => res.sendStatus(200))
    .catch(next);
})

module.exports = router;
