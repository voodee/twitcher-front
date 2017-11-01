import React, {Component} from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import RaisedButton from 'material-ui/RaisedButton'

export default class extends Component {

	render() {

		return (
			<article className="article">
				<h2 className="article-title">Тарифы</h2>

				<div className="row">
					<div className="col-md-3 col-xsm-6">
						<section className="pricing-table pricing-table-primary">
							<header><h2>Trial</h2></header>
							<p className="pricing-price"><span className="pricing-sign">$</span>0.00<span className="pricing-sub">/mo</span></p>
							<div className="pricing-plan-details">
								<p className="pricing-lead">Including</p>
								<ul>
									<li>No Support</li>
									<li>1 Website</li>
									<li>10GB Disk Space</li>
									<li>3 Database</li>
									<li>1 Email Address</li>
								</ul>
							</div>
							<footer><RaisedButton label="Текущий" disabled /></footer>
						</section>
					</div>

					<div className="col-md-3 col-xsm-6">
						<section className="pricing-table pricing-table-success">
							<header><h2>Basic</h2></header>
							<p className="pricing-price"><span className="pricing-sign">$</span>19.99<span className="pricing-sub">/mo</span></p>
							<div className="pricing-plan-details">
								<p className="pricing-lead">&nbsp;</p>
								<ul>
									<li><b>100</b> Зрителей</li>
									<li><b>50</b> людей в чате</li>
									<li><b>500</b> фоловеров</li>
									<li><b>500</b> просмотров канала</li>
								</ul>
							</div>
							<footer><a href="javascript:;" className="btn btn-success">Купить</a></footer>
						</section>
					</div>

					<div className="col-md-3 col-xsm-6">
						<section className="pricing-table pricing-table-warning">
							<header> <h2>Standard</h2> </header>
							<p className="pricing-price"><span className="pricing-sign">$</span>29.99<span className="pricing-sub">/mo</span></p>
							<div className="pricing-plan-details">
								<p className="pricing-lead">Including</p>
								<ul>
									<li>24/7 Support</li>
									<li>Unlimited Website</li>
									<li>500GB Disk Space</li>
									<li>25 Database</li>
									<li>50 Email Address</li>
								</ul>
							</div>
							<footer><a href="javascript:;" className="btn btn-warning">Get it now</a></footer>
						</section>
					</div>

					<div className="col-md-3 col-xsm-6">
						<section className="pricing-table pricing-table-danger">
							<header> <h2>Ultimate</h2> </header>
							<p className="pricing-price"><span className="pricing-sign">$</span>39.99<span className="pricing-sub">/mo</span></p>
							<div className="pricing-plan-details">
								<p className="pricing-lead">Including</p>
								<ul>
									<li>24/7 Support</li>
									<li>Unlimited Website</li>
									<li>Unlimited Disk Space</li>
									<li>Unlimited Database</li>
									<li>100 Email Address</li>
								</ul>
							</div>
							<footer><a href="javascript:;" className="btn btn-danger">Get it now</a></footer>
						</section>
					</div>
				</div>


			</article>
		)
	}

}
