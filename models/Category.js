const db = require('./conn');
const Sequelize = db.Sequelize;

const Category = db.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

module.exports = Category;
