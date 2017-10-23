import React from 'react';
import { connect } from 'react-redux';
import { addCategoryOnServer, fetchCategories } from '../../stores/categories';
import AdminCategoryList from './AdminCategoryList';

class AdminCategoryForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event){
    this.setState({ name: event.target.value })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleAdd(this.state);  
  }

  handleClick(){
    this.refs.name.value = "";
  }

  componentDidMount(){
    this.props.getCategories(this.props.categories);
  }

  render(){
    const { name, alert, alertStyle } = this.state;
    const { categories } = this.props;

    return (  
      <div>
        <div className="card p-3 mt-3">
          <h2>Add a new category</h2>
          <form onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <input name="name" type="text" ref="name" 
              value={ name } onChange={ this.handleChange }
              className="form-control" placeholder="Category Name" />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary"
                onClick={ this.handleClick }>Add new category
              </button>
            </div>
          </form>
        </div>
        <AdminCategoryList categories={ categories } />       
      </div>   
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAdd: (category, event) => {
      dispatch(addCategoryOnServer(category));
    }, 
    getCategories: () => {
      dispatch(fetchCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryForm);

