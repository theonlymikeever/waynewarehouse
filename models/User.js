const db = require('./conn');
const Sequelize = db.Sequelize;
const Address = require('./Address');
const crypto = require('crypto');

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
	salt: {
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
	photo: {
		type: Sequelize.TEXT,
		defaultValue: 'https://success.salesforce.com/resource/1505433600000/sharedlayout/img/new-user-image-default.png'
	},
	googleId: {
		type: Sequelize.STRING
	},
	cartId: Sequelize.INTEGER
});

User.prototype.correctPassword = function (pwd) {
	return User.encryptPassword(pwd, this.salt) === this.password
}


User.generateSalt = function () {
	return crypto.randomBytes(16).toString('base64');
}

User.encryptPassword = function (plainText, salt) {
	return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
}

const setSaltAndPassword = user => {
	if (user.changed('password')) {
		user.salt = User.generateSalt()
		user.password = User.encryptPassword(user.password, user.salt);
	}
}

User.beforeCreate(setSaltAndPassword);

User.signUp = (details) => {
	const address = details.address;
	if (address) {
		const body = {}
		for (let entry in details) {
			if (entry !== 'address') {
				body[entry] = details[entry];
			}
		}
		return Promise.all([User.create(body), Address.create({ address: address })])
			.then(([user, address]) => {
				address.setUser(user);
				return User.findById(user.id, { include: [{ all: true }] })
			})
	} else {
		return User.create(details)

	}
}

module.exports = User;
