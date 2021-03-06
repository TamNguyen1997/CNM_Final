const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Account } = require("../models/account");
const { Hint } = require("../models/hint");
const { Transaction, DEFAULT_FEE } = require("../models/transaction");

//check type function
async function typeAuthorized(id, type) {
    const u = await User.getUser(id).then(user => user);
    for (let i = 0; i < type.length; i++) {
        if (u.type === type[i]) {
            return true;
        };
    };
    return false;
};

router.get("/", (req, res) => res.json({ message: `Hello ${req.user.name}` }));

//=========================================USER=========================================
//get user info
router.get("/user/:id", (req, res) => {
    const id = req.params.id;
    User.getUser(id)
        .then(user => {
            if (!user) {
                return res.json({
                    user,
                    message: "userID not found",
                    success: false
                });
            };

            res.json({
                user,
                message: "success",
                success: true
            });
        })
        .catch(_ => {
            res.json({
                user: false,
                message: "userID not found",
                success: false
            });
        });
});

//get all user info
router.get("/user", async (req, res) => {
    const isAutho = await typeAuthorized(req.headers.userid, ["admin", "super"]);
    if (!isAutho) return res.json({ success: false, message: "Your role cannot access this api"});
    User.getAllUser()
        .then(users => {
            if (!users[0]) {
                return res.json({
                    users,
                    message: "no user found",
                    success: false
                });
            };

            res.json({
                users,
                message: "success",
                success: true
            });
        })
        .catch(_ => {
            res.json({
                users: false,
                message: "no user found",
                success: false
            });
        });
});

//create new user
router.post("/user", async (req, res) => {
    const isAutho = await typeAuthorized(req.headers.userid, ["admin", "super"]);
    if (!isAutho) return res.json({ success: false, message: "Your role cannot access this api"});

    const {username, password, phone, email, name} = req.body;
    if (
        username === "" ||
        password === "" ||
        phone === "" ||
        email === "" ||
        name === ""
    ){
        return res.json({ success: false, message: "Has an required field was not filled in"});
    };

    User.signUp(username, password, name, phone, email)
    .then(u => {
        if (!u) return res.json({ success: false, message: "Registration failed: Internal error!"});

        res.json({success: true, message: "success"})
    })
    .catch(err => {
        res.json({ success: false, message: err.message});
    });
});

//add fav receiver
router.post("/user/hintAccnumber/:userId", async (req, res) => {
    const userId = req.params.userId;
    let {accNumber, username} = req.body;
    const acc = await Account.getAccountWithNumber(accNumber);
    if (!acc) return res.json({ success: false, message: "Can't find account number"});;

    if (username == "" || typeof username != "string") {
        username = acc.owner;
    }
    const resp = await Hint.createHintAccount(userId, accNumber, username);
    if (!resp) return res.json({ success: false, message: "Add new hint failed"});

    res.json({ success: true, message: "success", hint: resp});
})
//=========================================ACCOUNT=========================================
//create new account
router.post("/account", async (req, res) => {
    const isAutho = await typeAuthorized(req.headers.userid, ["admin", "super"]);
    if (!isAutho) return res.json({ success: false, message: "Your role cannot access this api"});

    const {userID} = req.body;
    if (userID === "") return res.json({ success: false, message: "Has an required field was not filled in"});

    const newAcc = await Account.addAccount(userID);
    if(!newAcc) return res.json({ success: false, message: "Create new account failed"});

    res.json({ success: true, message: "success", account: newAcc });
});

//put account balance
router.put("/account/:accId",async (req, res) => {
    const isAutho = await typeAuthorized(req.headers.userid, ["admin", "super"]);
    if (!isAutho) return res.json({ success: false, message: "Your role cannot access this api"});

    const accId = req.params.accId;
    const {total} = req.body;

    const accountInfo = await Account.updateBalance(accId, parseInt(total), true);
    if(!accountInfo) return res.json({ success: false, message: "Update account's balance failed"});

    res.json({ success: true, message: "success", payload:{
        total: parseInt(total),
        accNumber: accId
    }});    
});

//get account info
router.get("/account/:accId", async (req, res) => {
    const accId = req.params.accId;

    let account = await Account.getAccount(accId);
    if(!account) return res.json({ success: false, message: "Get account info failed"});
    if (req.headers.userid != account.userID) { //check is account owner
        let accDoRequest = await Account.getAccount(req.headers.userid); //check is super admin
        if (accDoRequest.type !== "super") {
            delete account.balance;
        }
    };

    res.json({ success: true, message: "success", account });
});

