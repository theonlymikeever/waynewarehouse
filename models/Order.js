const db = require('./conn');
const Sequelize = db.Sequelize;

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN
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

module.exports = Order;
