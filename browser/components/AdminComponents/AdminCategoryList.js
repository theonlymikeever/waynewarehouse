import React from 'react';
import { connect } from 'react-redux';
import { deleteCategoryOnServer } from '../../stores/categories';


const AdminCategoryList = (props) => {
  const { categories } = props;

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
                      onClick={ (event) => props.handleDelete(category.id, event) }>Delete
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
  return {
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDelete: (categoryId, evt) => {
      evt.preventDefault();
      dispatch(deleteCategoryOnServer(categoryId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryList);