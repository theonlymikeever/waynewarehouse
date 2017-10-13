import React, { Component } from 'react';

import NavBar from './NavBar';

import {Link} from 'react-router-dom';


export default class Home extends Component {
	render(){
		return(
			<div className='home'>
				<div className='container'>
				<div>
					<h1 className='title display-1'><small>the</small> Wayne Warehouse</h1>
				</div>	
					<div>
						<img className='mainImage img-fluid' src="../Images/TheWareHouse.png"></img>
					</div>
					<div>
						<h1 className='title display-4 smallTitle'>...One of a kind artefacts</h1>
					</div>
				</div>
			</div>
		)
	}
}