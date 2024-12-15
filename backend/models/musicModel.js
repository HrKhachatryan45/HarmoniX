const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  musicSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    mediaId:{
            type:String,
            required:false
        }
},{timestamps:true});

module.exports = mongoose.model('Music',musicSchema);
