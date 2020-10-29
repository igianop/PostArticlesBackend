const router = require('express').Router();
let Article = require('../models/article.model');

router.route('/').get((req, res) => {
  Article.find()
    .then(article => res.json(article))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    description: req.body.description
  });

  newArticle.save()
    .then(() => res.json('Article added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:fetch').get((req, res) => {
  Article.find(req.params.fetch)
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

router.route('/:query').delete((req, res) => {
  Article.findOneAndDelete(req.params.query)
    .then(article => res.json('Article Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;