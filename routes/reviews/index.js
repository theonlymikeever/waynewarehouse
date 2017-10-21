const router = require('express').Router();
const Review = require('../../models/Review');
const User = require('../../models/User');

//Get all reviews for Products
router.get('/products', (req, res, next) => {
  Review.findAll({include: [{
      model: User, attributes: ['name']}
    ]})
    .then(reviews => res.send(reviews))
    .catch(next);
});

//Get specifc review - mostly for testing
router.get('/:reviewId', (req, res, next) => {
  Review.findById(req.params.reviewId)
    .then(review => res.send(review))
    .catch(next);
});

//Write Reviews
router.post('/product/:productId', (req, res, next) => {
  //obj coming in as body should have the userId
  Review.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next);
})

//Delete Reviews
router.delete('/:reviewId', (req, res, next) => {
  // obj coming in as body should have the userId
  Review.destroy({ where: { id: req.params.reviewId }})
    .then(() => res.sendStatus(200))
    .catch(next);
})

module.exports = router;
