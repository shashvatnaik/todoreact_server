const mongoose = require(`mongoose`);

let todoSchema = new mongoose.Schema({
   Task:{
       required:true,
       type:String
   },
    status:{
       type:String,
        default:false
    },
    user:{
       type:String,
        required:true
    }
});

let todoModel = mongoose.model(`todoTasks`,todoSchema);

module.exports = {todoModel};