import React, { Component } from 'react'
import numeral from 'numeral'

import LinearProgress from 'material-ui/LinearProgress'

class IncomeCard extends Component {

	render() {

		const { channel } = this.props;

		return (
			<div className="box box-default">
				<div className="box-header">Недельный доход</div>
				<div className="box-body">
					<div className="call-to-action cta-inline">
						<div className="cta-inner" style={{paddingBottom: '2.6rem'}}>
							{
								channel ?
									<span>
										<span className="mdl-typography--display-3">{ numeral( channel.getIn(['data', 'rating']) / 20 / 60 ).format('0,0[.]00') }</span>
										<span className="size-h5">$</span>
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

module.exports = IncomeCard
