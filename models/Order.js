const db = require('./conn');
const Sequelize = db.Sequelize;

const Order = db.define('order', {});

module.exports = Order;
