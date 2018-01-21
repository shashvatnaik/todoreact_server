const mongoose = require(`mongoose`);
const {UserModel} = require(`./../models/usermodel`);
let login_method = (req,res,next)=>{
    console.log(req.body);
    UserModel.find({email:req.body.email}).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((err)=>{res.send(`user doesnt exist`)});

};
module.exports={login_method};