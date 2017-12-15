import React from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../Auth/Auth';


const Homepage = withRouter(({ history }) => {
	return (
		<div
			className='welcomeDiv'
		>
			<h3 className='welcomeH3'>Welcome, {Auth.getUser()}</h3>
			<button
				type='button'
				className='btn btn-logout'
				onClick={() => { Auth.logout(); history.push('/login') }}
			>
				Log out
			  </button>
		</div>
	)

});

export default Homepage;