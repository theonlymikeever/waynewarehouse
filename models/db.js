const db = require('./conn');
const Category = require('./Category');
const LineItem = require('./LineItem');
const Order = require('./Order');
const Product = require('./Product');
const Review = require('./Review');
const Address = require('./Address');
const User = require('./User');

//Associations:
Product.belongsTo(Category);
Category.hasMany(Product);

LineItem.belongsTo(Product);
LineItem.belongsTo(Order);

Order.hasMany(LineItem);
Order.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Address);
Address.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

const sync = () => db.sync({ force: true });
//Defined seed as a returned function calling the seed.js
//file and passing in our models as arguments.
//seed.js returns a promise which we're using in server
const seed = () => require('./seed')(Product, Category, User, Review)

module.exports = {
	sync,
	seed
};
