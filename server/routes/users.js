const express = require('express') ;
const  router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt =  require('bcryptjs')
const config = require('../config/keys')
const User =  require('../models/User')


//add a  user
router.post('/register' , async(req,res)=>{

    User.findOne({email:req.body.email})
         .then(user=>{
             if(user){
                 return res.status(400).json({email:'email already exist'})
             }else{

                 //create a  new user
                 const newUser =  new User({
                     name:req.body.name ,
                     email:req.body.email ,
                     password:req.body.password

                 })

                 // encrpty the password before saving it
                 bcrypt.genSalt(10,(err ,salt)=>{
                     bcrypt.hash(newUser.password ,salt,(err ,hash)=>{
                         if(err) throw err ;
                         newUser.password =  hash ;
                         newUser.save()
                                .then(user=>res.json(user))
                                .catch(err=>console.log(err))
                     })
                 })

             }
         })

})

//////////////
// login
//////////////

User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.status(404).json({message:'email not  found'})

        }
         //check passwordsb
         bcrypt.compare(req.body.password, user.password)
               .then(isMatch=>{
                   if(isMatch){
                       const payload ={
                           id:user.id,
                           name:user.name
                       }

                       jwt.sign(payload ,config.secrete ,{expiresIn:111111},(err ,token)=>{})

                   }
               })
    })