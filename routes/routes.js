const express = require(`express`);
const {reg_method} = require(`./../methods/reg_method`);
const {login_method,login_method_P} = require(`./../methods/login_method`);
const passport = require(`passport`);
const session = require(`express-session`);
const {todoModel} = require(`./../models/todomodel`);

let router = express.Router();

router.use(passport.initialize());
router.use(passport.session());
router.use(session({secret:"shashvat"}));

passport.serializeUser((user,done)=>{
    done(null,user._id);
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
    //console.log(req.session.passport.user);
    console.log(`-----------------------------------------------------------------`);
    res.send(req.sessionStore);
});
router.get(`/failed`,(req,res)=>{
    res.send(`login failed`);
});
router.get(`/logout`,(req,res)=>{
    req.logout();
    req.sessionStore.sessions={};
    console.log(req.sessionStore.sessions);
    console.log(`logout`);
});
router.post(`/getTask`,(req,res)=>{
    todoModel.find({user:req.body.user}).then((data)=>{
        console.log(data);
        res.send(data);
    }).catch((err)=>{
            console.log(err.message);
    });
});

router.post(`/deleteTask`,(req,res)=>{
    console.log(req.body);
    todoModel.remove({user:req.body.user,Task:req.body.task}).then(()=>{console.log(`removed`)}).catch((err)=>{
        console.log(err.message);
    });
});

router.post(`/addTask`,(req,res)=>{
   let newdata = new todoModel({Task:req.body.task,user:req.body.user});
   newdata.save().then(()=>{console.log(`data saved`);}).catch((err)=>{console.log(err.message)});
});

router.post(`/updateTask`,(req,res)=>{
    todoModel.update({user:req.body.user,Task:req.body.task},{
        $set:{
            Task:req.body.newtask
        }
    }).then(()=>{console.log(`updated!`)}).catch((err)=>{console.log(err.message)});
})
module.exports={
    router
};