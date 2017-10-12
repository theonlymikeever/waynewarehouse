import React, { Component } from 'react';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


const CartList = (props) => {
  
  return (
    <div className="container">
      <h1>Cart</h1>
      
      <div className="col-xs-12">
        Product

        <form onSubmit={ (event) => props.handleSubmit() }>
          <div className="form-group">
            <button className="btn btn-primary">Proceed to Checkout</button>
          </div>
        </form>
      </div>



    </div>
  )
}


const mapStateToProps = ({ lineItem }) => {
  return {
    // lineItem??
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: (event) => {
      event.preventDefault();
      // dispatch(<functionFromStore>)
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
