const db = require('./conn');
const Sequelize = db.Sequelize;
const Product = require('./Product');

const LineItem = db.define('lineItem', {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    price: {
      type: Sequelize.FLOAT
    }
});

LineItem.hook('afterCreate', (lineItem) => {
  lineItem.setPrice(lineItem)
})

LineItem.hook('afterSave', (lineItem) => {
  lineItem.setPrice(lineItem)
})

LineItem.prototype.setPrice = function (lineItem) {
  return Product.findOne({where: { id: lineItem.productId }})
  .then(product => {
    lineItem.price = product.price * lineItem.quantity
    return lineItem.save()
  })
}

module.exports = LineItem;
