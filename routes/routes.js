const express = require(`express`);
const {reg_method} = require(`./../methods/reg_method`);
const {login_method} = require(`./../methods/login_method`);

let router = express.Router();

router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post(`/reg`,reg_method);
router.post(`/login`,login_method);
router.get(`/test`,(req,res)=>{
    res.json(`successfull`);
});
module.exports={
    router
};