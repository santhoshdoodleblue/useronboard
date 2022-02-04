const User=require('../models/User')

//show the list of users
const index=(req,res,next)=>{
    User.find()
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(error=>{
            res.json({
                message:'Error in list of user display'
            })
        })
}

//return single user
const show=(req,res,next)=>{
    let userID=req.body.userID
    User.findById(userID)
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(error=>{
            res.json({
                message:'Error in listing single user display'
            })
        })
}


//add user to db
const store=(req,res,next)=>{
    let user=new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
    })
    user.save()
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(error=>{
            res.json({
                message:'Error in adding  user'
            })
        })
}

//update user
/*const update=(req,res,next)=>{
    let userID=req.body.id
    let updatedData=new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
    })
    User.findByIdAndUpdate(userID,{$set:updatedData})
        .then(()=>{
            res.json({
                message:'User updated successfully'
            })
        })
        .catch(error=>{
            res.json({
                message:'Error in updating  user'
            })
        })
}*/


//delete an user
const destroy=(req,res,next)=>{
    let userID=req.body.userID
    User.findByIdAndRemove(userID)
        .then(()=>{
            res.json({
                message:'User deleted successfully'
            })
        })
        .catch(error=>{
            res.json({
                message:'Error in deleting  user'
            })
        })
}


module.exports={
    index,show,destroy,store
    //update,
}