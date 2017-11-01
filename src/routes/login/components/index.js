import React from 'react'
import APPCONFIG from 'constants/Config'
import { FlatButton, TextField } from 'material-ui'
import axios from 'axios'
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
	FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib';

export default class Login extends React.Component {

	constructor() {
		super();

		this.state = {
			brand: APPCONFIG.brand
		};
	}

	componentDidMount() {
		const {settings} = this.props;




		// axios.get(
		// 	`${settings.api.host}proxies.json`,
		// 	{
		// 		headers: {
		// 			"X-USER-EMAIL": 'eedoov@gmail.com',
		// 			"X-USER-TOKEN": 'BqtUL6mP2vWqZXMYyR4W'
		// 		}
		// 	})
		// 	.then(function (response) {
		// 		console.log(response);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});
	}


	submitForm = (user, resetForm, invalidateForm) => {
		const {settings, setToken, router} = this.props;

		axios.post(
			`${settings.api.host}sign_in.json`,
			{
				user
			})
			.then( response => {
				setToken(user.email, response.data.authentication_token);
				router.push('/app/dashboard')
			})
			.catch( e => {
				console.log(e)
				invalidateForm({
					email: 'Неправильная почта или пароль'
				})
			});
	}


	change = () => {
		this.form.updateInputsWithError({
			email: false
		})
	}


	render() {

		return (
			<div className="body-inner">
				<div className="card bg-white">
					<Formsy.Form
						onValidSubmit={this.submitForm}
						onChange={this.change}
					    ref={form => this.form = form}
					>
						<div className="card-content">
							<section className="logo text-center">
								<h1><a href="#/">{this.state.brand}</a></h1>
							</section>

								<fieldset>
									<div className="form-group">
										<FormsyText
											name="email"
											floatingLabelText="Почта"
											required
											fullWidth
										/>
									</div>
									<div className="form-group">
										<FormsyText
											name="password"
											floatingLabelText="Пароль"
											type="password"
											required
											fullWidth
										/>
									</div>
								</fieldset>
						</div>
						<div className="card-action no-border text-right">
							<FlatButton type="submit" label="Войти" primary />
						</div>
					</Formsy.Form>
				</div>

				<div className="additional-info">
					<a href="#/sign-up">Зарегистрироваться</a>
					{/*<span className="divider-h"/>*/}
					{/*<a href="#/forgot-password">Forgot your password?</a>*/}
				</div>

			</div>
		);
	}
}
