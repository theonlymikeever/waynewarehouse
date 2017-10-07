const db = require('./conn');
const Sequelize = db.Sequelize;

const Session = db.define('session', {});

module.exports = Session;
