import React, {PureComponent} from 'react'
import APPCONFIG from 'constants/Config'
import QueueAnim from 'rc-queue-anim'
import { FlatButton, TextField } from 'material-ui'
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
	FormsySelect, FormsyText, FormsyTime, FormsyToggle, FormsyAutoComplete } from 'formsy-material-ui/lib'

class SignUp extends PureComponent {


	submitForm = ({email, password, password_confirmation}, resetForm, invalidateForm) => {
		this.props.signUp(email, password, password_confirmation, invalidateForm, this.props.router)
	}


	change = () => {
		this.form.updateInputsWithError({
			email: false,
			password: false,
			password_confirmation: false,
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
								<h1><a href="#/">{APPCONFIG.brand}</a></h1>
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
								<div className="form-group">
									<FormsyText
										name="password_confirmation"
										floatingLabelText="Ещё раз пароль"
										type="password"
										required
										fullWidth
									/>
								</div>
							</fieldset>
						</div>

						<div className="card-action no-border text-right">
							<FlatButton type="submit" label="Зарегистрироваться" primary />
						</div>
					</Formsy.Form>

				</div>

				<div className="additional-info">
					<a href="#" onClick={this.handlerToLogin}>Уже есть аккаунт?</a>
				</div>

			</div>
		);
	}
}

module.exports = SignUp;
