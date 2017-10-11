const db = require('./conn');
const Sequelize = db.Sequelize;
const LineItem = require('./LineItem');

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  shippingPrice: {
    type: Sequelize.FLOAT
  },
  tax: {
    type: Sequelize.FLOAT
  },
  total: {
    type: Sequelize.FLOAT
  },
  weight: {
    type: Sequelize.FLOAT
  }
});


Order.fetchCart = function(id){
  return Order.findOne({
    where: {
      isCart: true,
      userId: id
    },
    include: [
      { model: LineItem, as: 'lineItems'}
    ]
  })
  .then( cart => {
    return cart
      ? cart
      : Order.create()
  })
}

Order.addProduct = function(userId, productId) {
  return Order.fetchCart(userId)
    .then( cart => {
      if (cart.lineItems) {
        //If our cart has Lineitems
        LineItem.findOne({ where: { productId, orderId: cart.id }})
          .then( lineItem => {
            //The lineitem exists thus we increase
            lineItem.quanity++
            return lineItem.save()
          })
      } //Otherwise create new lineitem with that productId
      return LineItem.create({ productId })
        .then( lineitem => cart.addLineItem(lineitem))
    })
}

Order.removeProduct = function(userId, productId) {
  return Order.fetchCart(userId)
    .then( cart => {
        LineItem.findOne({ where: { productId, orderId: cart.id }})
          .then( lineItem => {
            //The lineitem exists we decrease and check if it's the last one
            lineItem.quanity--
            return lineItem.quanity > 0
              ? lineItem.save()
              : lineItem.destroy()
          })
    })
}


module.exports = Order;
