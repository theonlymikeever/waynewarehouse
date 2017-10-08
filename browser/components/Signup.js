import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postUser } from '../stores/user';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            address: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    handleSubmit(ev) {
       ev.preventDefault();
       console.log(this.state);
       this.props.postUser(this.state, this.props.history);
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { name, email, password, address } = this.state;
        return (
            <div className='container'>
                <h1>Sign up!</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input className='form-control' type='text' name='name' onChange={handleChange} value={name} />
                    <label htmlFor='email'>Email</label>
                    <input className='form-control' type='text' name='email' onChange={handleChange} value={email} />
                    <label htmlFor='password'>Password</label>
                    <input className='form-control' type='text' name='password' onChange={handleChange} value={password} />
                    <label htmlFor='address'>Address</label>
                    <input className='form-control' type='upload' name='address' onChange={handleChange} value={address} />
                    <label htmlFor='photo'>Upload Photo</label>
                    <input className='form-control' type='text' name='photo' />
                    <button type = 'submit' className='btn btn-default'>Sign Up</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        postUser: (user, history) =>{
            dispatch(postUser(user, history));
        }
    };
}

export default connect(null, mapDispatchToProps)(SignUp);