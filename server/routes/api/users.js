var express = require('express');
var router = express.Router();
var VerifyToken = require('./auth/Veryfy');
var User = require('../../models/users');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../../config/index');



    router.post('/login',(req,res,next)=>{
            User.findOne({ username: req.body.username }, function (err, user) {
                if (err) return res.status(500).send('Error on the server.');
                if (!user) return res.status(404).send('No user found.');
                
                // check if the password is valid
                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            
                // if user is found and password is valid
                // create a token
                var token = jwt.sign({ id: user._id }, config.secret);
            
                // return the information including token as JSON
                res.status(200).send({ auth: true, token: token  , userId:user.id });
                next()
              });

        })

    router.get('/logout',(req,res ,next)=>{
                res.status(200).send({ auth: false, token: null });
                next()
              })

    router.post('/register',(req,res,next)=>{

       console.log("password is" + req.body.password)

               
                        var hashedPassword = bcrypt.hashSync(req.body.password,10 );

                        User.create({
                            name : req.body.name,
                            username:req.body.username,
                            email : req.body.email,
                            password : hashedPassword
                        }, 
                        function (err, user) {
                            if (err){

                                console.log(err.message)
                                res.status(500).send({error:err.message});

                            } else{
 // if user is registered without errors
                            // create a token
                            var token = jwt.sign({ id: user._id }, config.secret, {
                                expiresIn: 86400 // expires in 24 hours
                                });
    
                                res.status(200).send({ auth: true, token: token });
                                next()
                            }

                           
                        });

          })


    router.post('/me' ,VerifyToken,(req,res,next)=>{


            User.findById(req.userId, { password: 0 }, function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");
                res.status(200).send(user);
              });

          })




module.exports = router