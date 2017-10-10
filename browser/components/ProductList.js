import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductList extends Component {
  constructor(){
    super();
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    //testing
    this.setState({
      products: [
      'something'
      ]
    })
  }

  render(){
    const { products } = this.props;
    return (
      <div>
        {
          products.map(product => {
            return <li key={ product.id }>{product.name}</li>
          })
        }
      </div>
    )
  }
}

const mapStatetoProps = ({ products }) => {
  return {
    products
  }
}

export default connect(mapStatetoProps)(ProductList);
