import React, { Component } from 'react'
import { createSelector } from 'reselect'

import LinearProgress from 'material-ui/LinearProgress'
import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'

class ContentBar extends Component {

	getOptions = createSelector(
		props => props.games,
		games => {
			const oneStepPercent = 100 / games.size
			const gamesStatistics = Object.keys( games.toJS() ).reduce((games, name) => {
				// const name = game.get('name')
				if (games.hasOwnProperty(name)) {
					games[name] += 1
				} else {
					games[name] = 0
				}

				return games
			}, {});


			return {
				tooltip: {
					trigger     : 'item',
					formatter   : '{a} <br/>{b} : {d}%'
				},
				legend: {
					orient      : 'vertical',
					x           : 'left',
					data        : Object.keys(gamesStatistics),
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
						name: 'Уделённое время',
						type: 'pie',
						radius: [30, 110],
						roseType: 'radius',
						data: Object.keys(gamesStatistics).map( name => {
							return {
								value: gamesStatistics[name],
								name
							}
						})
					}
				]

			}
		}
	)

	render() {
		return (
			<div className="box box-default">
				<div className="box-header">Разнообразие контента</div>
				<div className="box-body">
					{
						this.props.games ?
							<ReactEcharts option={ this.getOptions(this.props) } showLoading={false} />
							:
							<LinearProgress mode="indeterminate"/>
					}
				</div>
			</div>
		)
	}
}

module.exports = ContentBar;
