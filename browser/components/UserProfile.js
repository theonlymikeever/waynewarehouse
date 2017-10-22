import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../stores/orders';
import CollapseOrderlist from './CollapseOrderlist';

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
                        {userOrders && userOrders.length ?
                            <CollapseOrderlist userOrders={userOrders} /> : null}
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

