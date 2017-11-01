import React, { Component } from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import { createSelector } from 'reselect'


class ChannelCard extends Component {

	getStreamPreview = createSelector(
		template => template,
		template =>
			template.replace('{width}', 640).replace('{height}', 360)
	)

	render() {

		const {
			stream, channel
		} = this.props;

		return (!channel || channel.get('isFetching')) ?
			<LinearProgress mode="indeterminate"/>
			:
			(stream ?
				<div className="card card-white card_full-width">
					<div className="card-image">
						<img src={ this.getStreamPreview( stream.get('preview') ) } alt=""/>
						<span className="card-title">
							{ channel.getIn(['data', 'display_name']) }
						</span>
					</div>
					<div className="card-content">
						<span className="card-profile-img float-right">
							<img src={ channel.getIn(['data', 'logo']) } alt="" />
						</span>
						<p>{ channel.getIn(['data', 'description']) }</p>
					</div>
				</div>
				:
				<div className="box box-default">
					<div className="box-body">
						<div className="callout callout-danger">
							<h4>Не в сети</h4>
							<p>Стрим не доступен</p>
						</div>
					</div>
				</div>
			)

	}
}

module.exports = ChannelCard;
