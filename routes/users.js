

const express = require('express')
const router = express.Router()
const axios = require('axios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../config/keys')
const {getUser} = require('../utils/utils');
const getUserURI = require('../config/keys_dev').getUserURI
const User = require('../models/Users')
const crypto = require('crypto')

//api integration stuff
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const passport = require('passport')

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
      api_key:"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"
  }
}))


router.put('/profilepic',passport.authenticate('jwt',{session: false}), (req, res)=>{
  const email = req.user.email;
  const url = req.body.url;

  User.findOne({email})
  .then(user => {
    if(!user)
      {
          return res.status(422).json({error:"Oops Try again"})
      }
        else {   
          user.pic = url;
          user.save()
          console.log("put request made")
          console.log("user")
          console.log(user)
          return res.status(200).json({user})
        }
    })
    .catch(err => {
      console.log(err)
      console.log("put request error")
    })
})



router.get('/', passport.authenticate('jwt', {session: false}),  (req, res) => { 
  
  const mesg = {}

  // Dashboard.find({user: req.user.id})
  User.findOne({associatedemail: req.user.associatedemail})
    .then(user =>{
      // console.log("prepared")
      // var numberEvents = dashboard.length
      // console.log(req.user)
      if(user.length === 0){
        mesg.message = `You don't have any events!`
        return res.status(200).json({mesg})
      }
      // console.log("dashboard")

      return res.status(200).json({
        user: user
      });
      console.log(user)
    })
    .catch(err => {
      mesg.error = err
      return res.status(200).json(mesg)
    })
})

router.post('/getUsers', passport.authenticate('jwt', {session: false}),  (req, res) => { 
  
  const mesg = {}

  // Dashboard.find({user: req.user.id})
  User.findOne({associatedemail: req.user.associatedemail})
    .then(user =>{
      // console.log("prepared")
      // var numberEvents = dashboard.length
      // console.log(req.user)
      if(user.length === 0){
        mesg.message = `You don't have any events!`
        return res.status(200).json({mesg})
      }
      // console.log("dashboard")
      // console.log(dashboard)
      return res.status(200).json({
        user: user
      });
      console.log(user)
    })
    .catch(err => {
      mesg.error = err
      return res.status(200).json(mesg)
    })
})



// @route   POST api/users/register
// @desc    Post/Register
// @access  Public
router.post('/register/', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.email;
  const associatedemail = req.body.associatedemail;

  const phone = req.body.phone;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const country = req.body.country;
  
  // set errors objects

  User.findOne({email})
    .then((user) => {
      // if email does not exists
      if(user){
        // return error if email exists
        
        return res.status(400).json({
          mesg: 'Email already exists!',
          type: 'danger'
        });
      } else {
        // if email does not exists 

        const newUser = new User({email, password, username, associatedemail, name,
        phone, address, city, state, zip, country});

        // create a salt for a new password
        bcrypt.genSalt(10, (err, salt) => {
          // the salt is returne and then add it to the hash pswrd
          bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err) throw err;
              // set the password to a new has
              newUser.password = hash;
              // save the new user to the database
              newUser.save()
                .then(user=>{
                  // return a 200 status with the user
                  return res.status(200).json({
                    user: user, 
                    mesg: 'Registration successful!',
                    type: 'success'
                  });
                })
                // return error if there is an error
                .catch(err => {
                  return res.status(400).json({
                    user: user, 
                    mesg: 'Missing Required Fields!',
                    type: 'success'
                  });
                });
          });
        });
      };
  })
  .catch(err => {
    return res.json({err})
  }); 
});

// @route   POST api/users/login
// @desc    Post/login
// @access  Public
router.post('/login/', (req, res) => {
  const email = req.body.email;
  const associatedemail = req.body.email;
  const password = req.body.password
  const name = req.body.name
  const role = req.body.role
  const username = req.body.email
  const stripe_subscription_id = req.body.stripe_subscription_id
  const pic = req.body.pic
  const profilepic = req.body.profilepic

  // set errors variables
  const mesg = {}

  User.findOne({email})
  .then(user => {
    // if user does not exists
    if(!user){
        // return error with status 400
        return res.status(400).json({
          mesg: 'Email does not exists!',
          type: 'danger'
        })
      } else {
        // if user exists, compare password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            // if password matched / create a token
        if(isMatch){
          const payload = { id: user.id,
             email: user.email, name: user.name, 
             role: user.role, username: user.username, 
             associatedemail: user.associatedemail,
             pic: user.pic,
             registration_date: user.registration_date,
             subscription_date: user.subscription_date,
             phone: user.phone,
             address: user.address,
             city : user.city,
             state : user.state,
             zip : user.zip,
             country : user.country,
            }
          
          jwt.sign(payload, secret.secretOrKey, {expiresIn: 3600}, (err, token) =>{
            return res.status(200).json({
              sucess: true,
              token: `Bearer ${token}`,
              type: 'success'
            })
          })
        } else {
          // if not matched, send an error response with 400 status
          return res.status(400).json({
            mesg: 'Password is incorrect!',
            type: 'danger'
          })
        }
      })
    }
  })
  .catch(err => {
    return res.json({err})
  })
})


router.post('/resetPassword',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err)
      {
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user)
          {
              return res.status(422).json({error:"User does not exists"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000 
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from:"ahmedakhtar11@gmail.com",
                  subject:"Reset your password - Event Sensei Task Management Application",
                  html:
                  `<h3> Please click the following link in order to change your password. Thank you very much. </h3>
                  <h4> Click <a href="http://localhost:3000/resetPassword/${token}">here</a> in order to change your password</h4>`
              })
              res.json({message:"Check your mail to receive reset link"})
          }).catch(err=>{
            console.log(err)
        })
      }).catch(err=>{
        console.log(err)
    })
  })
})


router.post('/newPassword',(req,res)=>{
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({resetToken:sentToken, expireToken:{
      $gt:Date.now()
  }})
  .then(user=>{
      if(!user)
      {
          return res.status(422).json({error:"Oops ! Token expired, Try again"})
      }
      bcrypt.hash(newPassword,12).then(hashedPassword=>{
          user.password = hashedPassword
          user.resetToken = undefined
          user.expireToken = undefined
          user.save()
          .then((savedUser)=>{
              res.json({message:"Password reset successful"})
          })
      })
  }).catch(err=>{
      console.log(err)
  })
})

module.exports = router