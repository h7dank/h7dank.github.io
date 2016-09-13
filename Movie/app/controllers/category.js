var Movie = require('../modules/movie')
var User = require('../modules/user')
var Comment = require('../modules/comment')
var Category = require('../modules/category')
var _ = require('underscore');



exports.save = function(req, res){
	var _category = req.body.category;

	var category = new Category(_category);

	category.save(function(err, movie){
		if(err){
				console.log(err);
			}
			res.redirect('/admin/category/list');
	
	})

	
}


//category page
exports.new = function(req, res) {
    res.render('category_admin', {
      title: '后台分类录入页',
	  category: {}
      
    })
  
}

exports.list = function(req, res) {
	Category.fetch(function(err, categories){
		if(err){
			console.log(err);
		}
		res.render('category_list', {
			title: '分类列表页',
			categories: categories
		})
		
		
	})		
}


