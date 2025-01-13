const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        required:false
    },
    email:{
        type: String,
        unique:true,
        required: true,
    },
    media:{
       albums:[{
           type:mongoose.Schema.Types.ObjectId,
           required:false,
           ref:'Music',
           default:[]
       }],
       songs:[{
           type:mongoose.Schema.Types.ObjectId,
           required:false,
           ref:'Music',
           default:[]
       }]
    }
},{timestamps:true});
module.exports = mongoose.model('User', userSchema);