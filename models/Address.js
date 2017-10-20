const db = require('./conn');
const Sequelize = db.Sequelize;

const Address = db.define('address', {
	address: {
		type: Sequelize.STRING
	}
});

module.exports = Address;
