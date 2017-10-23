import React from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../../stores/orders';

class AdminOrderList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "" 
    }
  }

  render() {
    const { orders, handleUpdate } = this.props;
    const optionVals = [{ value: "Created" }, { value: "Processing" }, { value: "Shipped" }];
    const totalPrice = orders.map(order => {
      return order.lineItems.reduce((res, val) => {
        return res + val.price
      }, 0)
    });

    return (
      <div className="p-3 mt-3">
        <h2>Orders</h2>
        <div className="alert alert-warning mt-3">This page is currently under construction</div>

        <table className="table table-hover mt-3">
          <thead className="thead-inverse">
            <tr>
              <th>ID</th>
              <th>Order Date</th>         
              <th>Total</th>
              <th>Address</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            orders && orders.map(order => {
              return (
                <tr key={ order.id }>
                  <th scope="row">{ order.id }</th>
                  <td>{ String(new Date(order.createdAt)) }</td>
                  <td>{ totalPrice }</td>
                  <td>{ order.address }</td>
                  <td>
                    <select defaultValue={ order.status ? order.status : "" } className="form-control">
                    {
                      optionVals.map(option => {
                        return (
                          <option key={ option.value }>{ option.value }</option>
                        )
                      })
                    }
                    </select>
                  </td>                  
                  <td>
                    <button className="btn btn-sm btn-info">Update</button>
                  </td>
                </tr>
              )
            })
          }
            
          </tbody>
        </table>
      </div>

    )
  }
}

const mapStateToProps = ({ orders }) => {
  return {
    orders
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleUpdate: function (orderId, event) {
      event.preventDefault();
      dispatch(updateOrder(orderId))

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderList)


