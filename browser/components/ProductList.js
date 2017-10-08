import React, { Component } from 'react';

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
    const { products } = this.state;
    return (
      <div> {  products } </div>
    )
  }
}


export default ProductList;
