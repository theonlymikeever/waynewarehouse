// import React from 'react';
// import RightSideCart from './RightSideCart';
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux';
// import { deleteProductOnServer } from '../stores/products';
// import { addItem } from '../stores/cart';


// function ProductList(props) {
//   const { products, handleDelete, handleAdd, user, cart } = props;

//   return (
//   <div className="row">
//     <div className={ `card-deck mt-2 ${ cart.lineItems ? 'col-sm-9' : ''}` }>
//       {
//         products.map(product => {
//           return (
//             <div className="mb-3 col-sm-4" key={product.id}>
//               <div className="card">
//                 <div className="card-body">
//                   <Link to={`/products/${product.id}`} ><img className="mb-2 rounded" src={product.image} width="150" /></Link>
//                   <Link to={`/products/${product.id}`} ><h4 className="card-title">{product.name}</h4></Link>
//                   <p className="card-text">{product.shortDescription}

//                     <Link to={`/products/${product.id}`} className="card-link">more</Link></p>
//                   <h6 className="card-subtitle mt-2 text-muted">${product.price}</h6>
//                   <p className="card-text">lb: {product.weight}</p>
//                   <form className="form-inline btn mr-2 mb-0" onSubmit={handleDelete}>
//                     {(product.isAdmin) ?
//                       <button value={product.id} name="delete" className="btn btn-danger">Delete</button> : ''}
//                   </form>

//                   <Link className="btn m-2 btn-success float-left" to={`/orders/${user.id}/lineItems`}
//                     onClick={() => handleAdd(user.id, product.id)}>Add to Cart</Link>
//                 </div>
//               </div>
//             </div>
//           )
//         })
//       }
//     </div>
//     {
//       cart.lineItems ? <RightSideCart /> : ''
//     }
//   </div>
//   )
// }

// const mapStateToProps = ({ products, user, cart }) => {
//   console.log('cart ', cart)
//   return {
//     products,
//     user,
//     cart
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     handleDelete: (evt) => {
//       evt.preventDefault();
//       dispatch(deleteProductOnServer(evt.target.delete.value))
//     },
//     handleAdd: (userId, productId) => {
//       dispatch(addItem(userId, productId))
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList);





import React from 'react';
import RightSideCart from './RightSideCart';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteProductOnServer } from '../stores/products';
import { addItem } from '../stores/cart';
import axios from 'axios'


class ProductList extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      cart: {}
    }
    this.addItemAsGuest = this.addItemAsGuest.bind(this);
  }

  addItemAsGuest(userId, productId){
    axios.post(`/api/orders/0/lineItems`, { productId })
      .then(res => res.data)
      .then(item => {
        this.setState({
          guestcart: this.state.cart.concat(item)
        })
      })
  }

  componentDidMount(){
    axios.get(`/api/orders/0/lineItems`)
      .then(res => res.data)
      .then(cart => {
        this.setState({ cart })
      })
  }


  render(){
    const { products, handleDelete, handleAdd, user, cart } = this.props;
    const { guestcart } = this.state;

    return (      
      <div className="row">
        <div className={ `card-deck mt-2 ${ cart.lineItems ? 'col-sm-9' : ''}` }>
          {
            products.map(product => {
              return (
                <div className="mb-3 col-sm-4" key={product.id}>
                  <div className="card">
                    <div className="card-body">
                      <Link to={`/products/${product.id}`} ><img className="mb-2 rounded" src={product.image} width="150" /></Link>
                      <Link to={`/products/${product.id}`} ><h4 className="card-title">{product.name}</h4></Link>
                      <p className="card-text">{product.shortDescription}

                        <Link to={`/products/${product.id}`} className="card-link">more</Link></p>
                      <h6 className="card-subtitle mt-2 text-muted">${product.price}</h6>
                      <p className="card-text">lb: {product.weight}</p>
                      <form className="form-inline btn mr-2 mb-0" onSubmit={handleDelete}>
                        {(product.isAdmin) ?
                          <button value={product.id} name="delete" className="btn btn-danger">Delete</button> : ''}
                      </form>
                      { 
                        if(user.id){
                          <Link className="btn m-2 btn-success float-left" to={`/orders/${user.id}/lineItems`}
                          onClick={ () => handleAdd(user.id, product.id) }>Add to Cart</Link>
                        } else {
                          <Link className="btn m-2 btn-success float-left" to={`/orders/0/lineItems`}
                          onClick={ () => this.addItemAsGuest(product.id) }>Add to Cart</Link>
                        }

                      }
                      
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          cart.lineItems ? <RightSideCart /> : ''
        }
      </div>
    )
  }
}

const mapStateToProps = ({ products, user, cart }) => {
  console.log('cart ', cart)
  return {
    products,
    user,
    cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (evt) => {
      evt.preventDefault();
      dispatch(deleteProductOnServer(evt.target.delete.value))
    },
    handleAdd: (userId, productId) => {
      dispatch(addItem(userId, productId))
      
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
