import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../stores/user';
import { withRouter } from 'react-router-dom';


class UserProfile extends Component {

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.props.fetchUser(userId);
    }

    // componentWillReceiveProps(nextProps) {
    //     const userId = this.props.match.params.userId;
    //     const nextUserId = nextProps.match.params.userId;
    //     console.log(nextUserId);
    //     if (userId !== nextUserId)  this.props.fetchUser(userId);
    // }


    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <h1>{user.name}</h1>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));

