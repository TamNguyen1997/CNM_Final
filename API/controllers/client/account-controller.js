const express = require("express"),
        jwt = require('jsonwebtoken');

const authController = require("./auth-controller");

const {Account} = require("../../models/account");

var router = express.Router();

router.post("/create", async (req, res) => {
    let params = req.body;
    if (params.userID === "") 
        return res.json({ success: false, message: "Has an required field was not filled in"});
    const newAcc = await Account.addAccount(params.userID, params.balance);
    if(!newAcc) 
        return res.json({ success: false, message: "Create new account failed"});

    res.json({ success: true, message: "success", account: newAcc });
});

module.exports = router;
