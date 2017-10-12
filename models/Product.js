const db = require('./conn');
const Sequelize = db.Sequelize;

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.STRING,
    },
    weight: Sequelize.DECIMAL(6, 2),
    contributedBy: Sequelize.STRING
},
{
  getterMethods: {
    shortDescription() {
        return this.description.slice(0,120) + '... ';
    },
    pricePretty(){
        return this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }  
});


module.exports = Product;
