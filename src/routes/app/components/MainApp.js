import React, { Component } from 'react'
import { connect } from 'react-redux'


import Header from 'components/Header'
import Sidenav from 'components/Sidenav'
import Footer from 'components/Footer'

class MainApp extends Component {


	checkPermision = props => {
		const { router } = this.props;

		if (
			// this.props.user.get('token') && nextProps.user.get('token') === null
		(router.location.pathname !== 'login' || router.location.pathname !== 'signup') && !props.user.get('token')
		) {
			return router.push('/login')
		}
	}


	componentWillMount() {
		this.checkPermision( this.props )
	}


	componentWillReceiveProps(nextProps) {
		this.checkPermision( nextProps )
	}


	render() {
		const {children, location, user, router} = this.props;

		if (!user.get('token')) return <div />


		return (
			<div className="main-app-container">
				<Sidenav />

				<section id="page-container" className="app-page-container">
					<Header router={router} />

					<div className="app-content-wrapper">
						<div className="app-content">
							<div className="full-height">
								{children}
							</div>
						</div>

						<Footer />
					</div>
				</section>

			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user
})


const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
