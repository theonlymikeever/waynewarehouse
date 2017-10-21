import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReviewOnServer } from '../stores/reviews'

class ReviewForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      stars: null,
      title: '',
      content: '',
      userId: props.user.id,
      productId: props.productId
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
    this.props.handleAdd(this.state)
    this.setState({
      stars: null,
      title: '',
      content: '',
      userId: this.props.user.id,
      productId: this.props.productId
    })
  }

  render(){
    const { handleChange, handleSubmit } = this;
    const { title, content, stars } = this.state;

  return (
      <form className="form-group mt-3" onSubmit={ (evt) => handleSubmit(evt) }>
        <div className="form-group">
          <label className="col-sm-2 col-form-label pl-0">Number of Bats:</label>
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
              <input onChange={ handleChange } className="form-check-input" type="radio" name="stars" value={5} /> 5
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
      dispach(addReviewOnServer(review)) //add to server
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
