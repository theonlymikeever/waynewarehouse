import React from 'react';
import { connect } from 'react-redux';


const UserProfile = (props) => {
    console.log(props)
    return (
        <h1>Users</h1>
    )
}

const mapStateToProps = ({ users }) => {
    return {
        users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

