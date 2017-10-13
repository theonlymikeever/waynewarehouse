import React, { Component } from 'react';

import NavBar from './NavBar';

import {Link} from 'react-router-dom';


export default class Home extends Component {
	render(){
		return(
			<div>
				<div className='container'>
					<h1>The Wayne Warehouse</h1>
					<img src="../Images/TheWareHouse.png"></img>
				</div>
			</div>
		)
	}
}