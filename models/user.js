const sequelize = require("./db");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    created_at: {type: Sequelize.STRING, defaultValue: Sequelize.NOW, allowNull: true},
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    password: {type: Sequelize.STRING},
    type: {type: Sequelize.INTEGER},
    updated_at: {type: Sequelize.STRING, defaultValue: Sequelize.NOW, allowNull: true},
    username: {type: Sequelize.STRING},
},{
    timestamps: false,
    tableName: "user"
});

module.exports = {User};