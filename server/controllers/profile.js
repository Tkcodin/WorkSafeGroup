
const content = require('../server.js').content;
const comment = require('../server.js').comment;
const tags = require('../server.js').tags;
const users = require('../server.js').users
const e = require('express');
const path = require('path');
const { ObjectId } = require('mongodb');
const { Server } = require('http');
const mongoose = require('../server.js').mongoose




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
    // content.find({}).populate('tags').exec(function(err, abc) {
    //     if (err) {console.log(err);}
    //     else{
    //     abc.tags=tags; }// This will log an array of referenced order documents
    //   });
    content.find({}, (err, content) => {
        if (err) {
          res.status(500).send(err);
        } else {
            // console.log('abc');
          res.status(200).json(content);
        }
 });
};

// for posting likes to a story content.

// const updatelikes = (req,res)=>{
//   const id = req.params.id;
//   const updatedLikes = req.body.likes;
//   content.findByIdAndUpdate(id, { $set: { Likes: updatedLikes } }, { new: true }, (error, updatedContent) => {
//     if (error) {
//       return res.status(400).send({
//         success: false,
//         message: 'Error updating content.'
//       });
//     }
//     return res.status(200).send({
//       success: true,
//       message: 'Content updated successfully.',
//       updatedContent
//     });
//   });
// }

const updatelikes = (req,res)=>{
    const id = req.params.id;
    const updatedLikes = req.body.likes;
    content.findById(id, (error, foundContent) => {
    if (error) {
    return res.status(400).send({
    success: false,
    message: 'Error finding content.'
    });
    }
    content.findByIdAndUpdate(id, { $set: { Likes: foundContent.Likes + updatedLikes } }, { new: true }, (error, updatedContent) => {
    if (error) {
    return res.status(400).send({
    success: false,
    message: 'Error updating content.'
    });
    }
    return res.status(200).send({
    success: true,
    message: 'Content updated successfully.',
    updatedContent
    });
    });
    });
    }

    const editUser = (req,res)=>{
        console.log('inside edit user')
        const id = req.params.userID;
        
        const updatedFields = {};
        
        if (req.file) {
            // console.log(path.normalize(req.file.path));
            const img = path.normalize(req.file.path);
            // console.log('Image = ' + img);
            updatedFields.Image = img;
        }
        
        if (req.body.FirstName) updatedFields.FirstName = req.body.FirstName;
        if (req.body.LastName) updatedFields.LastName = req.body.LastName;
        if (req.body.Password) updatedFields.Password = req.body.Password;
        if (req.body.Email) updatedFields.Email = req.body.Email;
        if (req.body.Role) updatedFields.Role = req.body.Role;
        if (req.body.Employer) updatedFields.Employer = req.body.Employer;
        if (req.body.Tags) updatedFields.Tags = req.body.Tags;
        if (req.body.About) updatedFields.About = req.body.About;
        if (req.body.Image) updatedFields.Image = req.body.Image;
        if (req.body.EmailPrivate) updatedFields.EmailPrivate = req.body.EmailPrivate;
        if (req.body.RolePrivate) updatedFields.RolePrivate = req.body.RolePrivate;
        if (req.body.EmployerPrivate) updatedFields.EmployerPrivate = req.body.EmployerPrivate;
        
        console.log(updatedFields.Image);

        users.findByIdAndUpdate(id, { $set: updatedFields }, { new: true })
        // .then((user) => {
        //   res.json({ success: true, msg: 'User updated' });
        // })

        .then(result=>{  // Save the newContent object to the database
            res.status(200).json(result);
        })  
        .catch((err) => {
          console.error(err);
          res.json({ success: false, msg: 'Failed to update user' });
        });
     
    }

