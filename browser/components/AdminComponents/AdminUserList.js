import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, deleteUserOnServer, updateUserOnServer } from '../../stores/users';

class AdminUserList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAdmin: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({ isAdmin: event.target.value })
  }

  componentDidMount(){
    this.props.getUsers(this.props.users);
  }

  render(){
    const { users, handleDelete, handleUpdate } = this.props;
    const optionVals = [{ isAdmin: true }, { isAdmin: false }];

    return (
      <div className="p-3 mt-3">
        <h2>Our users</h2>

        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin?</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {
              users && users.map(user => {
                return (
                  <tr key={ user.id }>
                    <td>{ user.name }</td>
                    <td>{ user.email }</td>
                    <td>
                      <select defaultValue={ String(user.isAdmin) } name="user" className="form-control" onChange={ this.handleChange }>
                        {
                          optionVals.map(option => {
                            return (
                              <option key={ option.isAdmin }>{ String(option.isAdmin) }</option>
                            )
                          })
                        }
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-info" name="update"
                        onClick={ () => handleUpdate(user.id, this.state) }>Update
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger" name="delete"
                        onClick={ (evt) => handleDelete(user.id, evt) }>Delete
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (userId, evt) => {
      evt.preventDefault();
      dispatch(deleteUserOnServer(userId))
    },
    handleUpdate: (userId, userUpdate) => {
      dispatch(updateUserOnServer(userId, userUpdate))
    },
    getUsers: () => {
      dispatch(fetchUsers());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserList);



