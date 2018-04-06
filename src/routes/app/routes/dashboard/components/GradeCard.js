import React, { Component } from 'react'

import LinearProgress from 'material-ui/LinearProgress'

class GradeCard extends Component {

	getTextColor = literal => {
		switch (true) {
			case !!~literal.indexOf('A'):
				return 'color-primary'
			case !!~literal.indexOf('B'):
				return 'color-success'
			case !!~literal.indexOf('C'):
				return 'color-warning'
			default:
				return 'color-danger'

		}
	}

	render() {

		const { channel } = this.props;

		return (
			<div className="box box-default">
				<div className="box-header">Grade</div>
				<div className="box-body">
					<div className="call-to-action cta-inline">
						<div className="cta-inner" style={{paddingTop: 0}}>
							{
								(channel && channel.getIn(['data', 'cache_grad'])) ?
									<span
										className={`mdl-typography--display-4 ${this.getTextColor( channel.getIn(['data', 'cache_grad']) )}`}
										style={{fontWeight: 'bold'}}
									>
										{ channel.getIn(['data', 'cache_grad']) }
									</span>
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

module.exports = GradeCard