//get all account
router.get("/account", async (req, res) => {
    const accounts = await Account.getAllAccount(req.params.id);
    if(!accounts) return res.json({ success: false, message: "Get account list failed"});

    res.json({ success: true, message: "success", accounts })
});

//get all account with userID
router.get("/accounts/:userId", async (req, res) => {
    const userId = req.params.userId;
    const accounts = await Account.getAccountsUser(userId);
    if(!accounts) return res.json({ success: false, message: "Get user's accounts failed"});
    res.json({ success: true, message: "success", accounts });
});

//delete account
router.delete("/account/:accId", async (req, res) => {
    const accId = req.params.accId;

    let account = await Account.getAccount(accId);
    if(!account) return res.json({ success: false, message: "Get account info failed"});

    if (account.userID != req.headers.id) {
        res.json({ success: false, message: "You don't have right" });
        return;
    }
    if (account.balance > 0) {
        res.json({ success: false, message: "Account's balance must be zero" });
        return;
    }

    const success = await Account.deleteAccount(accId);
    if (!success) {
        res.json({ success: false, message: "Closing account failed" });
        return;
    }

    res.json({ success: true, message: "success", account });
});
//=========================================HINT=========================================
router.post("/hint", async (req, res) => {
    const {accNumber, username} = req.body;
    userId = req.header.userid;
    if(username === '') {
        user = await User.getUser(userId);
        if(!user) 
            res.json({ success: false, message: "user don't exist" });
        username = user.username;
    }
    const hint = await Hint.createHintAccount(userId, accNumber, username);
    if (!hint) return res.json({ success: false, message: "Create new hint failed"});

    res.json({ success: true, message: "success", hint});
});

router.get("/hint/user/:userId", async(req, res) => {
    const userId = req.params.userId;
    let hintList = await Hint.getHintAccount(userId);
    
    res.json({ success: true, message: "success", hintList});
})

//=========================================TRANSACTION=========================================
router.post("/transaction/:accId", async (req, res) => {
    const accId = req.params.accId;
    const {accDes, description, feeCharger} = req.body;
    const total = parseFloat(req.body.total);
    console.log(req.body);
    console.log(accId);
    let account = await Account.getAccount(accId);
    if(!account) return res.json({ success: false, message: "Get account info failed"});

    if (account.userID != req.headers.userId) {
        res.json({ success: false, message: "You don't have right" });
        return;
    }

    if (feeCharger && account.balance - DEFAULT_FEE < total) {
        res.json({ success: false, message: "Account's balance not enough" });
        return;
    } else if (account.balance < total - DEFAULT_FEE) {
        res.json({ success: false, message: "Account's balance not enough" });
        return;
    }

    Transaction.createTransaction(accId, accDes, total, description, feeCharger)
        .then(trans => {
            trans.accountSrcNumber = account.number
            res.json({ success: true, message: "success", trans });
        })
        .catch(err => {
            console.log("hehe", err)
            res.json({ success: false, message: err });
        });
});

router.put("/transaction/verify/:transId", async (req, res) => {
    const transId = req.params.transId;
    const opt = req.body.opt;

    const trans = await Transaction.verifyTransaction(transId, opt)
    if (!trans) {
        res.json({ success: false, message: "Verify transaction failed" });
        return;
    }
    res.json({ success: true, message: "success", trans });
});

router.get("/transaction/:transId", async (req, res) => {
    const transId = req.params.transId;

    const trans = await Transaction.getTransaction(transId);
    if (!trans) {
        res.json({ success: false, message: "Transaction not found" });
        return;
    }

    res.json({ success: true, message: "success", trans });
})



router.get("/transactions/:accId", async (req, res) => {
    const accId = req.params.accId;

    const trans = await Transaction.getAccountTransactions(accId);
    if (!trans) {
        res.json({ success: false, message: "Transactions not found" });
        return;
    }

    res.json({ success: true, message: "success", trans });
})

// router.get("/transactions/:accId", async (req, res) => {
//     const accId = req.params.accId;

//     const trans = await Transaction.getAccountTransactions(accId);
//     if (!trans) {
//         res.json({ success: false, message: "Transactions not found" });
//         return;
//     }

//     res.json({ success: true, message: "success", trans });
// })
module.exports = router;