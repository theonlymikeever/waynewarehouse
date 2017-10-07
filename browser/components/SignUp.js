import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            photo: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
        console.log(this.state);
    }

    render() {
        const { handleChange } = this;
        const { name, email, password, address,photo } = this.state;
        return (
            <div className = 'container'>
                <h1>Sign up!</h1>
                <form>
                    <label htmlFor='name'>Name</label>
                    <input className = 'form-control' type='text' name='name' onChange={handleChange} value={name} />
                    <label htmlFor='email'>Email</label>
                    <input className = 'form-control' type='text' name='email' onChange={handleChange} value={email} />
                    <label htmlFor='password'>Password</label>
                    <input className = 'form-control' type='text' name='password' onChange={handleChange} value={password} />
                    <label htmlFor='address'>Address</label>
                    <input className = 'form-control' type='text' name='address' onChange={handleChange} value={address} />
                    <label htmlFor='photo'>Upload Photo</label>
                    <input className = 'form-control' type='text' name='photo' onChange={handleChange} value={photo} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {

    };
}


const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);