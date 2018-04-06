import React, {Component} from 'react'
import { connect } from 'react-redux'

import QueueAnim from 'rc-queue-anim'

import { loadItems as loadTasks, updateTask } from 'reducers/tasks'
//import { loadItems as loadGames } from 'reducers/games'

import { getStreamByChannel, getStreamsByChannel, getStreamStatistics } from 'reducers/streams'
import { getStatistics, getHours, getGames, getAverage, getMetrics } from 'reducers/channels'

import DashboardComponent from '../components/Dashboard'

class Dashboard extends Component {

	componentDidMount() {
		this.props.loadTasks()
		//this.props.loadGames()
	}


	render() {
		const {
			task, tasksLoaded, updateTask, channel, stream, streams,
			chatters, hours, channelGames, average, metrics
		} = this.props;

		return (
			<section className="container-fluid no-breadcrumbs page-dashboard">
				<QueueAnim type="bottom" className="ui-animate">
					<DashboardComponent
						task={ task }
						tasksLoaded={ tasksLoaded }
						updateTask={ updateTask }
						channel={ channel }
						stream={ stream }
						streams={ streams }

						chatters={ chatters }
						hours={ hours }
						channelGames={ channelGames }
						average={ average }
						metrics={ metrics }
					/>
				</QueueAnim>
			</section>
		)
	}
}

const mapStateToProps = state => {
	const
		task                    = state.tasks.get('items').first(),
		channel_id              = task ? `${task.get('channel_id')}` : '',
		streams                 = getStreamsByChannel(state, channel_id),


		// stream      = task ? state.streams.getIn(['items', channel_id]) : null,
		streamFetching  = state.streams.get('isFetching'),
		gamesStatisticsLoaded   = state.games_statistics.get('loaded'),
		gamesStatistics         = state.games_statistics.get('items'),

		channel                 = state.channels.getIn(['items', channel_id]),
		stream                  = getStreamByChannel(state, channel_id),
		hours                   = getHours(state, channel_id),
		channelGames            = getGames(state, channel_id),
		average                 = getAverage(state),
		metrics                 = getMetrics(state, channel_id)


	return {
		task,
		channel,
		stream,
		streams,

		hours,
		channelGames,
		average,
		metrics
	}
}


const mapDispatchToProps = dispatch => ({
	loadTasks           : () => dispatch( loadTasks() ),
	updateTask          : task => dispatch( updateTask(task) ),
	//loadGames           : () => dispatch( loadGames() ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
