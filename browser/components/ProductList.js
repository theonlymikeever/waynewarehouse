import React, { Component } from 'react';
import RightSideCart from './RightSideCart';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteProductOnServer, updateProducts, fetchProducts } from '../stores/products';
import { addItem } from '../stores/cart';


class ProductList extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      search: ''
    }
    this.changeProducts = this.changeProducts.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    this.setState({ search: ev.target.value })
  }

  changeProducts(categoryId) {
    if (categoryId === 'all') {
      return this.props.getAll();
    }
    if (this.state.categories.indexOf(categoryId) > -1) {
      const categories = this.state.categories.filter(cat => {
        return cat !== categoryId;
      })
      this.setState({ categories });
      return this.props.updateProductList(categories);
    }

    //necessary to allow above setstate to finish
    Promise.all([this.setState({ categories: [...this.state.categories, categoryId] })])
      .then(() => {
        this.props.updateProductList(this.state.categories);
      })

  }

  render() {
    const { handleDelete, handleAdd, user, cart, categories } = this.props;
    const { changeProducts, handleChange } = this;
    const products = this.props.products.filter(product => product.name.toLowerCase().match(this.state.search));

    return (
      <div className="row">
        <nav className="navbar navbar-expand-lg navbar-light bg-faded">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#category" aria-controls="category" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="category">
            <br />
            <form>
              <input name='search' value={this.state.search} onChange={handleChange} type='text' className='form-control' placeholder='Search products' />
            </form>
            <ul className="navbar-nav mr-auto">
              <strong><li className='nav-link' key={'all'} onClick={() => changeProducts('all')}>All Categories</li></strong>
              {
                categories.map(category => {
                  return (
                    <strong key={category.id} ><li className='nav-link' onClick={() => changeProducts(category.id)}>{category.name}</li></strong>
                  );
                })
              }
            </ul>
          </div>
        </nav>
        <div className={`card-deck mt-2 ${cart.lineItems && cart.lineItems.length ? 'col-sm-9' : ''}`}>
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

                      <button className="btn m-2 btn-success float-left"
                        onClick={() => handleAdd(user.id, product.id)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          cart.lineItems && cart.lineItems.length ? <RightSideCart /> : ''
        }
      </div>
    )
  }
}

const mapStateToProps = ({ products, user, cart, categories }) => {
  return {
    products,
    user,
    cart,
    categories
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
    },
    updateProductList: (catArr) => {
      dispatch(updateProducts(catArr));
    },
    getAll: () => {
      dispatch(fetchProducts());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);


