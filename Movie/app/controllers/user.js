var User = require('../modules/user')
var _ = require('underscore');

exports.showSignup = function(req, res){
	res.render('signup',{
		title: '注册页面'
	})
}

exports.showSignin = function(req, res){
	res.render('signup',{
		title: '登陆页面',
	})
}

exports.signup = function(req, res){
	var _user = req.body.user;
	
	User.find({name: _user.name}, function(err, user){
		if(err){
			console.log(err);
		}
		if(user.length > 0){
			return res.redirect('/signin');
		} else {
			var user = new User(_user);
			user.save(function(err, user){
				if(err){
					console.log(err);
				}
				res.redirect('/');
			})
		}
	})
					
}

exports.list = function(req, res) {
	User.fetch(function(err, users){
		if(err){
			console.log(err);
		}
		res.render('userlist', {
			title: '用户列表页',
			users: users
		})
		
		
	})		
}

exports.signin = function(req, res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	
	User.findOne({name: name},function(err, user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/signup');
		}
		user.comparePassword(password, function(err, isMatched){
			if(err){
				console.log(err);
			}
			if(isMatched){
				req.session.user = user;
				return res.redirect('/');
			} else {
				return res.redirect('/signin');
			}
		})
	})
}

exports.logout = function(req, res){
			
	delete req.session.user;
	//delete app.locals.user;
	res.redirect('/');
}

exports.signinRequired = function(req, res, next){
	var user = req.session.user;
	
	if(!user){
		return res.redirect('/signin');
	} 
	next();
}

exports.adminRequired = function(req, res, next){
	var user = req.session.user;
	
	if(user.role <= 10){
		return res.redirect('/signin');
	} 
	next();
}

