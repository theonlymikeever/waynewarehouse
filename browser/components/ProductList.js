import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteProductOnServer } from '../stores/products';

function ProductList(props) {
    const { products, handleDelete } = props;
    return (
     <div className="card-deck mt-2">
        {
          products.map( product => {
            return (
              <div className="mb-3 col-sm-4" key={ product.id }>
                <div className="card">
                  <div className="card-body">
                    <img className="mb-2 rounded" src={ product.image } width="200"/>
                    <h4 className="card-title">{ product.name }</h4>
                    <h6 className="card-subtitle mt-2 text-muted">${ product.price }</h6>
                    <p className="card-text">lb: { product.weight }</p>
                    <form className="form-inline btn mr-2 mb-0" onSubmit={ handleDelete }>
                      <button value={product.id} name="delete" className="btn btn-danger">Delete</button>
                    </form>
                    <Link className="btn mr-2 btn-primary" to="#">Add to Cart</Link>
                  </div>
                </div>
                </div>
              )
          })
        }
        </div>
    )
}

const mapStateToProps = ({ products }) => {
  return {
    products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (evt) => {
      evt.preventDefault();
      dispatch(deleteProductOnServer(evt.target.delete.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
