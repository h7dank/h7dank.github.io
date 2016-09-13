var Movie = require('../modules/movie')
var Category = require('../modules/category')

exports.index = function(req, res){
	Category
		.find({})
		.populate({path: 'movies', options: {limit: 5}})
		.exec(function(err, categories){
			if(err){
			console.log(err);
			}
			res.render('index', {
				title: 'Movie 首页',
				categories: categories
			})
			
		})

}

exports.search = function(req, res){
	var catId = req.query.cat;
	var q = req.query.q;
	var page = Math.floor(req.query.p) || 0;
	var count = 2;
	var index = page * count;
	console.log("keyword: " + q);
	if(catId !== undefined){
		Category
			.find({_id: catId})
			.populate({path: 'movies'})
			.exec(function(err, categories){
				if(err){
					console.log(err);
				}
				var category = categories[0];
				var movies = category.movies || {};
				var results = movies.slice(index, index+count);	
				res.render('results', {
					title: '结果列表',
					keyword: category.name,
					categories: category,
					currentPage: Math.floor(page+1),
					totalPage: Math.ceil(movies.length/count),
					query: 'cat=' + catId,
					movies: results
				})
				
			})
	} else {
		Movie
			.find({title: new RegExp(q+'.*' ,'i')})
			.exec(function(err, movies){
				if(err){
					console.log(err);
				}
				var results = movies.slice(index, index+count);	
				console.log("results: "+ results);
				res.render('results', {
					title: '结果列表',
					keyword: q,
					currentPage: Math.floor(page+1),
					totalPage: Math.ceil(movies.length/count),
					query: 'q=' + catId,
					movies: results
				})
			})
	}

}






