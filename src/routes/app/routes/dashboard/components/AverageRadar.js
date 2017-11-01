import React, { Component } from 'react'
import { createSelector } from 'reselect'

import LinearProgress from 'material-ui/LinearProgress'
import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'

class AverageRadar extends Component {

	getOptions = createSelector(
		props => props.average,
		props => props.metrics,
		(average, metrics) => {

			const
				ratio = {
					viewers     : metrics.get('viewers') / average.get('viewers'),
					followers   : metrics.get('followers') / average.get('followers'),
					views       : metrics.get('views') / average.get('views'),
					chatters    : metrics.get('chatters') / average.get('chatters'),
					videos      : metrics.get('videos') / average.get('videos'),
				},
				ratioSorted = Object.keys(ratio).sort((a,b) => ratio[a]-ratio[b]),
				delta = {}

			let start = 1
			const step = start / ratioSorted.length
			for (let key of ratioSorted) {
				delta[key] = 1 + start
				start -= step
			}


			return {
				tooltip: {},
				legend: {
					orient: 'vertical',
					x: 'right',
					y: 'bottom',
					data: ['Показатели канала', 'Средние значения'],
					textStyle: {
						color: CHARTCONFIG.color.text
					}
				},
				toolbox: {
					show: true,
					feature: {
						saveAsImage: {show: true, title: 'save'}
					}
				},
				radar: [
					{
						axisLine: {
							show: true,
							lineStyle: {
								// for both indicator and axisLine, bad, better seperate them
								color: '#b1b1b1'
							}
						},
						splitLine: {
							lineStyle: {
								color: 'rgba(0,0,0,.1)'
							}
						},
						splitArea: {
							show: true,
							areaStyle: {
								color: CHARTCONFIG.color.splitArea
							}
						},
						indicator: [
							{name: 'Зрители', max: Math.max(metrics.get('viewers') || 0, average.get('viewers') || 0) * delta.viewers},
							{name: 'Чат', max: Math.max(metrics.get('chatters') || 0, average.get('chatters') || 0) * delta.chatters},
							{name: 'Фоловеры', max: Math.max(metrics.get('followers') || 0, average.get('followers') || 0) * delta.followers},
							{name: 'Просмотры', max: Math.max(metrics.get('views') || 0, average.get('views') || 0) * delta.views},
							{name: 'Видео', max: Math.max(metrics.get('videos') || 0, average.get('videos') || 0) * delta.videos},
						]
					}
				],
				calculable: true,
				series: [
					{
						name: 'Статистика канала',
						type: 'radar',
						data: [
							{
								value: [
									metrics.get('viewers'),
									metrics.get('chatters'),
									metrics.get('followers'),
									metrics.get('views'),
									metrics.get('videos')
								],
								name: 'Показатели канала'
							},
							{
								value: [
									average.get('viewers'),
									average.get('chatters'),
									average.get('followers'),
									average.get('views'),
									average.get('videos')
								],
								name: 'Средние значения'
							}
						]
					}
				]
			}
		}
	)

	render() {
		return (
			<div className="box box-default">
				<div className="box-body">
					{
						(this.props.average && this.props.metrics) ?
							<ReactEcharts option={ this.getOptions(this.props) } showLoading={false} />
							:
							<LinearProgress mode="indeterminate"/>
					}
				</div>
			</div>
		)
	}
}

module.exports = AverageRadar;
