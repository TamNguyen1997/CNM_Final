const Sequelize = require("./db");

const UserInfo = Sequelize.define("user_info", {
    address: {type: Sequelize.STRING},
    date_of_birth: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    id_user: {type: Sequelize.INT},
    name_user: {type: Sequelize.STRING},
    phone: {type: Sequelize.STRING},
    status: {type: Sequelize.INT},
},{
    timestamps: false,
    tableName: "user_info"
});

module.exports = {UserInfo};