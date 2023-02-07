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
require("dotenv").config({ path: "./config.env" }); // load environment variables from "config.env" using the "dotenv" library.

const port = process.env.PORT || 5001; // set the value of port to "PORT" which is stored in "config.env", or if that's not defined, to the default value of 5001.



mongoose
    .connect(process.env.ATLAS_URI, { // ATLAS_URI is stored in "config.env"
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log("db Connected"));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });





    const userschema = createUserSchema(mongoose);
    const users = mongoose.model('users',userschema);


    const feedschema = createContentSchema(mongoose);
    const content = mongoose.model('content',feedschema);


    const commentschema = createCommentSchema(mongoose);
    const comment = mongoose.model('comments',commentschema);

    const tagsschema = createTagsSchema(mongoose);
    const tags = mongoose.model('tags',tagsschema);


module.exports= {users,content,comment,tags};
const profileRoutes=require('./routers/profile')

app.use('/',profileRoutes)
app.use('/uploads',express.static('uploads'));

//Functions to create Schema for DB models.

function createUserSchema(mongoose){
    const userschema = mongoose.Schema({

        FirstName:{
            type:String,
            required:true
        },
        LastName:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true,
            unique:true,
            index:true
        },
        Role:{
            type:String,    
        },
        Employer:{
            type:String,   
        },
        Tags:{
            type: String,
        },
        About:{
            type: String
        },
        Image:{
            type:String
        },
        EmailPrivate:{
            type:Boolean
        },
        RolePrivate:{
            type:Boolean
        },
        EmployerPrivate:{
            type:Boolean
        }
        // createdContent: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'content'
        //   }],
        
        // createdComments:[{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref:'comment'
        // }]

        
    });
    //below code helps to ensure that email is unque --> need to add message to page
    userschema.path('Email').validate(async (Email) => {
        const emailCount = await mongoose.models.users.countDocuments({ Email})
        return !emailCount
    }, 'Email already exists');

    return userschema;
}

function createContentSchema(mongoose){
    const feedschema = mongoose.Schema({
        UserID:{
            type: String,
        },
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
        Category:{
            type: String,
            required: true
        },
        Comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }],
        Likes:{
            type: Number,
            default: 0
        }
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
            type:String,
            required:true
        },
        Group:{
            type:String
        }
    });
    return createtagschema;
}