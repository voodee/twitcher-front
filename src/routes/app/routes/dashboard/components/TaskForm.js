import React, { Component } from 'react'
import { createSelector } from 'reselect'
import Formsy from 'formsy-react'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import { Input } from 'formsy-react-components'
import { FormsyText, FormsySelect } from 'formsy-material-ui/lib'
import LinearProgress from 'material-ui/LinearProgress'
import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'

class TaskForm extends Component {


	errorMessages = {
		wordsError          : "Please only use letters",
		numericError        : "Только цифры",
		urlError            : "Please provide a valid URL",
		alphanumericError   : "Значение не валидно"
	}


	validSubmitForm = data => {
		this.props.updateTask(data)
	}


	render() {

		const { task } = this.props;
		const { wordsError, numericError, urlError, alphanumericError } = this.errorMessages;

		return task ?
			<div className="box box-default">
				<div className="box-body">
					<Formsy.Form
						onValidSubmit={this.validSubmitForm}
						ref={ form => this.form = form }
					>
						<Input
							name="id"
							type="hidden"
							value={ task.get('id') }
						/>

						<div className="row di-fields">
							<div className="col-xl-2 color-info di-fields__icon">
								<i className="material-icons">videocam</i>
							</div>
							<div className="col-xl-10">
								<FormsyText
									name="channel"
									validations="isAlphanumeric"
									validationError={alphanumericError}
									required
									floatingLabelText="Канал"
									value={ `${task.get('channel')}` }
									fullWidth
								/>
							</div>
						</div>
						<div className="row di-fields">
							<div className="col-xl-2 color-info di-fields__icon">
								<i className="material-icons">account_circle</i>
							</div>
							<div className="col-xl-10">
								<FormsyText
									name="viewers"
									validations="isNumeric"
									validationError={numericError}
									type="number"
									required
									floatingLabelText="Зрители"
									value={ `${task.get('viewers')}` }
									fullWidth
								/>
							</div>
						</div>
						<div className="row di-fields">
							<div className="col-xl-2 color-info di-fields__icon">
								<i className="material-icons">question_answer</i>
							</div>
							<div className="col-xl-4">
								<FormsyText
									name="chatters"
									validations="isNumeric"
									validationError={numericError}
									type="number"
									required
									floatingLabelText="Людей в чате"
									value={ `${task.get('chatters')}` }
									fullWidth
								/>
							</div>
							<div className="col-xl-6">
								<FormsySelect
									name="chat_mode"
									required
									floatingLabelText="Тип чата"
									value={ `${task.get('chat_mode')}` }
									fullWidth
								>
									<MenuItem value='0' primaryText="Независимый" />
									<MenuItem value='1' primaryText="Интерактивный" />
								</FormsySelect>
							</div>
						</div>
						<div className="row di-fields">
							<div className="col-xl-2 color-info di-fields__icon">
								<i className="material-icons">grade</i>
							</div>
							<div className="col-xl-10">
								<FormsyText
									name="followers"
									validations="isNumeric"
									validationError={numericError}
									type="number"
									required
									floatingLabelText="followers"
									value={ `${task.get('followers')}` }
									fullWidth
								/>
							</div>
						</div>
						<div className="divider" />
						<div className="text-right">
							<RaisedButton
								type="submit"
								label="Обновить"
								primary
								disabled={ task.get('isFetching') }
							/>
						</div>

					</Formsy.Form>
				</div>
			</div>
			:
			<LinearProgress mode="indeterminate"/>

	}
}

module.exports = TaskForm;
