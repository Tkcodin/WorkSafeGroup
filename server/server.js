const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  app.use(cors(corsOptions));
const mongoose = require("mongoose")

// app.use(cors());
app.use(express.json());
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5001;



mongoose
    .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log("db Connected"));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });



//Create a schema for user if it doesnt exist
if(!mongoose.modelNames().includes('users')){
    const userschema = createUserSchema(mongoose);
    const users = mongoose.model('users',userschema);
}
    const users = mongoose.model('users');

//Create a schema for content feed if it doesnt exist
if(!mongoose.modelNames().includes('content')){
    const feedschema = createContentSchema(mongoose);
    const content = mongoose.model('content',feedschema);
}

    const content = mongoose.model('content');

//Schema for comments
if(!mongoose.modelNames().includes('comments')){
    const commentschema = createCommentSchema(mongoose);
    const comment = mongoose.model('comments',commentschema);
}
//Loading the model in comment const
const comment = mongoose.model('comments');

if(!mongoose.modelNames().includes('tags')){
    const tagsschema = createTagsSchema(mongoose);
    const tags = mongoose.model('tags',tagsschema);
}
const tags = mongoose.model('tags');





module.exports= {users,content,comment,tags};
const profileRoutes=require('./routers/profile')

app.use('/',profileRoutes)
app.use('/uploads',express.static('uploads'));

//Functions to create Schema for DB models.

function createUserSchema(mongoose){
    const userschema = mongoose.Schema({
        Username:{
            type:String,
            required:true
        },
        FirstName:{
            type:String,
            required:true
        },
        LastName:{
            type:String,
            required:true
        },
        Role:{
            type:String,
            required:true
        },
        Interests:{
            type:[String],
            required:true
        },
        tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'tags'
        }],
        createdContent: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'content'
          }],
        
        createdComments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }]

        
    });

    return userschema;
}

function createContentSchema(mongoose){
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
        Image:{
            type:String
        },
        tags:{
            type: String,
            required: true
    
        },
        Comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }]
    });
    return feedschema;
}

function createCommentSchema(mongoose){
    const commentschema = mongoose.Schema({
        User:{
            type:String,
            required:true
        },
        Date:{
            type: Date,
            required:true
        },
        Text:{
            type:String,
            required:true
        },
        Content:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'content'
        },
        // Replies:[commentschema]

        
    });
    commentschema.add({Replies:[commentschema]});
    return commentschema;
}

function createTagsSchema(mongoose){
    const createtagschema = mongoose.Schema({
        Name:{
            type:[String],
            required:true
        }
    });
    return createtagschema;
}