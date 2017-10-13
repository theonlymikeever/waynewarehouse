import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteLineItem } from '../stores/cart';

const CartList = (props) => {
  const { products, handleDelete, user, cart } = props;
  const lineItems = cart.lineItems || []
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-xs-12 col-md-8">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                lineItems.length && lineItems.map(item => {
                  return (
                  <tr key={item.id}>
                    <td><Link to={ `/products/${ item.product.id }` }>{ item.product.name }</Link></td>
                    <td>{ item.quantity }</td>
                    <td>{ item.product.price }</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={ () => handleDelete(user.id, item.product.id) }>Delete</button>
                    </td>
                  </tr>
                  )
                })
              }
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


const mapStateToProps = ({ products, user, cart }) => {
  return {
    products,
    user,
    cart
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDelete: (userId, productId) => {
      console.log('clicked delete')
      console.log(userId, productId)
      dispatch(deleteLineItem(userId, productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);



