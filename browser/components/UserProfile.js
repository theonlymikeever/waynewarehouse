import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../stores/orders';

class UserProfile extends Component {

    componentDidMount() {
        //not the most efficient way, but the orders.isCart kept returning true.  Not sure why, so i refetched the data.
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
                <h1>Name: {user.name} <span>
                    <img src={user.photo} />
                </span></h1>
                <h3>Email: {user.email}</h3>
                <h3>Address:
                    <select className = 'form-control'>
                        {
                            user.addresses && user.addresses.length && user.addresses.map(address => {
                                return (
                                    <option key={address.id}>{address.address}</option>
                                );
                            })
                        }
                    </select>
                </h3>
                <h3>Orders:</h3>
                <ul>
                    {
                        userOrders.length && userOrders.map(order => {
                            return (
                                order.isCart === true ? null : <Link key={order.id} to={`/orders/${order.id}/confirmation`}><li key={order.id}>Order #: {order.id}</li></Link>
                            )
                        })
                    }
                </ul>
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

