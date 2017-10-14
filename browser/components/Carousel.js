import React from 'react';

export default function Carousel(){
  return (
<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
    <li data-target="#carouselExampleIndicators" data-slide-to="1" />
    <li data-target="#carouselExampleIndicators" data-slide-to="2" />
  </ol>
  <div className="carousel-inner" role="listbox">
    <div className="carousel-item active">
      <a href="/#/products/5"><img className="d-block img-fluid" src="../images/Header-BanesMask.jpg" alt="First slide" /></a>
    </div>
    <div className="carousel-item">
      <a href="/#/products/4"><img className="d-block img-fluid" src="../images/Header-BagEnd.jpg" alt="Second slide" /></a>
    </div>
    <div className="carousel-item">
      <a href="/#/products/3"><img className="d-block img-fluid" src="../images/Header-JacksCompass.jpg" alt="Third slide" /></a>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
  )
}
