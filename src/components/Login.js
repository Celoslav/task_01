import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';

class Login extends React.Component {
	state = {
		loginInProgress: false,
		shouldRedirect: false,
		user: {
			email: '',
			password: ''
		},
		users: [],
		errors: {
			email: '',
			password: ''
		}
	};

	performLogin = () => {
		this.setState({ loginInProgress: true });
		Auth.login(this.state.user.email === 'user@mail.com' && this.state.user.password === 'pass321')
			.then(() => (
				setTimeout(() => this.setState({ shouldRedirect: true }), 1000)
			))
			.then(() => {
				const users = this.state.users;
				const user = this.state.user;
				Auth.isLoggedIn = true;
				this.setState({
					users: users.concat(user)
				});
				const state = this.state;
				state.isLoggedIn = Auth.isLoggedIn;
				localStorage.setItem('state', JSON.stringify(state));
			})
			.catch(error => {
				alert(error);
				this.setState({
					loginInProgress: false
				})
			});
	};
	redirectPath = () => {
		const locationState = this.props.location.state;
		const pathname = (
			locationState && locationState.from && locationState.from.pathname
		);
		return pathname || '/homepage'
	};
	handleInputChange = (e) => {
		const user = this.state.user;
		const value = e.target.value;
		const name = e.target.name;

		this.validate(name, value);

		user[name] = value;
		this.setState({
			user
		});
	}
	validate = (name, value) => {
		const errors = this.state.errors;
		if (name === 'password') {
			const err = ((value.length > 0) && (value.length < 6)) ? '1px solid #f6a936' : '1px solid #00b9f6';
			errors[name] = err;
			this.setState({
				errors
			})
		} else if (name === 'email') {
			const emailRegX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			const checkEmail = emailRegX.test(value);
			const err = (checkEmail || (value.length < 1)) ? '1px solid #00b9f6' : '1px solid #f6a936';
			errors[name] = err;
			this.setState({
				errors
			})
		}
	}
	render() {
		if (this.state.shouldRedirect) {
			return (
				<Redirect to={this.redirectPath()} />
			);
		} else {
			return (
				<div>
					{
						this.state.loginInProgress ? (
							<div className="signal"></div>
						) : (
								<div
									className='formDiv'
								>
									<form
										onSubmit={this.performLogin}

									>
										<input
											className='emailInput'
											style={{ borderBottom: this.state.errors.email || '1px solid #00b9f6' }}
											type='text'
											placeholder='email address'
											onChange={this.handleInputChange}
											name='email'
										/>

										<input
											className='passwordInput'
											style={{ borderBottom: this.state.errors.password || '1px solid #00b9f6' }}
											type='password'
											placeholder='password'
											onChange={this.handleInputChange}
											name='password'
										/>

										<button
											className='btn btn-login'
											type='submit'
										>
											Login
										</button>
									</form>
								</div>
							)
					}
				</div>
			)
		}
	}
}

export default Login;