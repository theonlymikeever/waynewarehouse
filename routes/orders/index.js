const router = require('express').Router()
const Order = require('../../models/Order');
const User = require('../../models/User');
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



//Get Cart for User
router.get('/:userId', (req, res, next) => {
    Order.fetchCart(req.params.userId*1)
    .then(cart => {
      res.send(cart)
    })
    .catch(next);
});

// this was on master:
// router.get('/:orderId', (req, res, next) => {
//   console.log(req.params.orderId)
//   Order.findById(req.params.orderId * 1, {
//     include: [
//       {
//         model: LineItem, as: 'lineItems',
//         include: [Product]
//       }
//     ]
//   })
//     .then(order => {
//       res.send(order);
//     }).catch(next)
// });

// //Get Cart based on the status
// //for future implementation where we have
// // 'SHIPPED', 'CART', 'PROCESSED'
// router.get('/:userId/:filter', (req, res, next) => {
//   if (!req.params.userId) return;
//   Order.findOne({
//     where: {
//       userId: req.params.userId,
//       isCart: req.params.filter
//     }
//   })
//     .then(cart => {
//       console.log(cart.userId);
//       res.send(cart)
//     }
//     )
//     .catch(next);
// })
//>>>>>>> master

//Add Product
router.post('/:id/lineItems', (req, res, next) => {
    const userId = req.params.id;
    Order.addProduct(userId, req.body.productId) 
    .then((results) => {
      res.sendStatus(200)
      }) 
    .catch(next);
})

//Remove Product
router.delete('/:id/lineItems/:productId', (req, res, next) => {

  Order.removeProduct(req.params.id, req.params.productId)
    .then(() => res.sendStatus(200))
    .catch(next);
})

// Upon checkout set user's cart back to null
router.put('/:userId/emptyCart', (req, res, next) => {
  User.update({cartId: null}, {where: {id: req.params.userId}})
  .then(() => res.sendStatus(200))
  .catch(next);
})

//Create & Finalize the Order
router.put('/:cartId', (req, res, next) => {
  console.log(req.body);
  Order.findOne({
    where: {
      id: req.params.cartId,
      isCart: true
    }
  })
    .then(order => {
      order.address = req.body.address;
      order.isCart = false;
      return order.save()
    })
    .then(() => res.sendStatus(200))
    .catch(next);
})

module.exports = router;
