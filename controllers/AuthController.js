const User = require('../models/User')
const Address = require('../models/Address')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const index = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, 'verySecretpass')
    let userID = payload.id
    User.findById(userID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'Error in list of user display'
            })
        })
}

const update = async (req, res, next) => {
    let id = req.body.id;
    let {name,gender,dob,bloodgrp,password}=req.body
    if(req.body.password){
        req.body.password = await bcrypt.hash(req.body.password, 10);
}
        
    let updatedData = {}
    if(name){updatedData.name= name}
    if(gender){updatedData.gender=gender}
    if(dob){updatedData.dob=dob}
    if(bloodgrp){updatedData.bloodgrp=bloodgrp}
    if(password){updatedData.password=password}

   
        User.findByIdAndUpdate(id, { $set: updatedData })
        .then(() => {
            res.status(200).json({
                message: 'User updated successfully'
            })

        })
        .catch(error => {
            res.status(400).json({
                message: error.message
            })
        })

    


}
const address=(req,res,next)=>{
    let add=new Address({
        userId:req.body.userId,
        contactName:req.body.name,
        contact:req.body.contact,
        address:req.body.address,
        pincode:req.body.pincode,
        landmark:req.body.landmark,
        city:req.body.city,
        state:req.body.state,
        placeType:req.body.placeType
    })
    add.save()
        .then(response=>{
            res.status(200).json({
                response
            })
        })
        .catch(error=>{
            res.status(400).json({
                message:error.message
            })
        })
}
const showAddress=(req,res,next)=>{
    Address.find({userId:req.query.userId})
        .then(response=>{
            res.status(200).json({ 
                response
            })
        })
        .catch(error=>{
            res.status(400).json({
                message:error.message
            })
        })
}

const register = (req, res, next) => {
        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) {
                res.json({
                    error: err
                })
            }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
            gender:'',
            dob:'',
            bloodgrp:''
        })

        user.save()
            .then(user => {
                let regtoken = jwt.sign({ id: user.id }, 'verySecretpass', { algorithm: 'HS256' }, { expiresIn: '1hr' })
                let id = user._id
                res.json({
                    message: 'User Added Successfully!',
                    regtoken, id
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
        })
}

const login = (req, res, next) => {
    try{
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let logtoken = jwt.sign({ id: user.id }, 'verySecretpass', { algorithm: 'HS256' }, { expiresIn: '1hr' })
                        let id = user._id
                        res.json({
                            message: 'Login Successful!',
                            logtoken, id
                        })
                    } else {
                        res.json({
                            message: 'Password does not match'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'No user found!'
                })
            }
        })
    }
    catch(err){
            console.log(err);
      
    }
}


module.exports = {
    register, login, index, update,address,showAddress
}