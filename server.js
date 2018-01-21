const express = require(`express`);
const router = require(`./routes/routes`);
const bodyParser = require(`body-parser`);
let app = express();
let Port = process.env.port || 5497;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router.router);


app.listen(Port,()=>{console.log(`running on ${Port}`)});