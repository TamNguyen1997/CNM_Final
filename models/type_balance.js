const Sequelize = require("./db");

const TypeBalance = Sequelize.define("type_balance", {
    id: {type: Sequelize.INT, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
},{
    timestamps: false,
    tableName: "type_balance"
});

module.exports = {TypeBalance};