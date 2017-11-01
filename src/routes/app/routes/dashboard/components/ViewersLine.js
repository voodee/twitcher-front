import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { createSelector } from 'reselect'

import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'
import LinearProgress from 'material-ui/LinearProgress'


class ViewersLine extends Component {

	groupByHour(streams) {
		const
			format      = 'MM/DD HH:00'

		let
			current,
			end,
			keyMin      = Object.keys(streams)[0],
			keyMax      = Object.keys(streams)[0],
			groupByHour = {}

		for (var key in streams) {
			// if (key < keyMin) keyMin = key
			// if (key > keyMax) keyMax = key

			groupByHour = streams[key].statistics.reduce((acum, statistic) => {
				const created_at = moment( statistic.created_at )

				if (!current) current = created_at
				if (!end) end = created_at
				if (current > created_at) current = created_at
				if (end < created_at) end = created_at

				let date = created_at.format( format )
				if ( ! acum[date] ) acum[date] = []

				acum[date].push( statistic.viewers )
				return acum
			}, groupByHour)
		}


		for (var key in groupByHour) {
			let sum = groupByHour[key].reduce((a, b) => a + b );
			let avg = sum / groupByHour[key].length;
			groupByHour[key] = Math.floor( avg )
		}


		let
			// current = moment(streams[keyMin].statistics[0].created_at),
			// end = moment(streams[keyMax].statistics[ streams[keyMax].statistics.length - 1 ].created_at),
			dates   = [],
			values  = []


		while(current < end) {
			let date = current.format( format )
			if ( ! groupByHour[date] ) groupByHour[date] = 0
			current = current.add(1, 'h')
			if (groupByHour[date]) {
				dates.push( date )
				values.push( groupByHour[date] )
			}
		}

		return {
			dates,
			values
		}

	}

	getOptions = createSelector(
		streams => streams,
		streams => {
			const {dates, values} = this.groupByHour(streams.toJS())

			return {
				color: [CHARTCONFIG.color.success],
				tooltip: {
					trigger: 'axis'
				},
				title: {
					text: 'Зрители',
				},
				toolbox: {
					show: true,
					feature: {
						saveAsImage: {show: true, title: 'save'}
					}
				},
				calculable: true,
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: dates,
						axisLabel: {
							textStyle: {
								color: CHARTCONFIG.color.text
							}
						},
						splitLine: {
							lineStyle: {
								color: CHARTCONFIG.color.splitLine
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						axisLabel: {
							textStyle: {
								color: CHARTCONFIG.color.text
							},
							formatter: (value) => `${ numeral(value).format('0a') }`
						},
						splitLine: {
							lineStyle: {
								color: CHARTCONFIG.color.splitLine
							}
						},
						splitArea: {
							show: true,
							areaStyle: {
								color: CHARTCONFIG.color.splitArea
							}
						}
					}
				],
				series: [
					{
						name: 'Зрители',
						type: 'line',
						stack: 'Sum',
						data: values
					}
				]
			}
		}
	)


	render() {
		const { streams } = this.props;

		return (
			<div className="box box-default">
				<div className="box-body">
					{
						(streams && streams.size) ?
							<ReactEcharts option={ this.getOptions(streams) } showLoading={false} />
							:
							<LinearProgress mode="indeterminate"/>
					}
				</div>
			</div>
		)
	}
}

module.exports = ViewersLine
