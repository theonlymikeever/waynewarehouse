import React, { Component } from 'react';
import NavBar from './NavBar';
import {Link} from 'react-router-dom';
import Carousel from './Carousel';
import Featured from './Featured';
import Footer from './Footer';

export default class Home extends Component {
	render(){
		return(
			<div>
        <Carousel />
        <div className='container'>
          <Featured />
				</div>
        <hr />
        <Footer />
			</div>
		)
	}
}
