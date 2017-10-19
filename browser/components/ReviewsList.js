import React from 'react';

function ReviewList(props) {
  const {reviews} = props;

  return (
  <div>
  {
    reviews && reviews.map(review => {
      console.log(review)
      return (
         <div className="card bg-light mb-3" >
          <div className="card-header">{ review.name }name
            {
              Array.apply(0, Array(review.stars)).map((x, i) => {
                return <img key={i} src="http://www.pngall.com/wp-content/uploads/2016/03/Batman-Logo-PNG.png" className="pl-1 d-inline-block" width="30" />
              })
            }
          </div>
          <div className="card-body">
            <h4 className="card-title">Light card title</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      )
    })
  }
  </div>
  )
}

export default ReviewList;
