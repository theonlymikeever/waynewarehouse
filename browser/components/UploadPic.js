import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../stores/user';


class UploadPic extends Component {
    constructor() {
        super();
        this.state = {
            data_uri: '',
            photo: ''
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        var promise = new Promise((resolve) => {
            this.setState({ photo: this.state.data_uri })
            resolve(this.state);
        })
        promise.then(() => {
            this.props.updateUser({ id: this.props.user.id, photo: this.state.photo });
        })

    }

    handleFile(e) {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                data_uri: upload.target.result
            });
        };
        reader.readAsDataURL(file);
    }

    render() {

        return (
            <div>
                <div className='card-body'>
                    <label>Upload an image</label>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <input onChange={this.handleFile} type="file" />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ user, orders }) => {
    return {
        user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => {
            dispatch(updateUser(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPic);

