import React, { Component } from 'react'
import { createSelector } from 'reselect'

import LinearProgress from 'material-ui/LinearProgress'
import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'



class FollowersBubble extends Component {

	getOptions = createSelector(
		props => '',
		() => {


			const man = []
			const woomen = []

			for (let i = 0; i < Math.floor(Math.random() * 400) + 100; ++i) {
				man.push([
					Math.floor(Math.random() * 400) + 30,
					Math.floor(Math.random() * 18) + Math.floor(Math.random() * 18),
				])
			}
			for (let i = 0; i < Math.floor(Math.random() * 200) + 50; ++i) {
				woomen.push([
					Math.floor(Math.random() * 200) + 5,
					Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10),
				])
			}

			return {
				title: {
					text: 'Карта подписчиков',
					subtext: 'Возраст и активность'
				},
				legend: {
					data: ['Девушки', 'Парни'],
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
				xAxis: [
					{
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value} мин',
							textStyle: {
								color: CHARTCONFIG.color.text
							}
						},
						splitLine: {
							lineStyle: {
								color: CHARTCONFIG.color.splitLine
							}
						},
						splitArea: {
							show: false
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						scale: true,
						axisLabel: {
							formatter: '{value} лет',
							textStyle: {
								color: CHARTCONFIG.color.text
							}
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
						name: 'Девушки',
						type: 'scatter',
						data: woomen
					},
					{
						name: 'Парни',
						type: 'scatter',
						data: man
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
						true ?
							<ReactEcharts option={ this.getOptions() } showLoading={false} />
							:
							<LinearProgress mode="indeterminate"/>
					}
				</div>
			</div>
		)
	}
}

module.exports = FollowersBubble
