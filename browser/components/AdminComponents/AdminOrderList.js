import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders, updateOrder, deleteOrder } from '../../stores/orders';

class AdminOrderList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "" 
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({ status: event.target.value })
  }

  // componentDidMount(){
  //   this.props.getOrders(this.props.orders);
  // }

  render() {
    const { orders, handleUpdate, handleDelete } = this.props;
    const optionVals = [{ value: "Created" }, { value: "Processing" }, { value: "Shipped" }];

    return (
      <div className="p-3 mt-3">
        <h2>Orders</h2>
        <div className="alert alert-warning mt-3">This page is currently under construction.</div>

        <table className="table table-hover mt-3">
          <thead className="thead-inverse">
            <tr>
              <th>ID</th>
              <th>Order Date</th>         
              <th>Total</th>
              <th>Address</th>
              <th>Status</th>
              <th></th>
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
                  <td>{ order.total }</td>
                  <td>{ order.address }</td>
                  <td>
                    <select defaultValue={ order.status ? order.status : "" } className="form-control" onChange={ this.handleChange }>
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
                    <button className="btn btn-sm btn-info" name="update"
                      onClick={ () => handleUpdate(order.id, this.state) }>Update
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-danger" name="delete"
                      onClick={ (evt) => handleDelete(order.id, evt) }>Delete
                    </button>
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
    handleDelete: (orderId, event) => {
      event.preventDefault();
      dispatch(deleteOrder(orderId))
    }, 
    handleUpdate: (orderId, orderUpdate) => {
      console.log("updating order:", orderId, orderUpdate)
      dispatch(updateOrder(orderId, orderUpdate))
    },
    getOrders: (orders) => {
      dispatch(fetchOrders(orders))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderList)


