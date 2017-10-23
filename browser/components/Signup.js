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
            address: '',
            photo: '',
            required: false //check if button should be disabled
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    // handleSubmit(e) {
    //     e.preventDefault();
    //     var promise = new Promise((resolve) => {
    //         this.setState({ photo: this.state.data_uri })
    //         resolve(this.state);
    //     })
    //     promise.then(() => {
    //         this.props.updateUser({ id: this.props.user.id, photo: this.state.photo });
    //     })

    // }

    handleFile(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                photo: upload.target.result
            });
        };
        reader.readAsDataURL(file);

    }
    handleChange(ev) {
        const { name, email, password } = this.state;

        this.setState({
            [ev.target.name]: ev.target.value
        })

        if (name.length > 0 && password.length > 0 && email.length > 0) this.setState({ required: true });

    }

    handleSubmit(ev) {
        ev.preventDefault();
        console.log(this.state);
        this.props.postUser(this.state, this.props.history);
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const { name, email, password, address, required } = this.state;
        return (
            <div className='container'>
                <h1>Sign up!</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label className='text-danger' htmlFor='name'>Name</label>
                    <input className='form-control' type='text' name='name' onChange={handleChange} value={name} />
                    <label className='text-danger' htmlFor='email'>Email</label>
                    <input className='form-control' type='text' name='email' onChange={handleChange} value={email} />
                    <label className='text-danger' htmlFor='password'>Password</label>
                    <input className='form-control' type='text' name='password' onChange={handleChange} value={password} />
                    <label htmlFor='address'>Address</label>
                    <input className='form-control' type='upload' name='address' onChange={handleChange} value={address} />
                    Upload Photo
                    <br/>
                    <input name='photo' onChange={this.handleFile} type="file" />
                    <br />
                    <p className='text-danger'><small>Required entries in red</small></p>
                    <br />
                    <button type='submit' className='btn btn-default' disabled={required ? false : true}>Sign Up</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        postUser: (user, history) => {
            dispatch(postUser(user, history));
        }
    };
}

export default connect(null, mapDispatchToProps)(SignUp);