import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import { logoutActionCreator } from '../stores/user';
import history from "../history";
import UserProfile from './UserProfile';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout = this.renderLogout.bind(this);
  }

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/"><span className="d-inline-block">H<img src="/images/batman_logo_2574.gif" className="d-inline-block" height="12" width="16" />me</span></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link" activeClassName="active">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link" activeClassName="active">Products</NavLink>
              </li>
              <li>
                <NavLink to="/orders">Orders</NavLink>
              </li>
            </ul>
            {this.renderLogout(user)}
            {this.renderLoginSignup(user)}
          </div>
      </nav>
    )
  }

  renderLoginSignup(user) {
    if (user.id) {
      return null;
    }
    return (
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link" activeClassName="active">Signup</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
        </li>
      </ul>
    );
  }

  renderLogout(user) {
    const textStyle = { color: 'blue' }
    if (!user.id) {
      return null;
    }
    return (
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <NavLink to="/profile" className="nav-link" activeClassName="active">Profile</NavLink>
          </li>
          <li className="nav-item mr-sm-2">
            <button
              className="btn btn-outline-dark my-2 my-sm-0"
              onClick={this.props.logout}>
              Logout
            </button>
          </li>
          <small className="p-2">Welcome:&nbsp;
            <span style={textStyle}>{user.name}&nbsp;</span>
          </small>
        </ul>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({ user }) => {
  return {
    user
  }
};

const mapDispatch = (dispatch, ownProps) => ({
  logout: () => {
    //pass in the history object you get from ownProps
    dispatch(logoutActionCreator(ownProps.history));
  }
});

export default withRouter(connect(mapProps, mapDispatch)(NavBar));
