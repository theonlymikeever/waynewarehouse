'user strict';

//Requires
const expect = require('chai').expect;
const request = require('supertest-as-promised');

const app = require('../server');
const agent = request.agent(app);

const db = require('../models/db');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Review = require('../models/Review');


/*
*
* Product Testing
*
*/

describe('GET /products', function() {

  //Main product get list
  it('returns all products', function() {
    return agent
    .get('/api/products')
    .expect(200)
    .expect(function(res){
      expect(res.body).to.be.an.instanceOf(Array);
    })
  })
});

describe('GET, POST, PUT, DEL /products/:productId', function(){

  //Starting with the list of our first seeded products
  //occastionally on startup they seed out of order
  //so we'll use an indexOf to ensure it's at least building
  //one of these
  const intialProducts = ['Utility Belt', 'Invisibility Cloak', 'Captain Jack\'s Compass', 'Bag End', 'Bane\'s Mask']

  //Returns spefic products
  it('returns a single product', function(){
    return agent
    .get('/api/products/1')
    .expect(200)
    .expect(function(res){
      expect(intialProducts.indexOf(res.body.name)).to.not.equal(-1)
    })
  })

  //Create a new product
  it('creates a new product with proper info', function(){
    const prod = {
      name: 'The Elder Wand',
      price: 300000,
      description: 'The most powerful wand of them all',
      weight: 2
    }

    return agent
    .post('/api/products')
    .send(prod)
    .expect(201)
    .then(function (){
      return Product.findOne({ where: {name: 'The Elder Wand'}});
    })
    .then(function(product) {
      expect(product).to.exist // eslint-disable-line no-unused-expressions
    })
  })

  //Updating product information
  //**THIS IS BROKEN**
  xit('can update a product\'s info, even multiple fields', function(){
    const update = {
      name: 'Pokeball',
      price: 999
    }

   return agent
    .put('/api/products/1')
    .send(update)
    .expect(200)
    .then(function(){
      return Product.findOne({where:{name:'Pokeball'}})
    })
    .then(function(product){
      expect(product).to.exist // eslint-disable-line no-unused-expressions
      expect(product.price).to.equal('999')
    })
  })

  //Deleting. Cannot use supertest here so we use request's .del method
  it('can delete a product', function(){
    request(app).del('/api/products/1').expect(200)
  })
})

/*
*
* Orders Testing
*
*/

describe('GET /orders', function() {
    var cart;

    beforeEach(function () {
      return db.sync()
        .then(() => {
          return Order.create({
        isCart: true
      })
      .then(function (createdCart) {
        cart = createdCart;
      });
        })

    });

  //Get open cart
  xit('returns new cart', function() {
    return agent
    .get('/api/orders')
    .expect(200)
    .expect(function(res){
      expect(res.body).to.be.an.instanceOf(Array);
    })
  })
});

describe('GET /orders/:userId', function(){

  //Returns spefic cart for user
  xit('returns a single cart for a user', function(){
    return agent
    .get('/api/orders/1')
    .expect(200)
  })

  //Create a new cart
  xit('creates a new line item', function(){
    const item = {

    }

    return agent
    .post('/api/products')
    .send(item)
    .expect(201)
    .then(function (){
      // return Product.findOne({ where: {name: 'The Elder Wand'}});
    })
    .then(function(product) {
      expect(product).to.exist // eslint-disable-line no-unused-expressions
    })
  })
})

