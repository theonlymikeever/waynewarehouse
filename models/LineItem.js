const db = require('./conn');
const Sequelize = db.Sequelize;

const LineItem = db.define('lineItem', {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    }
});

// LineItem.beforeCreate = function (lineItem){
//   lineItem.quantity++
//   return lineItem.save()
// }

module.exports = LineItem;
