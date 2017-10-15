import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../stores/orders';


class OrderCofirmation extends Component {

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        const {orders } = this.props;
        const orderId = this.props.match.params.orderId
        const order = orders.length > 0 ? orders.filter(order => order.id == orderId) : [];
        let lineItems = (order[0] && order[0].lineItems) ? order[0].lineItems : [];
        console.log(this.props);
        return (
            <div className="container">
                <div className="row mt-3">
                    <h1>Confirmation for Order #{orderId}</h1>
                    <div className="col-xs-12 col-md-8">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lineItems.length && lineItems.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td><Link to={`/products/${item.product.id}`}>{item.product.name}</Link></td>
                                                <td>{item.quantity}</td>
                                                <td>{item.product.price}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td>Expect shipping in 1 to 2 years</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ cart, user, orders }) => {
    return ({
        cart,
        user,
        orders
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrders: () => {
            dispatch(fetchOrders());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCofirmation);

