const express = require("express"),
        MD5 = require('crypto-js/md5'),
        jwt = require('jsonwebtoken');

const authController = require("./auth-controller");

const {User} = require("../../models/user");

var router = express.Router();

// Login
router.post("/login", async (req, res) => {
    var params = req.body.data;
    var user = {
        username: params.username,
        password: MD5(params.password).toString()
    }
    console.log(params.username);
    console.log(params);
    User.findAll({where:{
        username: user.username
    }}).then( result => {
        if(result.length > 0){
            if(result[0].password === user.password){
                var payload = { username: user.username };
                var jwtToken = jwt.sign(payload, 'ok', { expiresIn: "30" });
                console.log('jwtToken: ' + jwtToken);
                var jsonResponse = {
                    'username': result[0].username,
                    'type': result[0].type,
                    'access_token': jwtToken,
                    'refresh_token': "xxxxx-xxx-xx-x",
                }
                console.log(jsonResponse);
                res.json(jsonResponse);
            } else { 
                res.json({
                    message: "Password unvalid"
                });
            }
        }
        else{
            res.json({
                message: "username unvalid"
            });
        }
    })
    
});
// Show all users
router.get("/",  async (req, res) => {
    var rows = await User.findAll();
    var vm = {
        user: rows,
    }
    res.json(vm);
});
//Delete one user
router.delete("/delete/:id", async (req, res) => {
    User.destroy({where:{
        id: req.params.id
    }}).then(()=>{
        res.json({
            message: "Delete completed"
        });
    });
});
//Create one user
router.post("/create", (req, res) => {
    let value = req.body;
    console.log(value.username);
    User.create({
        username: value.username,
        password: MD5(value.password).toString(),
        type: value.type,
    }).then(()=>{
        res.json({
            message: "User added"
        });
    });
});
//Edit one User info
router.put('/edit/info/:id', (req, res)=>{
    let value = req.body;
    User.update({
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
    User.getUser(id).then((user)=>{
        if (!user[0]) {
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
    }).catch(_ => {
        res.json({
            user: false,
            message: "userID not found",
            success: false
        });
    });
});

module.exports = router;