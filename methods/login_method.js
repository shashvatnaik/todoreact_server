const mongoose = require(`mongoose`);
const {UserModel} = require(`./../models/usermodel`);
const passport = require(`passport`);
const strat = require(`passport-local`).Strategy;
const bcrypt = require(`bcryptjs`);



passport.use(`local`,new strat((username,password,done)=>{
    UserModel.findOne({email:username}).then((doc)=>{
        console.log(`inside of passport.use`);
        console.log(doc);
        if(doc) {
            bcrypt.compare(password, doc.password).then((result) => {

                if (result) {
                    console.log(`right password`);
                    return done(null, doc);
                }
                else {
                    console.log(`wrong password`);
                    return done(null, false);
                }
            }).catch((err) => {
                console.log(`no user found`);
                console.log(err.message);
                return done(null)
            });
        }else{
            return done(null,false);
        }
    })
}));


let login_method = (req,res,next)=>{
    console.log(req.body);
    UserModel.find({email:req.body.username}).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((err)=>{res.send(`user doesnt exist`)});

};
let login_method_P = passport.authenticate(`local`,{
    successRedirect:`/success`,
    failureRedirect:`/failed`
});
module.exports={login_method,login_method_P};