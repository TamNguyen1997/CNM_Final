const Sequelize = require("./db");

const User = Sequelize.define("user", {
    created_at: {type: Sequelize.STRING, defaultValue: Sequelize.NOW, allowNull: true},
    id: {type: Sequelize.INT, autoIncrement: true},
    password: {type: Sequelize.STRING},
    type: {type: Sequelize.INT},
    updated_at: {type: Sequelize.STRING, defaultValue: Sequelize.NOW, allowNull: true},
    username: {type: Sequelize.STRING},
},{
    timestamps: false,
    tableName: "user"
});

module.exports = {User};