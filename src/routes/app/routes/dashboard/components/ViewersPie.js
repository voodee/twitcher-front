import React, { Component } from 'react'
import { createSelector } from 'reselect'

import LinearProgress from 'material-ui/LinearProgress'
import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'



class ViewersPie extends Component {

	getOptions = createSelector(
		metrics => metrics.get('viewers'),
		viewers => {

			const
				bots = Math.round( viewers * .46 ),
				users = Math.round( viewers * .54 )

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
				<div className="box-header">Качество зрителей</div>
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

module.exports = ViewersPie
