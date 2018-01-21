const mongoose = require(`mongoose`);

let todoSchema = new mongoose.Schema({
   Task:{
       required:true,
       type:String
   },
    status:{
       type:String,
        required:true,
        default:false
    }
});

let todoModel = mongoose.model(`user`,todoSchema);

module.exports = {todoModel};