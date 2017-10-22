import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../stores/orders';

class UserProfile extends Component {

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        const { user, orders } = this.props;
        let userOrders = [];
        if (orders.length) {
            userOrders = orders.filter(order => order.userId == user.id);
        }

        return (
            <div>
                <br />
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>{user.name}</h2>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-3'>
                                    <img src={user.photo} />
                                </div>
                                <div className='col-9'>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Email: {user.email}</li>
                                        <li className='list-group-item'>
                                            Address:
                                            <select className='form-control'>
                                                {
                                                    user.addresses && user.addresses.length && user.addresses.map(address => {
                                                        return (
                                                            <option key={address.id}>{address.address}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {userOrders.length ?
                            <div className="card-footer">
                                <ul>
                                    {
                                        userOrders.map(order => {
                                            return (
                                                order.isCart === true ? null :
                                                    <div id="accordion" role="tablist" aria-multiselectable="true">
                                                        <div className="card">
                                                            <div className="card-header" role="tab" id={`heading${order.id}`}>
                                                                <h5 className="mb-0">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${order.id}`} aria-expanded="true" aria-controls={`#collapse${order.id}`}>
                                                                        Order #: {order.id}
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                            <div id={`collapse${order.id}`} className="collapse" role="tabpanel" aria-labelledby={`#heading${order.id}`}>
                                                                <div className="card-block">
                                                                    <table className="table table-hover">
                                                                        <thead>

                                                                            <tr>
                                                                                <th>Item</th>
                                                                                <th>Quantity</th>
                                                                                <th>Price</th>
                                                                                <th></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                order.lineItems.length && order.lineItems.map(item => {
                                                                                    return (
                                                                                        <tr key={item.id}>
                                                                                            <td><Link to={`/products/${item.product.id}`}>{item.product.name}</Link></td>
                                                                                            <td>{item.quantity}</td>
                                                                                            <td>{`$${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</td>
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                            }
                                                                            <tr>
                                                                                <td>Address: {order[0] && order[0].address}</td>
                                                                                <td>Expect shipping in 1 to 2 years</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <Link key={order.id} to={`/orders/${order.id}/confirmation`}>Confirmation </Link>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ user, orders }) => {
    return {
        user,
        orders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: () => {
            dispatch(fetchOrders());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

