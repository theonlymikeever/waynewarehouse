import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { addItem } from '../stores/cart';

function ProductDetail(props) {
  const { products, user, handleAdd } = props;
  const productId = props.match.params.productId * 1;
  const product = products.length > 0 ? products.filter(prod => prod.id === productId)[0] : {};
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
                  <Link className="btn m-2 btn-success float-left" to={`/orders/${user.id}/lineItems`}
                    onClick={() => handleAdd(user.id, product.id)}>Add to Cart</Link>
                  <Link to={'/products'} className="card-link float-right">Back</Link>

            </div>
          </div>
      </div>
    )
};

const mapStateToProps = ({ products, user }) => {
  return {
    products,
    user
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    handleAdd: (userId, productId) => {
      dispatch(addItem(userId, productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
