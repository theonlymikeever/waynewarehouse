import React from 'react';
import { connect } from 'react-redux';

function RightSideCart(props) {
  const { cart, user } = props;
  const lineItems = cart.lineItems || [];

  return (
    <div className="col-sm-3 offset-sm-1 sidebar mt-3">
      <div className="sidebar-module sidebar-module-inset">
        <h5>Cart</h5>
        <div className="list-group">
        {
          lineItems.map(item => {
            return (
             <a key={ item.id } href={`/products/${ item.product.id }`} className="list-group-item">
                { item.product.name } &nbsp;({ item.quantity })
                <span className="badge badge-dark float-right">{ item.product.price * item.quantity }</span>
             </a>
            )
          })
        }
        </div>
      </div>
      <div className="sidebar-module mt-3">
        <h5>Subtotal</h5>
        <hr />
        <p>
          {
            lineItems.reduce((total, curr) => {
              console.log(typeof curr.product.price)
              return total+= curr.product.price
            }, 0)
          }
        </p>
        <a className="btn btn-primary btn-block" href={ `/#/orders/${ user.id }/lineItems` }>View Cart</a>
      </div>
    </div>
  )
}

const mapStateToProps = ({ cart, user }) => {
  return {
    cart,
    user
  }
}

export default connect(mapStateToProps)(RightSideCart);
