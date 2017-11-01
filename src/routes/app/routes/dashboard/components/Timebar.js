import React, { Component } from 'react'
import { createSelector } from 'reselect'

import LinearProgress from 'material-ui/LinearProgress'
import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'

class Timebar extends Component {

	getOptions = createSelector(
		props => props.hours,
		hours => {

			const dictionary = ['Ночь', 'Утро', 'День', 'Вечер'];
			const dictionaryEmpty = dictionary.slice();
			const data = hours.reduce( (hours, value, hour) => {
				hours.push({
					name: dictionary[Math.round(hour)],
					value
				})
				delete dictionaryEmpty[Math.round(hour)]
				return hours
			}, [])

			dictionaryEmpty.map( name => {
				data.push({
					name,
					value: 0
				})
			})

			return {
				tooltip: {
					trigger     : 'item',
					formatter   : '{b} : {d}%'
				},
				legend: {
					orient      : 'vertical',
					x           : 'left',
					data        : dictionary,
					textStyle   : {
						color: CHARTCONFIG.color.text
					}
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
						data
					}
				]

			}
		}
	)

	render() {
		return (
			<div className="box box-default">
				<div className="box-header">Временная шкала</div>
				<div className="box-body">
					{
						this.props.hours ?
							<ReactEcharts option={ this.getOptions(this.props) } showLoading={false} />
							:
							<LinearProgress mode="indeterminate"/>
					}
				</div>
			</div>
		)
	}
}

module.exports = Timebar;
