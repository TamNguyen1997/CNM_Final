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
// Login
router.post("/login", async (req, res) => {
    // var rows = await User.findAll();
    let user = {
        username: 'VAT',
        token: 'fake-jwt-token'
    }
    // var vm = {
    //     user: rows,
    // }
    res.json(user);
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
//Edit one User info
router.put('/edit/info/:id', (req, res)=>{
    let value = req.body;
    UserInfo.update({
        address: value.address,
        email: value.email,
        date_of_birth: value.date_of_birth,
        name_user: value.name_user,
        phone: value.phone,
        status: value.status
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
//Edit one User info
router.post('/edit/password/:id', (req, res) => {
    var oldPassword = req.params.old_password;
    var newPassword = req.params.new_password
    User.update({
        password: newPassword
    },{
        where:{
            id_user: req.params.id,
            password: oldPassword
        }
    }).then(()=>{
        res.json({
            message: "Password changed"
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