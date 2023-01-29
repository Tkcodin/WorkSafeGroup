const content = require('../server.js').content;
const comment = require('../server.js').comment;
const tags = require('../server.js').tags;
const users = require('../server.js').users


// newProfile function for post profile data
const newProfile = (req, res, next) => {
    res.json({message: "Post new Profile"}); 
};
// newProfile function to get profile data

const getProfile=(req,res,next)=>{
res.json({message: "get profile data"});
}


const getContent= (req,res)=>{
    content.find({}, (err, content) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(content);
        }
 });
};

const newContent= (req,res)=>{
    const newcontent = new content({
        Author: req.body.author,
        Title: req.body.title,
        Description: req.body.description,
        Content: req.body.content,
        Date: req.body.date,
        Image: req.file.path,
        Tags: req.body.tags,
    });
    newcontent.save().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).send(err);
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

 const getUser= (req,res)=>{
    users.find({Username:req.body},(err,Content)=>{
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

module.exports = {newProfile,getProfile,newContent,getContent,newUser,getUser,newComment,getComment};