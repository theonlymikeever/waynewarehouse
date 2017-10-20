const db = require('./conn');
const Sequelize = db.Sequelize;
const Address = require('./Address');

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
	photo: {
		type: Sequelize.STRING,
		defaultValue: 'https://success.salesforce.com/resource/1505433600000/sharedlayout/img/new-user-image-default.png'
	},
	googleId:{
		type: Sequelize.STRING
	}
});

// User.update = (userId, body) => {
// 	User.findById(userId)
// 	.then(user => {
// 		// user = Obj.assign({})
// 	})
// }

User.signUp = (details) => {
	const address = details.address;
    const body = {}
    for (let entry in details) {
        if (entry !== 'address') {
            body[entry] = details[entry];
        }
    }
    return Promise.all([User.create(body), Address.create({ address: address })]);
}

module.exports = User;
