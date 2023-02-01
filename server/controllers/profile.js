const content = require('../server.js').content;
const comment = require('../server.js').comment;
const tags = require('../server.js').tags;
const users = require('../server.js').users
const e = require('express');
const path = require('path');
const { ObjectId } = require('mongodb');
const { Server } = require('http');



// newProfile function for post profile data
const newProfile = (req, res, next) => {
    res.json({message: "Post new Profile"}); 
};
// newProfile function to get profile data

const getProfile=(req,res,next)=>{
    res.json({message: "get profile data"});
}

// retrieve all the content documents stored in the MongoDB database
const getContent= (req,res)=>{
    content.find({}, (err, content) => {
        if (err) {
          res.status(500).send(err);
        } else {
        
          res.status(200).json(content);
        }
 });
};

// for posting likes to a story content.
const LikeContent = (req,res)=>{

}
// create a new "content" document in a MongoDB database using Mongoose
const newContent= (req,res)=>{
    // take in the body of the request (req.body) which contains information. These values are then assigned to a new "content" object which is created using the Mongoose "content" model. 
    const newcontent = new content({
        Author: req.body.Author,
        Title: req.body.Title,
        Description: req.body.Description,
        Content: req.body.Content,
        Date: req.body.Date,
        Image:path.normalize(req.file.path),
        tags: req.body.Tags
        
    });
    newcontent.save().then(result=>{  // Save the newContent object to the database
        res.status(200).json(result);
        
    }).catch(err=>{ 
        res.status(500).json(err); // If an error occurs, a 500 status code is returned along with an error message in a JSON response.
        console.log(req.body);
        console.log('abc'+err);
    })
    // newcontent.save((err,newcontent)=>{
    //     if(err){
    //         res.status(500).send(err);
    //     }
    //     else{
    //         res.status(201).json(newcontent);
    //     }

    // });

 };

 const getMyContent = (req,res)=>{
      const objectid = req.params;
      
        
     

    content.findOne({_id:ObjectId(objectid)},(err,Content)=>{
        if(err){
        console.log(objectid);
           console.log('abc'+err);
            res.status(500).send(err);
        }
        else{
            res.status(200).send(Content);
        }
    });

   
 }

 const getUser= (req,res)=>{
    users.find({Username:req.body},(err,Content)=>{ // a MongoDB query to search for a document in the "users" collection based on the value of the "Username" field, which must match the value of "req.body".
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(Content);
        }
    });
 };
 const newUser=(req,res)=>{
    let newuser = new users(req.body);
    newuser.save((err,newuser)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(newuser);
        }
    });
 };
 const getComment=(req,res)=>{
    comment.find({Content:req.body},(err,Content)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(Content);
        }
    });
 };

 const newComment=(req,res)=>{
    let newcomment = new comment(req.body);
    newcomment.save((err,newcomment)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(newcomment);
        }
    });
 };


// const getContent=(req,res,next)=>{
//     content.find({}, (err,people)=>{
//         if(err){
//             res.json({message:"Error"});
//         }
//         res.json(people);
//     } );
// }

module.exports = {newProfile,getProfile,newContent,getContent,newUser,getUser,newComment,getComment,getMyContent,LikeContent};