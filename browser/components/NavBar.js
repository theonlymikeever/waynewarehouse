import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import Login from './Login';

export default class NavBar extends Component{
	constructor(){
		super();
	}

	render(){
		const user = {};
		return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/"><span>H<img src="/images/batman_logo_2574.gif" height="12" width="16" />me</span></Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/categories" activeClassName="active">Categories</NavLink>
              </li>
              <li>
                <NavLink to="/products" activeClassName="active">Products</NavLink>
              </li>
              <li>
                <NavLink to="/orders">Orders</NavLink>
              </li>
            </ul>
              { this.renderLogout(user) }
              { this.renderLoginSignup(user) }
            
            <ul className="nav navbar-nav navgar-right">
              <li>
                <NavLink to="/cart">
                  <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                </NavLink>
              </li>
            </ul>
              
          </div>
        </div>
      </nav>
		)
	}

renderLoginSignup(user) {
    if (user.id){
      return null;
    }
    return (
      <ul className="nav navbar-nav">
        <li>
         <NavLink to="/signup" activeClassName="active">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">Login</NavLink>
        </li>
      </ul>
    );
  }

  renderLogout(user) {
    if (!user.id){
      return null;
    }
    return (
      <ul className="nav navbar-nav navbar-right" >
        <li>
        <button
          className="navbar-btn btn btn-default"
          onClick={this.props.logout}>
          Logout
        </button>
        </li>
      </ul>
    );
  }
}		


