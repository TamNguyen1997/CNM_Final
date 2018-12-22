const sequelize = require("./db");
const Sequelize = require("sequelize");

const UserInfo = sequelize.define("user_info", {
    address: {type: Sequelize.STRING},
    date_of_birth: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    id_user: {type: Sequelize.INTEGER},
    name_user: {type: Sequelize.STRING},
    phone: {type: Sequelize.STRING},
    status: {type: Sequelize.INTEGER},
},{
    timestamps: false,
    tableName: "user_info"
});

module.exports = {UserInfo};