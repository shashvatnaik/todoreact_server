const mongoose = require(`mongoose`);
const {UserModel} = require(`./../models/usermodel`);
let reg_method = (req,res,next)=>{
   let newData = new UserModel(req.body);
   console.log(`regmethod`);
   newData.save().then(()=>{res.send(`saved`)}).catch((err)=>{res.status(417).send(err.message)});
   // console.log(req.body);
   //next();
};
module.exports={reg_method};