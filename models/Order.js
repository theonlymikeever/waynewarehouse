const db = require('./conn');
const Sequelize = db.Sequelize;

const Order = db.define('order', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  shippingPrice: {
    type: Sequelize.FLOAT
  },
  status: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  total: {
    type: Sequelize.FLOAT
  },
  tax: {
    type: Sequelize.FLOAT
  }, 
  weight: {
    type: Sequelize.FLOAT
  }
});



module.exports = Order;


