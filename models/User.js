const db = require('./conn');
const Sequelize = db.Sequelize;

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	password: {
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
		allowNull: false,
		unique: true
	},
	address: {
		type: Sequelize.STRING
	}
});

User.update = (userId, body) => {
	User.findById(userId)
	.then(user => {
		// user = Obj.assign({})
	})
}

module.exports = User;
