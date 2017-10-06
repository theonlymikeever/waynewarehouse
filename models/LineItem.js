const db = require('./conn');
const Sequelize = db.Sequelize;

const LineItem = db.define('lineItem', {
    quantity: Sequelize.INTEGER
});

module.exports = LineItem;
