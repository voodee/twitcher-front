import React, { Component } from 'react'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim'

import { signUp } from 'reducers/user'

import SignUp from '../components/SignUp'


class SignUpContainer extends Component {

	render() {
		const { settings, signUp, router } = this.props;

		return (
			<div className="page-login">
				<div className="main-body">
					<QueueAnim type="bottom" className="ui-animate">
						<SignUp
							settings={settings}
							router={router}
							signUp={signUp}
						/>
					</QueueAnim>
				</div>
			</div>
		);
	}

}


const mapStateToProps = state => ({
	settings: state.settings
});


const mapDispatchToProps = dispatch => ({
	signUp: (email, password, password_confirmation, invalidateForm, router) => dispatch( signUp(email, password, password_confirmation, invalidateForm, router) )
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)
