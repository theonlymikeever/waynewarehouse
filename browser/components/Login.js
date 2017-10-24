import React from 'react';
import { connect } from 'react-redux';
import { loginActionCreator, googleLoginActionCreator } from '../stores/user';

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
  }

  handleChange(evt) {
    const obj = {};
    obj[evt.target.name] = evt.target.value
    this.setState(obj)
  }

  componentDidMount() {
    this.renderButton();
  }

  renderButton() {
    const { history, googleLogin, cart } = this.props;
    function onSuccess(googleUser) {
      var profile = googleUser.getBasicProfile();
      const googleId = profile.getId();
      const name = profile.getName();
      const email = profile.getEmail();
      const credentials = { email, googleId, name }
      googleLogin(credentials, history, cart)
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
    const { user } = this.props;
    const { email, password } = this.state;
    const { handleChange } = this;
    console.log('sadfsad',user);
    return (
      <div className="row">
        <div className="col-sm-6">
        {user.error ? <div className='alert alert-danger'>{user.error}</div> : null}
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
            <div id="my-signin2"></div>
          </div>
        </div>
      </div>
    );
  }



  onLoginSubmit(event) {
    const { login, history, cart } = this.props;
    event.preventDefault();
    //pass in the history object you get from router
    login(this.state, history, cart);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ cart, user }) => ({ cart, user });
const mapDispatch = (dispatch) => {
  return {
    login: (credentials, history, cart) => { dispatch(loginActionCreator(credentials, history, cart)) },
    googleLogin: (credentials, history, cart) => { dispatch(googleLoginActionCreator(credentials, history, cart)) }
  }
};

// export default Login;
export default connect(mapState, mapDispatch)(Login);
