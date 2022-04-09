const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema.Types

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  associatedemail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  resetToken:String,
  expireToken:Date,
  username: {
	type: String,
	required: true,
	unique: true
  },
  name: {
  type: String,
  default: "Anonymous",
  required: true
  },
  role: {
	type: String,
	default: "user"
  },
  subscription: {
    type: Boolean,
    default: false
    },
  pic:{
    type:String,
    default: "https://res.cloudinary.com/outworld-tech/image/upload/v1628575608/PngItem_5578368_hbfckl.png"
  },
  profilepic:{
    type:String,
    default: "https://res.cloudinary.com/outworld-tech/image/upload/v1628575608/PngItem_5578368_hbfckl.png"
  },
  verified: {
	  type: Boolean,
	  default: false
	},
  registration_date: {
	type: Date,
	default: Date.now
  },
  subscription_date: {
    type: Date,
    default: Date.now
  },
  stripe_subscription_id: {
    type: String,
    default: "0"
  }
//   ,
//   followers:[
//     {
//         type:ObjectId,
//         ref:"User"
//     }
// ],
// following:[
//     {
//         type:ObjectId,
//         ref:"User"
//     }
// ],
})

module.exports = User = mongoose.model('users', UserSchema)