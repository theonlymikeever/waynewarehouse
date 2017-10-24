import React, { Component } from 'react';

export default class EditUser extends Component {
    constructor() {
        super()
        this.state = {
            address: '',
            email: ''
        }
    }
    render() {
        const { user } = this.props;
        console.log(this.props);
        return (
            <div id="accordion" role="tablist" aria-multiselectable="true">
                <div >
                    
                    <h5 className="mb-0">
                        <a data-toggle="collapse" data-parent="#accordion" href={`#collapse`} aria-expanded="true" aria-controls={`#collapse`}>
                            Edit Information
                                </a>
                    </h5>
                </div>
                <br />
                <div id={`collapse`} className="collapse" role="tabpanel" aria-labelledby={`#heading`}>

                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        this.props.updateUser({ id: user.id, email: this.state.email });
                        this.setState({ email: '' })
                    }}>

                        <input type='text' value={this.state.email} onChange={(ev) => { this.setState({ email: ev.target.value }) }} />
                        <button className='btn btn-info btn-sm'>Change Email</button>
                    </form>

                    <form onSubmit={(ev) => {
                        ev.preventDefault();
                        this.props.updateUser({ id: user.id, address: this.state.address });
                        this.setState({ address: '' })
                    }}>
                        <input type='text' value={this.state.address} onChange={(ev) => { this.setState({ address: ev.target.value }) }} />
                        <button className='btn btn-info btn-sm'>Add new address</button>
                    </form>
                </div>

            </div>
        );
    }
}