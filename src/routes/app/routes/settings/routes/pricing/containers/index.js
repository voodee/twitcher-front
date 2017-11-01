import React, {Component} from 'react'
import { connect } from 'react-redux'

import QueueAnim from 'rc-queue-anim'

import PricingComponent from '../components'

class Pricing extends Component {

	render() {
		return (
			<section className="container-fluid with-maxwidth chapter">
				<QueueAnim type="bottom" className="ui-animate">
					<PricingComponent />
				</QueueAnim>
			</section>
		)
	}
}

const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Pricing)
