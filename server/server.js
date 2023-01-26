const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: '*', // replace with the client's domain
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  app.use(cors(corsOptions));
const mongoose = require("mongoose")
const profileRoutes=require('./routers/profile')
// app.use(cors());
app.use(express.json());
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;

app.use('/',profileRoutes)

if(!mongoose.modelNames().includes('content')){
const feedschema = mongoose.Schema({
    Author:{
        type: String,
        required: true
    },
    Title:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Content:{
        type: String,
        required: true
    },
    Date:{
        type: String,
        required: true
    },
    tags:{
        type: [String],
        required: true

    }
});
const content = mongoose.model('content',feedschema);
}

    const content = mongoose.model('content');




mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log("db Connected"));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });



 app.get('/content',(req,res)=>{
    content.find({}, (err, content) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(content);
        }
 });
 });
 app.post('/savecontent',(req,res)=>{
    let newcontent = new content(req.body);
    newcontent.save((err,newcontent)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).json(newcontent);
        }

    });

 })
module.exports=content;