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
    image: {
        type: Sequelize.STRING,
    },
    weight: Sequelize.DECIMAL(6, 2),
    contributedBy: Sequelize.STRING
});

module.exports = Product;
