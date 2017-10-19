import React from 'react';

function ReviewList(props) {
  const {reviews} = props;

  return (
  <div>
  {
    reviews && reviews.map(review => {
      return (
         <div className="card bg-light mb-3" >
          <div className="card-header"><span className="mr-2">{ review.user.name }</span>
            {
              Array.apply(0, Array(review.stars)).map((x, i) => {
                return <img key={i} src="http://www.pngall.com/wp-content/uploads/2016/03/Batman-Logo-PNG.png" className="pl-1 d-inline-block" width="30" />
              })
            }
            {
              (review.stars !== 5) && Array.apply(0, Array(5-review.stars)).map((x, i) => {
                return <img key={i} src="http://www.pngall.com/wp-content/uploads/2016/03/Batman-Logo-PNG.png" className="pl-1 d-inline-block grayscale" width="30" />
              })
            }
          </div>
          <div className="card-body">
            <h4 className="card-title">{ review.title }</h4>
            <p className="card-text">{ review.content }</p>
          </div>
        </div>
      )
    })
  }
  </div>
  )
}

export default ReviewList;
