import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../stores/orders';
import { updateUser } from '../stores/user';
import CollapseOrderList from './CollapseOrderList';
import UploadPic from './UploadPic';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            data_uri: '',
            photo: ''
        }

        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.getOrders();
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
        const { user, orders } = this.props;
        let userOrders = [];
        if (orders.length) {
            userOrders = orders.filter(order => order.userId == user.id);
        }

        return (

            <div>
                <br />
                <div className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>{user.name}</h2>
                        </div>
                        <div className="card-body">
                            <div className='row'>
                                <div className='col-3'>
                                    <img className='thumbnail' src={this.state.photo ? this.state.photo : user.photo} />
                                </div>
                                <div className='col-9'>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Email: {user.email}</li>
                                        <li className='list-group-item'>
                                            Address:
                                            <select className='form-control'>
                                                {
                                                    user.addresses && user.addresses.length && user.addresses.map(address => {
                                                        return (
                                                            <option key={address.id}>{address.address}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='card-body'>
                                <UploadPic />
                            </div>
                        </div>
                        {userOrders && userOrders.length ?
                            <CollapseOrderList userOrders={userOrders} /> : null}
                    </div>
                </div>
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
        },
        updateUser: (user) => {
            dispatch(updateUser(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

