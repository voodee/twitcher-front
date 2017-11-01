import React, {Component} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table'
import LinearProgress from 'material-ui/LinearProgress'
import RaisedButton from 'material-ui/RaisedButton'

const styleImg = {
	maxWidth    : '80%',
	maxHeight   : '80%',
	borderRadius: '100%'
}

const styleSmallTd = {
	paddingRight: '0',
	paddingLeft : '0',
	width       : '24px'
}

export default class extends Component {

	render() {
		const {channelTopFollowed, channelTopViewed} = this.props;

		return (
			<article className="article">



				<div className="row">
					<div className="col-md-6">
						<h2 className="article-title">Top Followed Channels</h2>

						{channelTopFollowed.size ?
							<div>
								<div className="row">
									{channelTopFollowed.slice(0, 3).map((channel, key) =>
										<div className="col-xl-4 col-lg-6" key={key}>
											<a href="#" className="item-card">
												<div className="card__image full__image">
													<img alt="product" src={channel.get('logo')} />
												</div>
												{/*<div className="card__body card-white">*/}
												{/*<div className="card__title">*/}
												{/*<h6>{channel.getIn(['statistics', '0', 'game_id'])}</h6>*/}
												{/*<h4>{channel.get('name')}</h4>*/}
												{/*</div>*/}
												{/*<div className="card__price">*/}
												{/*<span>{channel.get('cache_followers')}</span>*/}
												{/*</div>*/}
												{/*</div>*/}
											</a>
										</div>
									)}
								</div>

								<div className="box box-transparent">
									<div className="box-body no-padding-h">
										<div className="box box-default table-box mdl-shadow--2dp">
											<Table
												selectable={false}
											>
												<TableHeader
													displaySelectAll={false}
													adjustForCheckbox={false}
													enableSelectAll={false}
												>
													<TableRow>
														<TableHeaderColumn style={{width: '72px'}}>#</TableHeaderColumn>
														<TableHeaderColumn style={styleSmallTd}></TableHeaderColumn>
														<TableHeaderColumn>Name</TableHeaderColumn>
														<TableHeaderColumn>Grad</TableHeaderColumn>
														<TableHeaderColumn>Followers</TableHeaderColumn>
														<TableHeaderColumn>Views</TableHeaderColumn>
													</TableRow>
												</TableHeader>
												<TableBody
													displayRowCheckbox={false}
													stripedRows={true}
												>
													{channelTopFollowed.map((channel, key) =>
														<TableRow key={channel.get('_id')}>
															<TableRowColumn style={{width: '72px'}}>{key + 1}</TableRowColumn>
															<TableRowColumn style={styleSmallTd}><img src={channel.get('logo')} style={styleImg} /></TableRowColumn>
															<TableRowColumn><a href="#">{channel.get('display_name')}</a></TableRowColumn>
															<TableRowColumn><b>{channel.get('cache_grad')}</b></TableRowColumn>
															<TableRowColumn>{channel.get('cache_followers')}</TableRowColumn>
															<TableRowColumn>{channel.get('cache_views')}</TableRowColumn>
														</TableRow>
													)}
												</TableBody>
											</Table>
										</div>
									</div>
								</div>
							</div> :
							<LinearProgress />
						}
					</div>


					<div className="col-md-6">
						<div className="box box-transparent">
							<h2 className="article-title">Top Viewed Channels</h2>


							{channelTopFollowed.size ?
								<div>
									<div className="row">
										{channelTopViewed.slice(0, 3).map((channel, key) =>
											<div className="col-xl-4 col-lg-6" key={key}>
												<a href="#" className="item-card">
													<div className="card__image full__image">
														<img alt="product" src={channel.get('logo')} />
													</div>
													{/*<div className="card__body card-white">*/}
													{/*<div className="card__title">*/}
													{/*<h6>{channel.getIn(['statistics', '0', 'game_id'])}</h6>*/}
													{/*<h4>{channel.get('name')}</h4>*/}
													{/*</div>*/}
													{/*<div className="card__price">*/}
													{/*<span>{channel.get('cache_followers')}</span>*/}
													{/*</div>*/}
													{/*</div>*/}
												</a>
											</div>
										)}
									</div>

									<div className="box-body no-padding-h">
										<div className="box box-default table-box mdl-shadow--2dp">
											<Table
												selectable={false}
											>
												<TableHeader
													displaySelectAll={false}
													adjustForCheckbox={false}
													enableSelectAll={false}
												>
													<TableRow>
														<TableHeaderColumn style={{width: '72px'}}>#</TableHeaderColumn>
														<TableHeaderColumn style={styleSmallTd}></TableHeaderColumn>
														<TableHeaderColumn>Name</TableHeaderColumn>
														<TableHeaderColumn>Grad</TableHeaderColumn>
														<TableHeaderColumn>Followers</TableHeaderColumn>
														<TableHeaderColumn>Views</TableHeaderColumn>
													</TableRow>
												</TableHeader>
												<TableBody
													displayRowCheckbox={false}
													stripedRows={true}
												>
													{channelTopViewed.map((channel, key) =>
														<TableRow key={channel.get('_id')}>
															<TableRowColumn style={{width: '72px'}}>{key + 1}</TableRowColumn>
															<TableRowColumn style={styleSmallTd}><img src={channel.get('logo')} style={styleImg} /></TableRowColumn>
															<TableRowColumn><a href="#">{channel.get('display_name')}</a></TableRowColumn>
															<TableRowColumn><b>{channel.get('cache_grad')}</b></TableRowColumn>
															<TableRowColumn>{channel.get('cache_followers')}</TableRowColumn>
															<TableRowColumn>{channel.get('cache_views')}</TableRowColumn>
														</TableRow>
													)}
												</TableBody>
											</Table>
										</div>
									</div>
								</div> :
								<LinearProgress />
							}
						</div>
					</div>
				</div>
			</article>
		)
	}
}
