const sequelize = require("sequelize");
const CONFIG = require("../config/config.json");

const Sequelize = new sequelize(CONFIG.DB.DATABASE, CONFIG.DB.USERNAME, CONFIG.DB.PASSWORD, {
    host: CONFIG.DB.HOST,
    dialect: CONFIG.DB.DIALECT,

    pool: {
        max: 5,         //number of min connecion
        min: 0,         //number of min connecion
    }
});

module.exports = {Sequelize};