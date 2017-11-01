import React, { Component } from 'react'
import moment from 'moment'
import numeral from 'numeral'

import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'
import LinearProgress from 'material-ui/LinearProgress'


class ViewsLine extends Component {

	groupByDay(statistics) {
		const
			format      = 'MM/DD'

		const groupByDay = statistics.reduce((acum, statistic) => {
			let date = moment( statistic.get('created_at') ).format( format )
			if ( ! acum[date] ) acum[date] = []

			acum[date].push( statistic.get('views') )
			return acum
		}, {})

		for (var key in groupByDay) {
			let sum = groupByDay[key].reduce((a, b) => a + b );
			let avg = sum / groupByDay[key].length;
			groupByDay[key] = avg
		}

		return groupByDay

	}

	getOptions(statistics) {
		const groupByDay = this.groupByDay(statistics)

		return {
			color: [CHARTCONFIG.color.success],
			tooltip: {
				trigger: 'axis'
			},
			title: {
				text: 'Просмотры',
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
					data: Object.keys(groupByDay),
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
					name: 'Просмотры',
					type: 'line',
					stack: 'Sum',
					data: Object.values(groupByDay)
				}
			]
		}
	}

	render() {
		const { statistics } = this.props;


		return (
			<div className="box box-default">
				<div className="box-body">
					{
						statistics ?
							<ReactEcharts option={ this.getOptions(statistics) } showLoading={false} />
							:
							<LinearProgress mode="indeterminate"/>
					}
				</div>
			</div>
		)
	}
}

module.exports = ViewsLine
