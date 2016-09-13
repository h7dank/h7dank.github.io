var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
	name:{
		unique: true,
		type: String
	},
	password: String,
	role: {
		type: Number,
		default: 0
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

UserSchema.methods = {
	comparePassword: function(password, cb){
		if(this.password == password){
			
			return cb(null, true);
		} else {
			return cb(null, false);
		}
	}
}

UserSchema.pre('save', function(next) {
	var user = this;
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}
	
	next()
})

UserSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb) 
	}
}

module.exports = UserSchema;