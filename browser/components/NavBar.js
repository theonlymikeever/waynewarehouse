import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

export default class NavBar extends Component{
	constructor(){
		super();
	}

	render(){
		const user = 'test';
		return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target=".navbar-collapse">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/"><img src="/images/logo.png" /></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/categories" activeClassName="active">Categories</NavLink>
              </li>
              <li>
                <NavLink to="/products" activeClassName="active">Products</NavLink>
              </li>
            </ul>
            { this.renderLogout(user) }
            { this.renderLoginSignup(user) }

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
      <ul className="nav navbar-nav navbar-right">
        <li>
         <NavLink to="/signup" activeClassName="active">signup</NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">login</NavLink>
        </li>
      </ul>
    );
  }

  renderLogout(user) {
    if (!user.id){
      return null;
    }
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <button
          className="navbar-btn btn btn-default"
          onClick={this.props.logout}>
          logout
        </button>
        </li>
      </ul>
    );
  }
}		


