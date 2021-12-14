const mongoose = require('mongoose')

const Postdata = new mongoose.Schema({

    User_id:{ type: mongoose.Schema.Types.ObjectId},
    User_Name: {type: String, default:''},
    Heading: {type: String, default:''},	
	Description: {type: String, default:'None'},
    LastModifiedDate:{type: Date,default: Date.now },
    ImageOfPost:{type:"string",default:"None"}
})

module.exports = mongoose.model('Postdata', Postdata)