var Movie = require('../modules/movie');
var User = require('../modules/user');
var Comment = require('../modules/comment');
var Category = require('../modules/category');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
//detail page
exports.detail =  function(req, res) {
	var id = req.params.id;
	console.log(id);
	Movie.findById(id, function(err, movie) {
		Movie.update({_id: id},{$inc: {pv: 1}}, function(err){
			if(err){
				console.log(err);
			}
		})
		Comment
		.find({movie: id})
		.populate('from', 'name')
		.populate('reply.from reply.to', 'name')
		.exec(function(err, comments){
			console.log(comments);
			res.render('detail', {
				title: movie.title,
				movie: movie,
				comments: comments
			})
		})
	  
	})
}
	


exports.save = function(req, res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;

	if(req.poster){
		movieObj.poster = req.poster;
	}
	if(id){
		Movie.findById(id, function(err, movie){
			if(err){
				console.log(err);
			}
			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/' + movie._id);
			})
		})
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			category: movieObj.category,
			categoryName: movieObj.categoryName,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		});

		var categoryId = _movie.category;
		var categoryName = _movie.categoryName;
		_movie.save(function(err, movie){
			if(err){
					console.log(err);
			}
			
			if(categoryId !== undefined ){
				Category.findById(categoryId, function(err, category){
					category.movies.push(movie._id);
					category.save(function(err, category){
						res.redirect('/movie/' + movie._id);
					})
				})
			} else if(categoryName){
				var category = new Category({
					name: categoryName,
					movies: [movie._id]
				});
				category.save(function(err, category){
					movie.category = category._id;
					movie.save(function(err, movie){
						res.redirect('/movie/' + movie._id);
					})
					
				})
				
				
			}			
		
		})
	}
	
}

exports.update = function(req, res){
	var id = req.params.id;

	Movie.findById(id, function(err, movie) {
		Category.find({},function(err, categories){
			res.render('admin', {
				title: movie.title,
				movie: movie,
				categories: categories
			})
		})
	  
  })	
	
}

exports.savePoster = function(req, res, next){
	var posterData = req.files.uploadPoster;
	console.log(req.files);
	var filePath = posterData.path;
	var originalFilename = posterData.originalFilename;

	if(originalFilename){
		fs.readFile(filePath, function(err, data){
			var timestamp = Date.now();
			var type = posterData.type.split('/')[1];
			var poster = timestamp + '.' + type;
			var newPath = path.join(__dirname,'../../', '/public/upload/' + poster);
			fs.writeFile(newPath, data, function(err){
				req.poster = poster;
				next();
			})
		})
	} else {
		next();
	}
}

//admin page
exports.new = function(req, res) {
	Category.find({},function(err, categories){
		res.render('admin', {
		  title: '后台录入页',
		  movie: {},
		  categories: categories
		})	
	});
}

//list page
exports.list = function(req, res) {
	Movie.fetch(function(err, movies){
		if(err){
			console.log(err);
		}
		res.render('list', {
			title: '列表页',
			movies: movies
		})
		
		
	})
	
}

//list delete movie
exports.del = function(req, res){
	var id = req.query.id;
	if(id){
		Movie.remove({_id: id}, function(err, movie){
			if(err){
				console.log(err);
			} else {
				res.json({success: 1});
			}
		})
	}
}

