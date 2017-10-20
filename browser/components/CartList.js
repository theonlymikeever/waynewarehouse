import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteLineItem, checkoutCart } from '../stores/cart';

class CartList extends Component {

  render() {
    const { handleDelete, handleCheckout, user, cart } = this.props;
    const lineItems = cart.lineItems || []
    const subtotal = lineItems.reduce((total, curr) => {
      return total + curr.price
    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

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
              <tbody >
                {
                  lineItems.map(item => {
                    return (
                      <tr key={item.id}>
                        <td><Link to={`/products/${item.product.id}`}>{item.product.name}</Link></td>
                        <td>{item.quantity}</td>
                        <td>{`$${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</td>
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id, item.product.id)}>Remove</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
              <tr>
              <td>Address: </td>
                <td>
                  <select className = 'form-control'>
                    {
                      user.addresses && user.addresses.map(address => {
                        return (
                          <option key={address.id}>{address.address}</option>
                        );
                      })
                    }
                  </select>
                </td>
              </tr>
            </table>
          </div>

          <div className="card col-xs-12 col-md-4 p-3">
            <p><strong>Subtotal</strong><span className="float-right">$ {subtotal ? subtotal : 0.00}</span></p>
            <Link onClick={() => handleCheckout(cart.id)} className="btn btn-primary mt-2 btn-block" to={`/orders/${cart.id}/confirmation`}>Proceed to Checkout</Link>
          </div>

        </div>

      </div>

    )
  }
}


const mapStateToProps = ({ products, user, cart }) => {
  return {
    products,
    user,
    cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (userId, productId) => {
      dispatch(deleteLineItem(userId, productId))
    },
    handleCheckout: (cartId) => {
      dispatch(checkoutCart(cartId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
