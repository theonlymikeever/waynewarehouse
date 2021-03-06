const db = require('./conn');
const Sequelize = db.Sequelize;

const Review = db.define('review', {
	stars: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

module.exports = Review;
