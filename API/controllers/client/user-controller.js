const express = require("express"),
        MD5 = require('crypto-js/md5'),
        jwt = require('jsonwebtoken');

const authController = require("./auth-controller");

const {User} = require("../../models/user");
const {UserInfo} = require("../../models/user_info");
var router = express.Router();


// Show all users
router.get("/", authController.isAuthenticated,  async (req, res) => {
    var rows = await User.findAll();
    var vm = {
        user: rows,
    }
    res.json(vm);
});
// Login
router.post("/login", async (req, res) => {
    var user = {
        username: req.body.username,
        password: MD5(req.body.password).toString()
    }
    
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
//Delete one user
router.delete("/delete/:id", authController.isAuthenticated, async (req, res) => {
    User.destroy({where:{
        id: req.params.id
    }}).then(()=>{
        res.json({
            message: "Delete completed"
        });
    });
});
//Create one user
router.post("/create", authController.isAuthenticated, (req, res) => {
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
router.put('/edit/info/:id', authController.isAuthenticated, (req, res)=>{
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
router.post('/edit/password/:id', authController.isAuthenticated, (req, res) => {
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
router.get('/detail/:id', authController.isAuthenticated, (req, res) => {

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