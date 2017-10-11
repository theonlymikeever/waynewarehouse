import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

function ProductDetail(props) {
  const { products } = props;
  const productId = props.match.params.productId*1;
  const product = products.length > 0 ? products.filter(product => product.id === productId)[0] : {};
    return (
     <div className='container' key={ product.id }>
        <div className="row" >
           <img className="mb-2 rounded col-sm-5" src={ product.image } />

            <div className="card-body col-sm-7">
              <h4 className="card-title">{ product.name }</h4>
              <div className='card-block'>
                <p className="card-text">{ product.description }</p>
              </div>
              <p className="card-text">lb: { product.weight }</p>
              <h6 className="card-subtitle mt-2 text-muted">${ product.price }</h6>
              <br></br>
              <Link className="btn mr-2 btn-primary" to="#">Add to Cart</Link>
                  <Link to={'/products'} className="card-link float-right">Back</Link>

            </div>
          </div>
      </div>
    )
};

const mapStateToProps = ({ products }) => {
  return {
    products
  }
}

export default connect(mapStateToProps, null)(ProductDetail);