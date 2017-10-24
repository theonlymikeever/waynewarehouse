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
      // expect(res.body)
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
    }

    return agent
    .post('/api/products')
    .send(prod)
    .expect(201)
    .then(function (){
      return Product.findOne({ where: {name: 'The Elder Wand'}});
    })
    .then(function(prod) {
      expect(prod).to.exist // eslint-disable-line no-unused-expressions
    })
  })
  //Updating product information
  it('can update a product\'s info, even multiple fields', function(){
    const update = {
      name: 'Pokeball',
      price: 999
    }

   return agent
    .put('/api/products/2')
    .send(update)
    .expect(200)
    .then(function(){
      return Product.findOne({where:{name:'Pokeball'}})
    })
    .then(function(prod){
      expect(prod).to.exist // eslint-disable-line no-unused-expressions
      expect(prod.price).to.equal('999')
    })
  })
})

