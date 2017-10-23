const db = require('./conn');
const Sequelize = db.Sequelize;
const LineItem = require('./LineItem');
const Product = require('./Product');

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  address: {
    type: Sequelize.STRING
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
  },
  status: {
    type: Sequelize.STRING
  }
});


Order.fetchCart = function (id) {
  return Order.findOne({
    where: {
      isCart: true,
      userId: id
    },
    include: [
      {
        model: LineItem, as: 'lineItems',
        include: [Product]
      }
    ]
  })
    .then(cart => {
      return cart
        ? cart
        : Order.create({ isCart: true, userId: id })
    })
}

Order.addProduct = function (userId, productId) {
  return Order.fetchCart(userId)
    .then(cart => {
      return LineItem.findOne({ where: { productId, orderId: cart.id } })
        .then(lineItem => {
          if (!lineItem) {
            //If lineItem doesn't exist create new one with that productId
            return LineItem.create({ productId })
              .then(lineitem => cart.addLineItem(lineitem))
          }
          //Otherwise we increase the quantity
          lineItem.quantity++
          return lineItem.save()
        })
    })
}

Order.removeProduct = function (userId, productId) {
  return Order.fetchCart(userId)
    .then(cart => {
      LineItem.findOne({ where: { productId, orderId: cart.id } })
        .then(lineItem => {
          //The lineitem exists we decrease and check if it's the last one
          if (lineItem) {
            lineItem.quantity--
            return lineItem.quantity > 0
              ? lineItem.save()
              : lineItem.destroy()
          }
        })
    })
}


module.exports = Order;
