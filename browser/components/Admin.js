import React from 'react';
import { connect } from 'react-redux';
import { deleteProductOnServer } from '../stores/products';

function Admin(props){
  const { products } = props;
  
  return (
    <div className="container">

      <div className="card p-3 mt-3">
        <form>
          <div className="form-group">
            <input name="name" type="text" 
              className="form-control"
              placeholder="Enter a product name"/>
          </div>
          <div className="form-group">
            <input name="name" type="text" 
              className="form-control"
              placeholder="Enter a product description"/>
          </div>
          <div className="form-group">
            <input name="name" type="text" 
              className="form-control"
              placeholder="Enter price"/>
          </div>
          <div className="form-group">
            <input name="name" type="text" 
              className="form-control"
              placeholder="Enter weight"/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add new product</button>
          </div>
        </form>
      </div>

      <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Weight</th>
              <th></th>
              
            </tr>
          </thead>
          <tbody>
          { 
            products.map(product => {
              return (
                <tr>
                  <td>{ product.name }</td>
                  <td>
                    <input value={ product.price } className="form-control" />               
                  </td>
                  <td>
                    <input value={ product.weight } className="form-control" />               
                  </td>
                  <td>
                    <button className="btn btn-sm btn-warning">Update</button>
                  </td>
                  
                </tr>
              )
            })
          }
          </tbody>
        </table>

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
    handleDelete: (event) => {
      event.preventDefault();
      dispatch(deleteProductOnServer(evt.target.delete.value));
    }, 
    handleAdd: (event) => {

    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);


