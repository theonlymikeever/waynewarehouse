import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteLineItem, checkoutCart } from '../stores/cart';
import { updateUser } from '../stores/user';

class CartList extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      addressValue: ''
    };

    this.changeAddress = this.changeAddress.bind(this);
    this.addAddress = this.addAddress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  changeAddress(ev) {
    this.setState({ address: ev.target.value })
  }

  handleChange(ev) {
    this.setState({ addressValue: ev.target.value });
  }

  addAddress(ev) {
    ev.preventDefault();
    this.props.updateUser({ id: this.props.user.id, address: this.state.addressValue })
  }


  render() {
    const { handleDelete, handleCheckout, user, cart } = this.props;
    const { changeAddress, addAddress, handleChange } = this;
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
                <tr>
                  <td>Address: </td>
                  <td>
                    {user.addresses && user.addresses.length ?
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
                      <form onSubmit={addAddress} className='form-control'>
                        <input type='text' value={this.state.addressValue} onChange={handleChange} placeholder='Enter shipping address' className='form-control' />
                        <br />
                        <button className='btn btn-default'>Add Address</button>
                      </form>
                    }
                  </td>
                </tr>
              </tbody>

            </table>
            <NavLink to="/products" className="nav-link" activeClassName="active">&lt; Back to Shopping</NavLink>
          </div>

          <div className="card col-xs-12 col-md-4 p-3">

            <p><strong>Subtotal</strong><span className="float-right">$ {subtotal ? subtotal : 0.00}</span></p>
            {this.state.address.length ?
              <Link onClick={() => handleCheckout(user.id, cart.id, { address: this.state.address, total: subtotal })} className="btn btn-primary mt-2 btn-block" to={`/orders/${cart.id}/confirmation`}>Proceed to Checkout</Link>
              :
              <h4 className='text-info'>Select address to continue</h4>
            }
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

    handleCheckout: (userId, cartId, address) => {
      if (userId !== 0)
        dispatch(checkoutCart(userId, cartId, address))
    },
    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
