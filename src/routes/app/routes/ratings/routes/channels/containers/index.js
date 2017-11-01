import React, {Component} from 'react'
import { connect } from 'react-redux'

import QueueAnim from 'rc-queue-anim'

import ChannelsComponent from '../components'
import {
	loadTopFollowed, loadTopViewed, loadTopViewers,
	getTopFollowedChannels, getTopViewedChannels
} from 'reducers/channels'

class Channel extends Component {

	componentDidMount() {
		this.props.loadTopFollowed()
		this.props.loadTopViewed()
		this.props.loadTopViewers()
	}


	render() {
		return (
			<section className="container-fluid with-maxwidth chapter">
				<QueueAnim type="bottom" className="ui-animate">
					<ChannelsComponent
						channelTopFollowed={this.props.channelTopFollowed}
						channelTopViewed={this.props.channelTopViewed}
					/>
				</QueueAnim>
			</section>
		)
	}
}

const mapStateToProps = state => ({
	channelTopFollowed  : getTopFollowedChannels(state, 15),
	channelTopViewed    : getTopViewedChannels(state, 15),
})


const mapDispatchToProps = dispatch => ({
	loadTopFollowed : () => dispatch( loadTopFollowed() ),
	loadTopViewed   : () => dispatch( loadTopViewed() ),
	loadTopViewers  : () => dispatch( loadTopViewers() ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Channel)
