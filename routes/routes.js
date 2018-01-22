const express = require(`express`);
const {reg_method} = require(`./../methods/reg_method`);
const {login_method,login_method_P} = require(`./../methods/login_method`);
const passport = require(`passport`);

let router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});

router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post(`/reg`,reg_method);
router.post(`/login`,login_method_P);
router.get(`/test`,(req,res)=>{
    res.json(`successfull`);
});


router.get(`/success`,(req,res)=>{
    res.send(req.session);
});
router.get(`/failed`,(req,res)=>{
    res.send(`login failed`);
});
module.exports={
    router
};