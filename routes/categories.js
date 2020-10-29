const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/').get((req, res) => {
  Category.find()
    .then(category => res.json(category))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const categoryName = req.body.name;
  Category.find({name: categoryName}, (err, docs) => {
    if(docs.length){
      res.status(400).json('Category already exist')
    }

    const newCategory = new Category({categoryName});
    newCategory.save()
      .then(() => res.json('Category added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });  
});

router.route('/:query').delete((req, res) => {
  Category.findOneAndDelete(req.params.query)
    .then(category => res.json('Category Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;