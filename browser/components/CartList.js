import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteLineItem } from '../stores/cart';

const CartList = (props) => {
  const { products, handleDelete, user } = props;

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-xs-12 col-md-8">  
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Cart</th>
                <th>Quantity</th>
                <th>Price</th> 
                <th></th>             
              </tr>
            </thead>
            <tbody>
              <tr key='itemId'>      
                <td><Link to="#">Item 1</Link></td>
                <td>Quantity</td>
                <td>Price</td>
                <td>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td> 
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card col-xs-12 col-md-4">
          Subtotal(1 item): price
          <Link className="btn btn-primary m-2" to={`/orders/${user.id}`}>Proceed to Checkout</Link>
        </div>

      </div>
      
    </div>    

  )
}


const mapStateToProps = ({ products, user }) => {
  return {
    products, 
    user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDelete: (userId, productId, evt) => {
      evt.preventDefault();
      dispatch(deleteLineItem(userId, productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);



