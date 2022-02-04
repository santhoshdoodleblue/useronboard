const mongoose=require('mongoose')
const Schema=mongoose.Schema

const addressSchema  = new Schema( 
    {
    userId: {
        type: String,
        required:true
    },
    contactName:{
        type: String,
        required:true
    },
    contact:{
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    pincode: {
        type: String,
        required:true
    },
    landmark: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required:true
    },
    placeType:{
        type: String,
        required:true
    }
 },{timestamps:true} 
 )

const Address=mongoose.model('address',addressSchema)
module.exports=Address


