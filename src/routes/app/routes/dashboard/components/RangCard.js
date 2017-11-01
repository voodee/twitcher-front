import React, { Component } from 'react'

import LinearProgress from 'material-ui/LinearProgress'

class RangCard extends Component {

	render() {

		const { channel } = this.props;

		return (
			<div className="box box-default">
				<div className="box-header">Позиция в общем рейтинге</div>
				<div className="box-body">
					<div className="call-to-action cta-inline">
						<div className="cta-inner" style={{paddingTop: 0}}>
							{
								channel ?
									<span className="mdl-typography--display-4">{ channel.getIn(['data', 'rang']) }</span>
									:
									<LinearProgress mode="indeterminate"/>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = RangCard
