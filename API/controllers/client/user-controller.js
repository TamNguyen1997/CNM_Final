const express = require("express");
const {User} = require("../../models/user");
const {UserInfo} = require("../../models/user_info");
var router = express.Router();
// Show all users
router.get("/", async (req, res) => {
    var rows = await User.findAll();
    var vm = {
        user: rows,
    }
    res.json(vm);
});
//Delete one user
router.delete("/delete/:id", async (req, res) => {
    User.destroy({where:{
        id_user: req.params.id
    }}).then(()=>{
        res.json({
            message: "Delete completed"
        });
    });
});
//Create one user
router.post("/create", (req, res) => {
    let value = req.body;
    User.create({
        password: value.password,
        type: value.type,
        username: value.username
    }).then(()=>{
        res.json({
            message: "User added"
        });
    });
});
//Edit one User
router.put('/edit/:id', (req, res)=>{
    let value = req.body;
    User.update({
        password: value.password,
        type: value.type,
        username: value.username
    },{
        where:{
            id_user: req.param.id
        }
    }).then(()=>{
        res.json({
            message: "User updated"
        });
    });
});
//View one user info
router.get('/detail/:id', (req, res) => {

    var id = req.params.id;
    UserInfo.findAll({
        where:{
            id_user: id
        }
    }).then((result)=>{
        var vm = {
            info: result,
        }
         res.json(vm);
    });
});

module.exports = router;