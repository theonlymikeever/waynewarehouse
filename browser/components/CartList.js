import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
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
                  lineItems.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td><Link to={`/products/${item.product.id}`}>{item.product.name}</Link></td>
                        <td>{item.quantity}</td>
                        <td>{`$${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</td>
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id, item.product.id, index)}>Remove</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <NavLink to="/products" className="nav-link" activeClassName="active">&lt; Back to Shopping</NavLink>
          </div>

          <div className="card col-xs-12 col-md-4 p-3">
            <p><strong>Subtotal</strong><span className="float-right">$ { subtotal ? subtotal : 0.00 }</span></p>
          <Link onClick={() => handleCheckout(cart.id)} className="btn btn-primary mt-2 btn-block" to={user.id !== 0?
              `/orders/${cart.id}/confirmation`: '/login' }>Proceed to Checkout</Link>
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
    handleDelete: (userId, productId, index) => {
      dispatch(deleteLineItem(userId, productId, index))
    },
    handleCheckout: (cartId) => {
      dispatch(checkoutCart(cartId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
