import React, { Component } from 'react'
import numeral from 'numeral'


class Metrics extends Component {

	render() {

		const { data } = this.props;

		return (
			<div className="row">
				<div className="col-xl-3 col-sm-6">
					<div className="box box-default">
						<div className="box-top">
							<span style={{textTransform: 'uppercase'}}>{ numeral(data.get('viewers')).format('0,0 a') }</span>
						</div>
						<div className="box-info">
							<span>Зрители</span>
						</div>
						<div className="box-bottom">
							<i className="material-icons color-info">supervisor_account</i>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-sm-6">
					<div className="box box-default">
						<div className="box-top">
							<span style={{textTransform: 'uppercase'}}>{ numeral(data.get('chatters')).format('0,0 a') }</span>
						</div>
						<div className="box-info">
							<span>Чат</span>
						</div>
						<div className="box-bottom">
							<i className="material-icons color-warning">question_answer</i>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-sm-6">
					<div className="box box-default">
						<div className="box-top">
							<span style={{textTransform: 'uppercase'}}>{ numeral(data.get('followers')).format('0,0 a') }</span>
							{/*<span className="size-h5">k</span>*/}
						</div>
						<div className="box-info">
							<span>Подписчики</span>
						</div>
						<div className="box-bottom">
							<i className="material-icons color-danger">favorite</i>
						</div>
					</div>
				</div>

				<div className="col-xl-3 col-sm-6">
					<div className="box box-default">
						<div className="box-top">
							<span style={{textTransform: 'uppercase'}}>{ numeral(data.get('views')).format('0,0 a') }</span>
						</div>
						{/*<div className="box-top">*/}
							{/*{*/}
								{/*channelStatistics && (*/}
									{/*channelStatistics.get('views') < 1000 ?*/}
										{/*<span>{channelStatistics.get('views')}</span>*/}
										{/*:*/}
										{/*<span>*/}
											{/*{Math.round(channelStatistics.get('views')/1000)}*/}
											{/*<span className="size-h5">k</span>*/}
										{/*</span>*/}
								{/*)*/}
							{/*}*/}
						{/*</div>*/}
						<div className="box-info">
							<span>Просмотры</span>
						</div>
						<div className="box-bottom">
							<i className="material-icons color-success">visibility</i>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = Metrics;
