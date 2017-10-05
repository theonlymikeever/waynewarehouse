const Sequelize = require('sequelize');

const db = new Sequelize( process.env.DATABASE_URL || 'postgres://localhost/wayne_warehouse', {logging: false} );


const Product = db.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	}, 
	price:{
		type: Sequelize.DECIMAL(12,2),
		allowNull: false
	},
	image: {
		type: Sequelize.STRING,
	}, 
	weight: Sequelize.DECIMAL(6,2),
	contributedBy: Sequelize.STRING
});

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	}, 
	password:{
		type: Sequelize.STRING,
		allowNull: false
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}, 
	email: {
		type: Sequelize.STRING,
		isEmail: true,
		allowNull: false
	}
});

const Category = db.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

const Review = db.define('review', {
	stars: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

const Order = db.define('order', {});

const LineItem = db.define('lineItem', {
	quantity: Sequelize.INTEGER
});

const Session = db.define('session', {});


//Associations:
    Product.belongsTo(Category);

    LineItem.belongsTo(Product);
    LineItem.belongsTo(Order);

    Order.hasMany(LineItem);

    User.hasMany(Order);
    Order.belongsTo(User);

    User.hasMany(Review);
    Review.belongsTo(User);

    Product.hasMany(Review);
    Review.belongsTo(Product);




const sync = () => db.sync({force: true});

// Seed data:
const users = [
	{name: 'Bruce Wayne', password: 'batman', email: 'batMail@gotham.com', isAdmin: true},
	{name: 'Harry Potter', password: 'wizard', email: 'LightningScar@hogwarts.com', isAdmin: false},
];
const products = [
	{name: 'utility Belt' , price: 9999.99, image: 'https://vignette.wikia.nocookie.net/thedarkknighttrilogy/images/9/92/UtilityBelt.jpg/revision/latest?cb=20131210034132', weight: 5.10},
	{name: 'Invisibility Cloak' , price: 95000.00, image: 'https://vignette.wikia.nocookie.net/harrypotter/images/6/67/Cloak_of_Invisibility_PM.png/revision/latest/scale-to-width-down/350?cb=20161124181645', weight: 0.00},
];
const categories = [
	{name: "Magical Item"},
	{name: "Crime Fighting Object"}
];

const seed = () => {
	let magicalItem, crimeFighting;
	sync()
	.then(() => {
		return Promise.all(
			users.map((user) => User.create(user))
		)})
	.then(([bruce, harry]) => {
		return Promise.all(
			categories.map((category) => Category.create(category))
		)})		
	.then(([_magicalItem, _crimeFighting]) => {
		magicalItem=_magicalItem;
		crimeFighting=_crimeFighting;
		return Promise.all(
			products.map((product) => Product.create(product))
		)})
	.then(([belt, cloak]) => {
		return Promise.all([
			belt.setCategory(crimeFighting),
			cloak.setCategory(magicalItem)			
		])
	.then(() => console.log('DB is synced and seeded'));
	});
};
		
module.exports = {
	db,
	sync,
	seed 
};


