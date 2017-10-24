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
    weight: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    inStock: {
        type: Sequelize.INTEGER
    }

},
    {
        getterMethods: {
            shortDescription() {
                return this.description.slice(0, 120) + '... ';
            },
            pricePretty() {
                return (this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            }
        }
    });

Product.changeProducts = function (catArr) {
    return Product.findAll({
        order: [['id']],
        where: {
            categoryId: {
                $in: catArr
            }
        }
    }).then(products => {
        return products.sort((a, b) => a.id - b.id)
    })
}

Product.removeOneFromInventory = function(id) {
    return Product.findById(id)
        .then((product) => {
            product.decrement('inStock', {by: 1})
        })
}

module.exports = Product;
