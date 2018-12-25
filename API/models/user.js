'use strict';
const sequelize = require("./db");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    username: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    type: {type: Sequelize.INTEGER},
    created_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: true},
    updated_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: true},
},{
    timestamps: false,
    tableName: "user"
});

module.exports = {User};