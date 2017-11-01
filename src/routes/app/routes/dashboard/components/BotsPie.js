import React, { Component } from 'react'
import { createSelector } from 'reselect'

import LinearProgress from 'material-ui/LinearProgress'
import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'



class BotsPie extends Component {

	getOptions = createSelector(
		metrics => metrics,
		metrics => {

			const
				bots = Math.round( metrics.get('followers') * .18 ),
				users = Math.round( metrics.get('followers') * .82 )

			const dictionary = [
				'Люди',
				'Боты'
			];

			return {
				tooltip: {
					trigger     : 'item',
					formatter   : '{b} : {c} ({d}%)'
				},
				toolbox: {
					show: true,
					feature: {
						saveAsImage: {show: true, title: 'Сохранить'}
					}
				},
				calculable: true,
				series: [
					{
						name: 'Area model',
						type: 'pie',
						data: [
							{value: users, name: dictionary[0]},
							{value: bots, name: dictionary[1]},
						]
					}
				]

			}
		}
	)

	render() {
		return (
			<div className="box box-default">
				<div className="box-header">Качество фоловеров</div>
				<div className="box-body">
					{
						this.props.metrics ?
							<ReactEcharts option={ this.getOptions( this.props.metrics ) } showLoading={false} />
							:
							<LinearProgress mode="indeterminate"/>
					}
				</div>
			</div>
		)
	}
}

module.exports = BotsPie
