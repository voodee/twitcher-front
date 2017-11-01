import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import settings from './settings'
import proxies from './proxies'
import tasks from './tasks'
import channels from './channels'
import streams from './streams'
import user from './user'
import games from './games'
import games_statistics from './games_statistics'

const reducers = {
	routing: routerReducer,
	settings,
	proxies,
	tasks,
	channels,
	streams,
	user,
	games,
	games_statistics
};

module.exports = combineReducers(reducers);
