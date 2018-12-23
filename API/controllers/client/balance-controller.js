const express = require("express");
const {Balance} = require("../../models/balance");
const {UserInfo} = require("../../models/user_info");
const {User} = require("../../models/user");
const {TypeBalance} = require("../../models/type_balance");
var router = express.Router();
// Show user balance
router.get("/", async (req, res) => {
    var id = req.header.id;
    var rows = await Balance.find({
        where:{
            id_user: id,
        }
    });
    res.json(rows);
});

//Transfer money
router.post("/transfer", async (req, res) => {
    //Get params
    let {sender, receiver, password, money} = req.body;
    //Confirm find sender and confirm password
    User.find({
        where:{
            password: password,
            id_user: sender
        }
    }).then((senderInfo)=>{
        if(!senderInfo){
            res.json({
                message: "Failed"
            });
        }else{
            //Get sender balance
            let senderBalance = await Balance.find({
                where: {
                    id_user: sender
                }
            });
            //Check if sender has enough money
            if(senderBalance.amount_money - money <= 0){
                res.json({
                    message: "Insufficient Money"
                })
            }else{
                //Get receiver balance
                let receiverBalance = await Balance.find({
                    where:{
                        id_user: receiver
                    }
                });
                //Transfer money
                Balance.update({
                    amount_money: senderBalance.amount_money - money
                },{
                    where:{
                        id_user: sender
                    }
                }).then(()=>{
                    Balance.update({
                        amount_money: receiverBalance.amount_money + money
                    },{
                        where:{
                            id_user: receiver
                        }
                    });
                }).then(()=>{
                    res.json({
                        message: "Money Transfered"
                    });
                });
            }
        }
    });
});

module.exports = router;