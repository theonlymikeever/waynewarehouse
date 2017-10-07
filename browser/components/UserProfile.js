import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../stores/user';
import { Link } from 'react-router-dom';


class UserProfile extends Component {

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.props.fetchUser(userId);
    }

    componentWillReceiveProps(nextProps) {
        const userId = this.props.match.params.userId;
        const nextUserId = nextProps.match.params.userId;
        if (userId !== nextUserId) this.props.fetchUser(nextUserId);
    }


    render() {
        const { user, users } = this.props;
        console.log(this.props);
        return (
            <div>
                <ul>
                    {
                        users && users.map(user => {
                            return (
                                <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>
                            )
                        })
                    }
                </ul>
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

const mapStateToProps = ({ users, user }) => {
    return {
        users, user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (userId) => {
            dispatch(fetchUser(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

