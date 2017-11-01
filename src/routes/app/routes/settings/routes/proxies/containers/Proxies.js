import React, {Component} from 'react'
import { connect } from 'react-redux'

import QueueAnim from 'rc-queue-anim'

import { loadItems } from 'reducers/proxies'
import ProxiesComponent from '../components/Proxies'

class Proxies extends Component {

	timerId = null;

	componentDidMount() {
		this.props.loadItems()

		this.timerId = setInterval(this.props.loadItems, 10000)
	}

	componentWillUnmount() {
		clearInterval(this.timerId)
	}

	render() {
		const { proxies } = this.props;

		return (
			<section className="container-fluid with-maxwidth chapter">
				<QueueAnim type="bottom" className="ui-animate">
					<ProxiesComponent proxies={ proxies.get('items') } />
				</QueueAnim>
			</section>
		)
	}
}

const mapStateToProps = state => ({
	proxies: state.proxies
})


const mapDispatchToProps = dispatch => ({
	loadItems: () => dispatch( loadItems() )
})

export default connect(mapStateToProps, mapDispatchToProps)(Proxies)
