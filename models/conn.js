const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/wayne_warehouse', {logging: false});

module.exports = db;
