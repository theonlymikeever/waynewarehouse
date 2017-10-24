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

  before(function() {
    return db.sync({force: true})
  })


  //Main product get list
  it('returns all products', function() {
    return agent
    .get('/api/products')
    .expect(200)
    // .expect(res.body).to.be.an.instanceOf(Array);
  })
});

