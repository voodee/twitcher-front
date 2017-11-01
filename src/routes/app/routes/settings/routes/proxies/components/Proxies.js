import React, {Component} from 'react'
import LinearProgress from 'material-ui/LinearProgress'

export default class ProxiesComponent extends Component {

	render() {
		const { proxies } = this.props;

		return (
			<article className="article">
				<h2 className="article-title">Прокси ({proxies.size})</h2>

				{ proxies.size ?
					<div className="box box-default table-box table-responsive mdl-shadow--2dp">
						<table className="mdl-data-table">
							<thead>
							<tr>
								<th>IP</th>
								<th className="mdl-data-table__cell--non-numeric">Статус</th>
								<th className="mdl-data-table__cell--non-numeric">Логин</th>
								<th className="mdl-data-table__cell--non-numeric">Пароль</th>
							</tr>
							</thead>
							<tbody>
							{proxies.valueSeq().map( proxy =>
								<tr key={ proxy.get('id') }>
									<td>{ proxy.get('ip') }:{ proxy.get('port') }</td>
									<td className="mdl-data-table__cell--non-numeric">
										{ proxy.get('status') ?
											<span className="color-success  ">{ proxy.get('time') }</span> :
											( proxy.get('status') === null ?
													<i className="color-warning nav-icon material-icons">refresh</i> :
													<i className="color-danger nav-icon material-icons">clear</i>
											)

										}
									</td>
									<td className="mdl-data-table__cell--non-numeric">{ proxy.get('login') }</td>
									<td className="mdl-data-table__cell--non-numeric">***</td>
								</tr>
							)}
							</tbody>
						</table>
					</div>

					:

					<div className="callout callout-danger">
						<h4>Не найдено</h4>
						<p>Список прокси пуст</p>
					</div>
				}

			</article>
		)
	}

}
