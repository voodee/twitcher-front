import React, { Component } from 'react'
import { createSelector } from 'reselect'

import LinearProgress from 'material-ui/LinearProgress'
import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'



class EmotionsPie extends Component {

	getOptions = createSelector(
		props => '',
		() => {

			const dictionary = [
				'Гнев',
				'Оотвращение',
				'Страх',
				'Счастье',
				'Нейтральность',
				'Грусть',
				'Удивление'
			];

			return {
				tooltip: {
					trigger     : 'item',
					formatter   : '{b} : {d}%'
				},
				toolbox: {
					show: true,
					feature: {
						saveAsImage: {show: true, title: 'save'}
					}
				},
				calculable: true,
				series: [
					{
						name: 'Area model',
						type: 'pie',
						radius: [30, 110],
						roseType: 'radius',
						data: [
							{value: Math.random(), name: dictionary[0]},
							{value: Math.random(), name: dictionary[1]},
							{value: Math.random(), name: dictionary[2]},
							{value: Math.random(), name: dictionary[3]},
							{value: Math.random() + 1, name: dictionary[4]},
							{value: Math.random(), name: dictionary[5]},
							{value: Math.random(), name: dictionary[6]},
						]
					}
				]

			}
		}
	)

	render() {
		return (
			<div className="box box-default">
				<div className="box-header">Эмоциональная карта канала</div>
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

module.exports = EmotionsPie
