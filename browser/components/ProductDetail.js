import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { addItem } from '../stores/cart';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';

function ProductDetail(props) {
  const { products, user, cart, handleAdd, history, reviews } = props;
  const productId = props.match.params.productId * 1;
  const product = products.length > 0 ? products.filter(prod => prod.id === productId)[0] : {};
  const reviewsList = reviews.length > 0 ? reviews.filter(rev => rev.productId === productId) : [];

    return (
     <div className='container' key={ product.id }>
        <div className="row" >
          <div className='col-sm-6'>
            <img className="mb-2 rounded vertical-center fill" src={ product.image } />
          </div>
            <div className="card-body col-sm-6">
              <h4 className="card-title">{ product.name }</h4>
              <div className='card-block'>
                <p className="card-text">{ product.description }</p>
              </div>
              <p className="card-text">lb: { product.weight ? product.weight : 'NA' }</p>
              <h6 className="card-subtitle mt-2 text-muted">${ product.pricePretty }</h6>
              <br></br>
              <Link className="btn m-2 btn-success float-left" to={`/products`}
                        onClick={() => handleAdd(user.id, product.id, cart, history)}>Add to Cart</Link>
              <Link to={'/products'} className="card-link float-right">Back</Link>
            </div>
            <div className="container mt-3">
            <hr />
            {
              reviewsList ?
              <div className="mb-3">
                <h3>Reviews</h3>
                <ReviewsList reviews={reviewsList} productId={productId}/>
                <hr />
              </div>
              : ''
            }
            <h3>Write a Review</h3>
            <ReviewForm productId={productId} />
            </div>
          </div>
      </div>
    )
}

const mapStateToProps = ({ products, user, cart, history, reviews }) => {
  return {
    products,
    user,
    cart, 
    reviews
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleAdd: (userId, productId, cart, history) => {
      dispatch(addItem(userId, productId, cart, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
