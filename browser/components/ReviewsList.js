import React from 'react';

function ReviewList(props) {
  const {reviews} = props;

  return (
  <div>
  {
    reviews && reviews.map(review => {
      return (
         <div key={review.id} className="card bg-light mb-3" >
          <div className="card-header"><span className="mr-2">{ review.user.name }</span>
          <ul className="d-inline-block mb-1">
            {
              Array.apply(0, Array(review.stars)).map((x, i) => {
                return (<li key={i} className="pl-1 d-inline-block"><img src="http://www.pngall.com/wp-content/uploads/2016/03/Batman-Logo-PNG.png"  width="30" /></li>)
              })
            }
            {
              (review.stars !== 5) && Array.apply(0, Array(5 - review.stars)).map((x, i) => {
                return (<li key={i} className="pl-1 d-inline-block"><img src="http://www.pngall.com/wp-content/uploads/2016/03/Batman-Logo-PNG.png" className="pl-1 d-inline-block grayscale" width="30" /></li>)
              })
            }
          </ul>
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
