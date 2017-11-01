import React, { Component } from 'react'
import { createSelector } from 'reselect'
import moment from 'moment'

import LinearProgress from 'material-ui/LinearProgress'
import ReactEcharts from 'components/ReactECharts'
import CHARTCONFIG from 'constants/ChartConfig'

class StreamCalendar extends Component {


	getVirtulData = streams => {
		const
			format      = 'YYYY-MM-DD',
			year        = '2017',
			date        = +moment(year + '-01-01'),
			end         = +moment((+year + 1) + '-01-01'),
			hourTime    = 3600 * 1000,
			dayTime     = hourTime * 24,
			data        = []


		const streamsData = streams.reduce((accum, stream) => {
			let
				startDate       = moment( stream.get('start_at') ),
				endDate         = stream.get('end_at') ? moment( stream.get('end_at') ) : moment(),
				endDay          = startDate.clone().endOf('day'),
				hoursAll        = (endDate - startDate) / hourTime,
				hoursToEndDay   = (endDay - startDate) / hourTime

			if ( hoursToEndDay > hoursAll ) {
				accum[startDate.format(format)] = Math.round(hoursAll)
			} else {
				accum[startDate.format(format)] = Math.round(hoursToEndDay)
				let hours = hoursAll - hoursToEndDay
				do {
					startDate.add(1, 'd')
					accum[startDate.format(format)] = hours > 24 ? 24 : Math.round(hours)
					hours -= 24
				} while ( hours > 0)
			}
			return accum
		}, [])

		for (
			let time = date, timeStr = moment(date).format(format);
			time < end;
			time += dayTime, timeStr = moment(time).format(format)
		) {
			if (streamsData[timeStr])
				data.push([
					timeStr,
					streamsData[timeStr] ? streamsData[timeStr] : 0
				]);
		}

		return data;
	}


	getOptions = createSelector(
		props => props.streams,
		streams => {

			return  {
				tooltip: {
					position: 'top'
				},
				animation: false,
				grid: {
					height: '50%',
					y: '10%'
				},
				visualMap: {
					min: 0,
					max: 24,
					calculable: true,
					orient: 'horizontal',
					left: 'center',
					bottom: '15%'
				},

				calendar: [
					{
						range: '2017',
						cellSize: ['auto', 20]
					}
				],

				series: [{
					type: 'heatmap',
					coordinateSystem: 'calendar',
					calendarIndex: 0,
					data: this.getVirtulData(streams),
					label: {
						normal: {
							show: true,
							formatter: params => params.data[1],
						}
					},
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]

			}
		}
	)

	render() {
		return (
			<div className="box box-default">
				<div className="box-header">Временная шкала</div>
				<div className="box-body">
					{
						this.props.streams ?
							<ReactEcharts option={ this.getOptions(this.props) } showLoading={false} />
							:
							<LinearProgress mode="indeterminate"/>
					}
				</div>
			</div>
		)
	}
}

module.exports = StreamCalendar;
