import React, { Component } from 'react';
import { connect } from 'react-redux';
//need review store

class ReviewForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      stars: null,
      title: '',
      content: '',
      userId: props.user.id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    const target = evt.target;
    const value = target.type === 'radio' ? target.value * 1 : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state)
  }

  handleSubmit(evt){
    evt.preventDefault();
    console.log('submitted: ', this.state)
  }

  render(){
    const { handleChange, handleSubmit } = this;
    const { title, content } = this.state;

  return (
      <form className="form-group" onSubmit={ (evt) => handleSubmit(evt) }>
        <div className="form-group">
          <label className="col-sm-2 col-form-label ml-0">Number of Bats:</label>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input onChange={ handleChange } className="form-check-input" type="radio" name="stars" value={1} /> 1
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input onChange={ handleChange } className="form-check-input" type="radio" name="stars" value={2} /> 2
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input onChange={ handleChange } className="form-check-input" type="radio" name="stars" value={3} /> 3
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input onChange={ handleChange } className="form-check-input" type="radio" name="stars" value={4} /> 4
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input onChange={ handleChange } className="form-check-input" type="radio" name="stars" value={5} checked={true} /> 5
            </label>
          </div>
        </div>
        <input onChange={ handleChange } className="form-control mb-2" name="title" placeholder={ title === '' ? 'Title' : null } value={ title } />
        <textarea onChange={ handleChange } className="form-control mb-2" name="content" placeholder={ content === '' ? 'What do you think?' : null } value={ content } />
        <button className="mt-2 btn btn-primary">Add Review</button>
      </form>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

const mapDispatchToProps = (dispach) => {
  return {
    handleAdd: (review) => {
      dispach() //add to server
    }
  }
}

export default connect(mapStateToProps)(ReviewForm);
