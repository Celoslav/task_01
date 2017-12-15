import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth/Auth';
import './App.css';
import Login from './components/Login';
import Homepage from './components/Homepage';
import PrivateRoute from './components/PrivateRoute';


const App = () => (
	<div>
		<Route exact path={'/login'} render={() => {
			if (Auth.checkIfLoggedIn()) {
				return <Redirect to="/homepage" />
			} else {
				return <Route path='/login' component={Login} />
			}
		}} />
		<PrivateRoute path='/homepage' component={Homepage} />
		<Route exact path="/" render={() => (
			<Redirect to="/login" />
		)} />

	</div>
);

export default App;
