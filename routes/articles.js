const router = require('express').Router();
let Article = require('../models/article.model');
let category = require('../models/category.model');
const mongoose = require('mongoose');

router.route('/all').get((req, res) => {
  Article.find().populate('categoryId')
    .then(article => res.json(article))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addarticle').post((req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    categoryId: mongoose.Types.ObjectId(req.body.categoryId)
  });

  newArticle.save()
    .then(() => res.json('Article added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
  const query = {}
  if(req.query.id){
    query._id = mongoose.Types.ObjectId(req.query.id);
  }else if(req.query.title){
    query.title = req.query.title;
  }else{
    query._id = mongoose.Types.ObjectId(req.query.id);
    query.title = req.query.title
  }
  
  Article.findOne(query)
    .then(article => res.json(article))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {

  Article.findById(req.params.id)
    .then(article => {
      article.content = req.body.content;
      
      article.save()
      .then(() => res.json('Article Updated'))
      .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Article.findOneAndDelete(req.params.id)
    .then(article => res.json('Article Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;