// create a new "content" document in a MongoDB database using Mongoose
const newContent= (req,res)=>{
    const tags123 = JSON.parse(req.body.Tags);;
    const tags1234 = tags123.map((id) => mongoose.Types.ObjectId(id));
    // take in the body of the request (req.body) which contains information. These values are then assigned to a new "content" object which is created using the Mongoose "content" model. 
    const newcontent = new content({
        UserID: req.body.UserID,
        Author: req.body.Author,
        Title: req.body.Title,
        Description: req.body.Description,
        Content: req.body.Content,
        Date: req.body.Date,
        Category: req.body.Category,
        Image:path.normalize(req.file.path),
        tags: tags1234
        
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

 const getMyLikes = (req,res)=>{
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
    const email = req.params.email;
    users.findOne({Email:email},(err,Content)=>{ // a MongoDB query to search for a document in the "users" collection based on the value of the "Username" field, which must match the value of "req.body".
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(Content);
        }
    });
 };

 const getUserWithID= (req,res)=>{
    const userID = req.params.userID;
    users.findOne({_id:userID},(err,Content)=>{ // a MongoDB query to search for a document in the "users" collection based on the value of the "Username" field, which must match the value of "req.body".
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(Content);
        }
    });
 };



 const newUser=(req,res)=>{
    // let newuser = new users(req.body);
    
    const newuser = new users({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Password: req.body.Password,
        Email: req.body.Email,
        Role: req.body.Role,
        Employer: req.body.Employer,
        Tags: req.body.Tags,
        About: req.body.About,
        Image:path.normalize(req.file.path),
        EmailPrivate: req.body.EmailPrivate,
        RolePrivate: req.body.RolePrivate,
        EmployerPrivate: req.body.EmployerPrivate
    });


    newuser.save().then(result=>{  // Save the newContent object to the database
        res.status(200).json(result);
        
    }).catch(err=>{ 
        res.status(500).json(err); // If an error occurs, a 500 status code is returned along with an error message in a JSON response.
        console.log(req.body);
        console.log('abc'+err);
    })

    // newuser.save((err,newuser)=>{
    //     if(err){
    //         res.status(500).send(err);
    //     }
    //     else{
    //         res.status(200).json(newuser);
    //     }
    // });
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

//  const newComment=(req,res)=>{
//     let newcomment = new comment(req.body);
//     newcomment.save((err,newcomment)=>{
//         if(err){
//             res.status(500).send(err);
//         }
//         else{
//             res.status(200).json(newcomment);
//         }
//     });
//  };

const newComment = (req, res) => {
    
    const contentId = req.params.id;
    const newCommentData = req.body;
    
    const mycomment = new comment({
      Text: newCommentData.Text,
      User: newCommentData.User,
      Date: newCommentData.Date
    });
  
    mycomment.save((err, savedComment) => {
      if (err) {
        return res.status(500).send("Error: " + err);
      }
  
      content.findByIdAndUpdate(
        contentId,
        { $push: { Comments: mycomment} },
        { new: true },
        (err, updatedContent) => {
          if (err) {
            return res.status(500).send("Error: " + err);
          }
  
          return res.status(200).json(updatedContent);
        }
      );
    });
  };


  const newComment2 = (req, res) => {
    console.log("im here 1");
    const commentId = req.params.id;
    const newCommentData = req.body;
    
    const mycomment = new comment({
      Text: newCommentData.Text,
      User: newCommentData.User,
      Date: newCommentData.Date
    });

    
  
    mycomment.save((err, savedComment) => {
        console.log("im here 2");
      if (err) {
        
        return res.status(500).send("Error: " + err);
      }
      console.log(commentId);
      comment.findByIdAndUpdate(
       
        commentId,
        { $push: { Comments: mycomment} },
        { new: true },
        (err, updatedContent) => {
          if (err) {
            return res.status(500).send("Error: " + err);
          }
  
          return res.status(200).json(updatedContent);
        }
      );
    });
  };

 const setTags=(req,res)=>{
    
    const newtag = new tags({
        Name:req.body.tags,
        
        Group:req.body.group});

    newtag.save((err,newtag)=>{
        if(err){
  
            res.status(500).send(err);
            
        }
        else{
        
            res.status(200).json(newtag);
        }
    });
 };


 const getTags=(req,res)=>{
    tags.find({}, (err,tag)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(tag);
        }
        });
    }
 
// const getContent=(req,res,next)=>{
//     content.find({}, (err,people)=>{
//         if(err){
//             res.json({message:"Error"});
//         }
//         res.json(people);
//     } );
// }

const getPopulatedTags=(req,res)=>{
    content.findOne({_id:ObjectId(req.params.id)}).populate('tags').exec(function(err, abc) {
            if (err) {throw err;}
            else{
            
            res.status(200).json(abc.tags);} // This will log an array of referenced order documents
          });
}

const getPopulatedComments=(req,res)=>{
    comment.findOne({_id:ObjectId(req.params.id)}).populate('Comments').exec(function(err, abc) {
            if (err) {throw err;}
            else{
            if(abc.Comments){
            res.status(200).json(abc.Comments);}
        
        } // This will log an array of referenced order documents
          });
}


module.exports = {newProfile,getProfile,newContent,newComment2,getContent,newUser,getUser, getUserWithID,newComment,getComment,getMyContent,updatelikes,getMyLikes,setTags,getTags,editUser,getPopulatedTags,getPopulatedComments};

