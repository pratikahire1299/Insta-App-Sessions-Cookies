const mongoose = require('mongoose')

const User = new mongoose.Schema({
	Name: {type: String, default:''},
	User_Name: {type: String, default:''},
	Contact_Number: {type: Number, default:0},
	Birthdate:{type: "string",format: "date"},
	Password: {type:String},
	UserProfile:{type:"string",default:"None"}
})

module.exports = mongoose.model('User', User)