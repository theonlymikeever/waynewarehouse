import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteLineItem, checkoutCart } from '../stores/cart';

class CartList extends Component {
  constructor() {
    super();
    this.state = {
      address: ''
    };

    this.changeAddress = this.changeAddress.bind(this);
  }

  changeAddress(ev) {
    this.setState({ address: ev.target.value })

  }


  render() {
    const { handleDelete, handleCheckout, user, cart } = this.props;
    const { changeAddress } = this;
    const lineItems = cart.lineItems || []
    const subtotal = lineItems.reduce((total, curr) => {
      return total + curr.price
    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    console.log(this.state);
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
                <tr>
                  <td>Address: </td>
                  <td>
                    {user.addresses ?
                      <select className='form-control' onChange={changeAddress}>
                        <option>Address</option>
                        {
                          user.addresses && user.addresses.map(address => {
                            return (
                              <option key={address.id} value={address.address}>{address.address}</option>
                            );
                          })
                        }
                      </select>
                      :
                      <form>
                        <input type='text' placeholder='Enter shipping address' className='form-control' />
                      </form>
                    }
                  </td>
                </tr>
              </tbody>

            </table>
          </div>

          <div className="card col-xs-12 col-md-4 p-3">
            <p><strong>Subtotal</strong><span className="float-right">$ {subtotal ? subtotal : 0.00}</span></p>
            <Link onClick={() => handleCheckout(cart.id, this.state)} className="btn btn-primary mt-2 btn-block" to={`/orders/${cart.id}/confirmation`}>Proceed to Checkout</Link>
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
    handleCheckout: (cartId, address) => {
      dispatch(checkoutCart(cartId, address))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
