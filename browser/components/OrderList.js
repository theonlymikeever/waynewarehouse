import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


class OrderList extends Component {

  // this is hard coded for now
  // if admin, show 'update' button

  render() {
   
    return (
      <div className="container">
        <h1>Orders</h1>

        <table className="table table-striped">
          <thead className="thead-inverse">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td><Link to={`/orders/1`}>10/08/2017</Link></td>
              <td>
                <select value="ORDER_STATUS" className="form-control">
                  <option>Created</option>
                  <option>Processing</option>
                </select>
              </td>
              <td>100.00</td>
              <td>
                <button className="btn btn-sm btn-warning">Update</button>
              </td>
              <td>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}

const mapStateToProps = ({ cart }) => {
  return {
    cart
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDelete: function (orderId, event) {
      event.preventDefault();
      dispatch(deleteOrder(orderId));

    },
    handleUpdate: function (event) {
      event.preventDefault();

    }
  }
}

const orderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderList))
export default orderContainer;

