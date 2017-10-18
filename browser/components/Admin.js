import React from 'react';
import { connect } from 'react-redux';
import { addProductOnServer } from '../stores/products';

class Admin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "", 
      weight: "",
      image: "http://via.placeholder.com/250x250"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleChange(event) {
    const key = event.target.name, val = event.target.value;
    key === "name" ? this.setState({ name: val }) :
    key === "description" ? this.setState({ description: val }) :
    key === "price" ? this.setState({ price: val }) : 
    this.setState({ weight: val }) 
  }
 
  handleSubmit(event, dispatch) {
    event.preventDefault();
    this.props.handleAdd(this.state);
    console.log("new product added:", this.state)
  }

  handleClick(){
    this.refs.name.value = "";
    this.refs.desc.value = "";
    this.refs.price.value = "";
    this.refs.weight.value = "";
  }

  onDrop(image) {
    this.setState({ image });
  }


  render(){
    const { name, description, price, weight, image } = this.state;

    return (
      <div className="container">
        <div className="card p-3 mt-3">
          <h2>Add a new product</h2>

          <form onSubmit={ this.handleSubmit }>
            <div className="row">
            
              <div className="col-md-4">
                <img src={ image }></img>              
              </div>

              <div className="col-md-8">
                <div className="form-group">
                  <input name="name" type="text" ref="name"
                    value={ name } onChange={ this.handleChange }
                    className="form-control" placeholder="Name"/>
                </div>
                <div className="form-group">
                  <textarea name="description" type="text" ref="desc"
                    value={ description } onChange={ this.handleChange }
                    className="form-control" placeholder="Description"/>
                </div>
                <div className="form-group">
                  <input name="price" type="text" ref="price"
                    value={ price }  onChange={ this.handleChange }
                    className="form-control" placeholder="Price"/>
                </div>
                <div className="form-group">
                  <input name="weight" type="text" ref="weight"
                    value={ weight } onChange={ this.handleChange }
                    className="form-control" placeholder="Weight"/>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary" 
                    onClick={ this.handleClick }>Add new product
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }  
}

const mapDispatchToProps = (dispatch) => {  
  return {
    handleAdd: (product, event) => {
      dispatch(addProductOnServer(product));
    }
  }
}

export default connect(null, mapDispatchToProps)(Admin);



