import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import LinearProgress from 'material-ui/LinearProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import ReactEcharts from 'components/ReactECharts';
import CHARTCONFIG from 'constants/ChartConfig';

import { Map, List, fromJS } from 'immutable'
import { createSelector } from 'reselect'
import { getStreamPreview } from 'reducers/streams'
import moment from 'moment'

import ChannelCard from './ChannelCard'
import TaskForm from './TaskForm'
import Metrics from './Metrics'
import Timebar from './Timebar'
import ContentBar from './ContentBar'
import StreamCalendar from './StreamCalendar'
import AverageRadar from './AverageRadar'
import GradeCard from './GradeCard'
import RangCard from './RangCard'
import IncomeCard from './IncomeCard'
import SubscribersLine from './SubscribersLine'
import ViewsLine from './ViewsLine'
import ViewersLine from './ViewersLine'
import PersonalityTraitsCharts from './PersonalityTraitsCharts'
import EmotionsPie from './EmotionsPie'
import FollowersBubble from './FollowersBubble'
import BotsPie from './BotsPie'
import ChattersPie from './ChattersPie'
import ViewersPie from './ViewersPie'



class Dashboard extends Component {

	componentWillReceiveProps(nextProps) {
		const { task } = nextProps;

		if (task && task.get('errors').size) {
			this.form.updateInputsWithError(task.get('errors').toJS())
		}
	}

	render() {
		const {
			task, channel, streams, stream,
			updateTask
		} = this.props;

		return (
			<div>

				<div className="row">
					<div className="col-xl-4">
						<TaskForm
							task={ task }
							updateTask={ updateTask }
						/>
					</div>

					<div className="col-xl-4">
						<ChannelCard
							stream={ stream }
							channel={ channel }
						/>
					</div>

					<div className="col-xl-4">
						<AverageRadar
							average={ this.props.average }
							metrics={ this.props.metrics }
						/>
					</div>
				</div>


				<Metrics
					data={ this.props.metrics }
				/>


				<div className="row">
					<div className="col-xl-12">
						<StreamCalendar streams={ streams } />
					</div>
				</div>

				<div className="row">
					<div className="col-xl-6">
						<ContentBar games={ this.props.channelGames } />
					</div>
					<div className="col-xl-6">
						<Timebar hours={ this.props.hours } />
					</div>
				</div>

				<div className="row">
					<div className="col-xl-4">
						<GradeCard channel={ this.props.channel } />
					</div>
					<div className="col-xl-4">
						<RangCard channel={ this.props.channel } />
					</div>
					<div className="col-xl-4">
						<IncomeCard channel={ this.props.channel } />
					</div>
				</div>

				<div className="row">
					<div className="col-xl-6">
						<SubscribersLine statistics={ this.props.channel && this.props.channel.getIn(['data', 'statistics']) } />
					</div>
					<div className="col-xl-6">
						<ViewsLine statistics={ this.props.channel && this.props.channel.getIn(['data', 'statistics']) } />
					</div>
				</div>

				<div className="row">
					<div className="col-xl-12">
						<ViewersLine
						    streams={ this.props.streams }
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-xl-6">
						<EmotionsPie />
					</div>
					<div className="col-xl-6">
						<PersonalityTraitsCharts />
					</div>
				</div>

				<div className="row">
					<div className="col-xl-12">
						<FollowersBubble />
					</div>
				</div>

				<div className="row">
					<div className="col-xl-4">
						<BotsPie metrics={ this.props.metrics } />
					</div>
					<div className="col-xl-4">
						<ChattersPie metrics={ this.props.metrics } />
					</div>
					<div className="col-xl-4">
						<ViewersPie metrics={ this.props.metrics } />
					</div>
				</div>
			</div>
		)
	}
}

module.exports = Dashboard;
