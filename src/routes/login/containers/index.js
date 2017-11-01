import React, { Component } from 'react'
import { connect } from 'react-redux'
import QueueAnim from 'rc-queue-anim'

import { setToken } from 'reducers/user'

import Login from '../components'


class Logincontainer extends Component {

	render() {
		const { settings, setToken, router } = this.props;

		return (
			<div className="page-login">
				<div className="main-body">
					<QueueAnim type="bottom" className="ui-animate">
						<div key="1">
							<Login settings={settings} setToken={setToken} router={router} />
						</div>
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
	setToken: (email, token) => dispatch( setToken(email, token) )
});


export default connect(mapStateToProps, mapDispatchToProps)(Logincontainer)
