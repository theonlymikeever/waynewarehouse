import React from 'react';
import { Link } from 'react-router-dom';

export default function CollapseOrderList(props) {

    const { userOrders } = props;
    return (
        <div>

            <div className="card-footer">
                <ul>
                    {
                        userOrders.map(order => {
                            return (
                                order.isCart === true ? null :
                                    <div key = {order.id} id="accordion" role="tablist" aria-multiselectable="true">
                                        <div className="card">
                                            <div className="card-header" role="tab" id={`heading${order.id}`}>
                                                <h5 className="mb-0">
                                                    <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${order.id}`} aria-expanded="true" aria-controls={`#collapse${order.id}`}>
                                                        Order #: {order.id}
                                                    </a>
                                                </h5>
                                            </div>
                                            <div id={`collapse${order.id}`} className="collapse" role="tabpanel" aria-labelledby={`#heading${order.id}`}>
                                                <div className="card-block">
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
                                                                order.lineItems.length && order.lineItems.map(item => {
                                                                    return (
                                                                        <tr key={item.id}>
                                                                            <td><Link to={`/products/${item.product.id}`}>{item.product.name}</Link></td>
                                                                            <td>{item.quantity}</td>
                                                                            <td>{`$${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                            <tr>
                                                                <td>Address: {order[0] && order[0].address}</td>
                                                                <td>Expect shipping in 1 to 2 years</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <Link key={order.id} to={`/orders/${order.id}/confirmation`}>Confirmation </Link>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

