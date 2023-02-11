
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

// create a new "content" document in a MongoDB database using Mongoose
const newContent= (req,res)=>{
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
        { $push: { Comments: savedComment._id } },
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

// const newComment = (req, res) => {
//     let newcomment = new Comment(req.body);
//     newcomment.save((err, newcomment) => {
//       if (err) {
//         res.status(500).send("Error: " + err);
//       } else {
//         const objectid = req.params.id;
  
//         content.findByIdAndUpdate(
//           objectid,
//           { $push: { Comments: newcomment._id } },
//           { new: true },
//           (err, updatedStory) => {
//             if (err) {
//               res.status(500).send("Error: " + err);
//             } else {
//               res.status(200).json(updatedStory);
//             }
//           }
//         );
//       }
//     });
//   };

//  const newComment=(req,res)=>{
//     let newcomment = new comment(req.body);
//     newcomment.save((err,newcomment)=>{
//         if(err){
//             res.status(500).send("abc: "+err);
//         }
//         else{
//             const objectid = req.params.id;
            
//             content.findOneAndUpdate(
//                 { _id: objectid },
//                 { $push: { Comments: newcomment._id } },
//                 { new: true },
//                 (err, updatedStory) => {
//                     if (err) {
//                         res.status(500).send("ABC: "+err);
//                     } else {
//                         res.status(200).json(updatedStory);
//                     }
//                 }
//             );
//         }
//     });
// };

// const getContent=(req,res,next)=>{
//     content.find({}, (err,people)=>{
//         if(err){
//             res.json({message:"Error"});
//         }
//         res.json(people);
//     } );
// }

module.exports = {newProfile,getProfile,newContent,getContent,newUser,getUser, getUserWithID,newComment,getComment,getMyContent,updatelikes,getMyLikes};