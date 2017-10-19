const db = require('./conn');
const Sequelize = db.Sequelize;
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
	googleId: {
		type: Sequelize.STRING
	}
});

User.prototype.correctPassword = function(password) {
	return bcrypt.compare(password, this.password)
	.then(function(res) {
		console.log(res)
		return res;
	});
}

const encrypt = (user) => {
	if (user.changed('password')) {
		bcrypt.hash(user.password, saltRounds)
			.then(function (hash) {
				user.password = hash;
				user.save();
			})
	}
}

User.beforeCreate(encrypt);

module.exports = User;
