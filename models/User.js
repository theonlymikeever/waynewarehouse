const db = require('./conn');
const Sequelize = db.Sequelize;

const User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	password: {
		type: Sequelize.STRING
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true
		}
	},
	address: {
		type: Sequelize.STRING
	},
	photo: {
		type: Sequelize.STRING,
		defaultValue: 'https://success.salesforce.com/resource/1505433600000/sharedlayout/img/new-user-image-default.png'
	},
	googleId:{
		type: Sequelize.STRING
	},
	cartId: Sequelize.INTEGER
});

// User.update = (userId, body) => {
// 	User.findById(userId)
// 	.then(user => {
// 		// user = Obj.assign({})
// 	})
// }

module.exports = User;
