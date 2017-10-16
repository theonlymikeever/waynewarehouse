import React from 'react';
import { connect } from 'react-redux';
import { loginActionCreator } from '../stores/user';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.renderButton = this.renderButton.bind(this);
    // this.onSignIn =  this.onSignIn.bind(this);
  }

  handleChange(evt) {
    const obj = {};
    obj[evt.target.name] = evt.target.value
    this.setState(obj)
  }

    onSignIn(googleUser) {
    console.log('here')
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  componentDidMount() {
    this.renderButton();
  }

  renderButton() {
    console.log('Button rendered?')
      function onSuccess(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); 
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      }
      function onFailure(error) {
        console.log(error);
      }
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    }

  render() {
    const message = 'Login';
    const { email, password } = this.state;
    const { handleChange } = this;
    return (
      <div className="row">
        <div className="col-sm-6">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                onChange={handleChange}
                value={email}
                name="email"
                type="email"
                className="form-control"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input value={password}
                onChange={handleChange}
                name="password"
                type="password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">{message}</button>
          </form>
        </div>
        <div className="col-sm-1">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className='col-sm-5'>
          <div className="buffer oauth">
            
              <a
                target="_self"
                href="/login/google"
                className="btn">


              </a>
               <div id="my-signin2"></div>

            
          </div>
        </div>
      </div>
    );
  }



  onLoginSubmit(event) {
    const { login } = this.props;
    console.log(this.props.history);
    event.preventDefault();
    //pass in the history object you get from router
    login(this.state, this.props.history);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });
const mapDispatch = (dispatch) => {
  return {
    login: (credentials, history) => { dispatch(loginActionCreator(credentials, history)) }
  }
};

// export default Login;
export default connect(mapState, mapDispatch)(Login);
