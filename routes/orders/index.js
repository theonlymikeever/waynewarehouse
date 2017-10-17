const router = require('express').Router()
const Order = require('../../models/Order');
// const LineItem = require('../../models/LineItem');

//Get All Orders
router.get('/', (req, res, next) => {
  Order.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
});

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
  .then( cart => res.send(cart))
  .catch(next);
})

// // get product as a guest
// router.get('/guest/:filter', (req, res, next) => {
//   Order.findOne({
//     where: {
//       userId: 0,
//       isCart: req.params.filter
//     }
//   })
//   .then( cart => res.send(cart))
//   .catch(next);
// })

//Add Product
router.post('/:id/lineItems', (req, res, next) => {
  Order.addProduct(req.params.id, req.body.productId)
    .then(() => res.sendStatus(200))
    .catch(next);
})

// //Add Product As a Guest
// router.post('/guest/lineItems', (req, res, next) => {
//   Order.addProduct(0, req.body.productId)
//     .then(() => res.sendStatus(200))
//     .catch(next);
// })


//Remove Product
router.delete('/:id/lineItems/:productId', (req, res, next) =>{
  console.log('in route: ')
  Order.removeProduct(req.params.id, req.params.productId)
    .then(() => res.sendStatus(200))
    .catch(next);
})

//Create & Finalize the Order
router.put('/:userId', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.params.userId,
      isCart: true
    }
  })
  .then( order => {
    order.isCart = false;
    return order.save()
  })
  .then( () => res.sendStatus(200))
  .catch(next);
})

module.exports = router;
