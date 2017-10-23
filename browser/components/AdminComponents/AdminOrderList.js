import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class AdminOrderList extends React.Component {

  // this is hard coded for now

  render() {
   
    return (
      <div className="p-3 mt-3">
        <h2>Orders</h2>
        <div className="alert alert-warning mt-3">This page is currently under construction</div>

        <table className="table table-hover mt-3">
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
                <button className="btn btn-sm btn-info">Update</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderList)


