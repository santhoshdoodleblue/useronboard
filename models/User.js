const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema  = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String
    },
    dob:{
        type:String
    },
    bloodgrp:{
        type:String
    }
},{timestamps:true})

const User=mongoose.model('user',userSchema)
module.exports=User