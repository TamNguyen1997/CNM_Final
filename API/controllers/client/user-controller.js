const express = require("express");
const {User} = require("../../models/user");
const {UserInfo} = require("../../models/user_info");
var router = express.Router();

router.get("/", async (req, res) => {
    var rows = await User.findAll();
    var vm = {
        baihoc: rows,
    }
    res.render("client/user", vm);
});

router.get('/detail/:id', (req, res) => {

    var id = req.params.id;
    UserInfo.findAll({
        where:{
            id_user: id
        }
    }).then((result)=>{
        var vm = {
            baihoc: result,
            baitieptheo: rows2
        }
         res.render('client/user/detail', vm);
    });
});



module.exports = router;