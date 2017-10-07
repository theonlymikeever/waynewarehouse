import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Home extends Component {
	render(){
		return(
			<div className='container'>
				<h1>WayneWarehouse!</h1>
				<h1><Link to='/signup'>Signup!</Link></h1>
			</div>
		)
	}
}