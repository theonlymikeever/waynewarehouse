const db = require('./conn');
const Sequelize = db.Sequelize;

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.TEXT
    },
    weight: Sequelize.FLOAT
},
{
  getterMethods: {
    shortDescription() {
        return this.description.slice(0,120) + '... ';
    },
    pricePretty(){
        return (this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
  }
});


module.exports = Product;
