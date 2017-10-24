const db = require('./conn');
const Sequelize = db.Sequelize;
const LineItem = require('./LineItem');
const Product = require('./Product');
const User = require('./User');

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
    type: Sequelize.STRING
  },
  weight: {
    type: Sequelize.FLOAT
  },
  status: {
    type: Sequelize.STRING
  }
});

const getCart = function (cartId) {
   return Order.findOne({
      where: {
        id: cartId*1
      },
      include: [
        {
          model: LineItem, as: 'lineItems',
          include: [Product]
        }
      ]
    })
};

Order.fetchCart = function (userId) {
  let cart;
  return User.findById(userId*1)
  .then(user => {
    // console.log("fetchCart user:", user)
    if (!user.cartId) {
        return Order.create({ userId: userId*1 })
        .then(_cart => {
          cart = _cart;
          return User.update({cartId: cart.id}, {where:{id: userId*1}})
          })
          .then(() => {
            // console.log('new Cart#####:', cart)
            return getCart(cart.id);
          })

    } else {
      return getCart(user.cartId);
    }
  })

}

Order.addProduct = function (userId, productId) {
  return Order.fetchCart(userId)
  .then(cart => {
    return LineItem.findOne({ where: { productId, orderId: cart.id } })
      .then(lineItem => {
        if (!lineItem) {
          //If lineItem doesn't exist create new one with that productId
          return LineItem.create({ productId, cartId: cart.id })
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

Order.hook('afterSave', (order) => {
  let prodList = []
  order.getLineItems()
    .then((lineItems) => {
      lineItems.forEach(item => {
        for (var i = 0; i < item.quantity; i++) {
          prodList.push(Product.removeOneFromInventory(item.id))
        }
      })
      return Promise.all(prodList)
    })
})

module.exports = Order;
