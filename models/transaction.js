const Sequelize = require("./db");

const Transaction = Sequelize.define("transaction", {
    from_user: {type: Sequelize.INT},
    id: {type: Sequelize.INT, primaryKey: true, autoIncrement: true},
    to_user: {type: Sequelize.INT},
},{
    timestamps: false,
    tableName: "transaction"
});

module.exports = {Transaction};