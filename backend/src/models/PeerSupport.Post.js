const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    author : {type: mongoose.Schema.Types.ObjectId,  ref:"User", required: true},
    authorType: {type:String, default: "Anonymous User" },
    content: {type: String, required:true, trim:true},
    tags :[{type:String}],
    upvotes: {type: Number, default: 0},
    reports: {type : Number, default:0},
    isFlagged : {type: Boolean, default:false},
     createdAt : {type: Date, default : Date.now()},
});

module.exports = mongoose.model("Post", postSchema);
