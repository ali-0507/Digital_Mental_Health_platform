const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User", index : true, required:true},
    type : {type: String, enum: ["chat", "screening", "booking", "resource", "peersupport"], required:true},
    meta : {type: Object, default: {}},
},
{timestamps: {createdAt:true, updatedAt:false}}
);

activitySchema.index({createdAt: -1});

module.exports = mongoose.model("Activity", activitySchema);
