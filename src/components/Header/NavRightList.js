import React, {Component} from 'react'
import {connect} from 'react-redux'
import md5 from 'js-md5'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton/IconButton'
import {hashHistory} from 'react-router'

import { signOut } from 'reducers/user'

const ImgIconButtonStyle = {
	width: '60px',
	height: '60px'
};

const listItemStyle = {
	paddingLeft: '50px' // 36 + 16, algin with sub list
};

class NavRightList extends Component {


	componentDidMount() {
		const {user} = this.props;
		this.hash = md5(user.get('email'));
	}

	handleChange = (event, value) => {
		hashHistory.push(value);
	}

	render() {
		const { signOut } = this.props;

		return (
			<ul className="list-unstyled float-right">
				<li style={{marginRight: '10px'}}>
					<IconMenu
						iconButtonElement={<IconButton style={ImgIconButtonStyle}><img
							src={`https://www.gravatar.com/avatar/${this.hash}`} alt=""
							className="rounded-circle img30_30"/></IconButton>}
						onChange={this.handleChange}
						anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
						targetOrigin={{horizontal: 'right', vertical: 'top'}}
						menuStyle={{minWidth: '150px'}}
					>
						<MenuItem
							value="/app/dashboard"
							primaryText="Профиль"
							style={{fontSize: '14px', lineHeight: '48px'}}
							innerDivStyle={listItemStyle}
							leftIcon={<i className="material-icons">face</i>}
						/>
						<MenuItem
							primaryText="Выход"
							innerDivStyle={listItemStyle}
							style={{fontSize: '14px', lineHeight: '48px'}}
							leftIcon={<i className="material-icons">forward</i>}
							onClick={ signOut }
						/>
					</IconMenu>
				</li>
			</ul>
		);
	}
}


const mapStateToProps = state => ({
	user: state.user
})


const mapDispatchToProps = (dispatch, ownProps) => ({
	signOut: () => dispatch(signOut( ownProps.router ))
})


export default connect(mapStateToProps, mapDispatchToProps)(NavRightList)
