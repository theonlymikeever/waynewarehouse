import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import { logoutActionCreator } from '../stores/user';
import history from "../history";

class NavBar extends Component{
	constructor(props){
		super(props);
    this.renderLoginSignup = this.renderLoginSignup.bind(this);
    this.renderLogout =  this.renderLogout.bind(this);
	}

	render(){
		const { user } = this.props;
		return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/"><span>H<img src="/images/batman_logo_2574.gif" height="12" width="16" />me</span></Link>
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
    const textStyle = { color: 'blue'}
    if (!user.id){
      return null;
    }
    return (
      <div>
        <ul className="nav navbar-nav" >
          <li>
            <button
              className="navbar-btn btn btn-default"
              onClick={this.props.logout}>
              Logout
            </button>
          </li>
   
        </ul>
        <h5 className='pull-right'>Welcome:&nbsp; 
          <span style={textStyle}>{user.name}&nbsp;</span>
        </h5>
      </div> 
    );
  }
}		

/* -----------------    CONTAINER     ------------------ */

const mapProps = ({user}) => {
  return {
    user
  }
};

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logoutActionCreator());

    // history.push('/');
  }
});

export default withRouter(connect(mapProps, mapDispatch)(NavBar));
