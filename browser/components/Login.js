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
  }

  handleChange(evt){
    const obj = {};
    obj[evt.target.name] = evt.target.value
    this.setState(obj)
  }

  render() {
    const message  =  'Login';
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
            <p>
              <a
                target="_self"
                href="/auth/google"
                className="btn">

                <span>{message} with Google</span>
              </a>
            </p>
          </div>
         </div> 
      </div>
    );
  }

  onLoginSubmit(event) {
    const { login } = this.props;
    event.preventDefault();
    login(this.state);
    this.setState({
      email: '', 
      password: ''
    });
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });
const mapDispatch = (dispatch) => {
  return {
    login: (credentials) => {dispatch(loginActionCreator(credentials))}
  }
};

// export default Login;
export default connect(mapState, mapDispatch)(Login);
