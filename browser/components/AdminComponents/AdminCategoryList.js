import React from 'react';
import { connect } from 'react-redux';
import { deleteCategoryOnServer } from '../../stores/categories';


const AdminCategoryList = (props) => {
  const { categories, handleDelete } = props;

  return(
    <div>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Category List</th>
            <th></th>
          </tr>
        </thead>
        <tbody >
          {
            categories && categories.map(category => {
              return (
                <tr key={ category.id }>
                  <td>{ category.name }</td>
                  <td>
                    <button className="btn btn-sm btn-danger" name="delete"
                      onSubmit={ handleDelete }>Delete
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

const mapStateToProps = ({ categories }) => {
  console.log("categories", categories) // []???
  return {
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (evt) => {
      evt.preventDefault();
      dispatch(deleteCategoryOnServer(evt.target.delete.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryList);