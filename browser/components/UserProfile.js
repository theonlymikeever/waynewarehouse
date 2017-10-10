import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component {

    render() {
        const { user } = this.props;
        // console.log(this.props);
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
                        user.orders && user.orders.map(order => {
                            return <li key={order.id}>Order #: {order.id}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

export default connect(mapStateToProps, null)(UserProfile);

