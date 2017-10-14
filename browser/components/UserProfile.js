import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class UserProfile extends Component {

    render() {
        const { user, orders } = this.props;
        let userOrders = [];
        if (orders.length) {
            userOrders = orders.filter(order => order.userId == user.id);
        }
        console.log(userOrders)
        return (
            <div>
                <h1>Name: {user.name} <span>
                    <img src={user.photo} />
                </span></h1>
                <h3>Email: {user.email}</h3>
                <h3>Address: {user.address}</h3>
                <h3>Orders:</h3>
                <ul>
                    {
                        userOrders.length && userOrders.map(order => {
                            return (
                                <Link to={`/orders/${order.id}/confirmation`}><li key={order.id}>Order #: {order.id}</li></Link>
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

export default connect(mapStateToProps, null)(UserProfile);

