import axios from 'axios'
import { Map, List, fromJS } from 'immutable'
import { createSelector } from 'reselect'
import { getViewers } from 'reducers/streams'
import API from 'services/api'

export const REQUEST_ITEM   = 'CHANNELS@REQUEST_ITEM'
export const SET_ITEM       = 'CHANNELS@SET_ITEM'

// export const LOAD_TOP_FOLLOWED  = 'CHANNELS@LOAD_TOP_FOLLOWED'
export const SET_TOP_FOLLOWED   = 'CHANNELS@SET_TOP_FOLLOWED'
// export const LOAD_TOP_VIEWED    = 'CHANNELS@LOAD_TOP_VIEWED'
export const SET_TOP_VIEWED     = 'CHANNELS@SET_TOP_VIEWED'
export const SET_TOP_VIEWERS    = 'CHANNELS@SET_TOP_VIEWERS'

export const SET_CHATTERS   = 'CHANNELS@SET_CHATTERS'
export const SET_HOURS      = 'CHANNELS@SET_HOURS'
export const SET_AVERAGE    = 'CHANNELS@SET_AVERAGE'
export const SET_VIDEOS     = 'CHANNELS@SET_VIDEOS'
export const SET_GAMES      = 'CHANNELS@SET_GAMES'
export const SET_STATISTICS = 'CHANNELS@SET_STATISTICS'

const initialState = Map({
	items       : Map({}),
	topFollowed : List([]),
	topViewed   : List([]),
	average     : Map({})
})


export default (state = initialState, action) => {
	const { payload } = action;

	switch (action.type) {

		case REQUEST_ITEM:
			return state
				.setIn(['items', payload.channelId.toString(), 'isFetching'], true)

		case SET_ITEM:
			return state
				.mergeIn(['items', payload.channelId.toString(), 'data'], fromJS(payload.item))
				.setIn(['items', payload.channelId.toString(), 'isFetching'], false)

		case SET_CHATTERS:
			return state
				.mergeIn(['items', payload.channelId.toString(), 'data', 'chatters'], fromJS(payload.chatters))

		case SET_HOURS:
			return state
				.mergeIn(['items', payload.channelId.toString(), 'data', 'hours'], fromJS(payload.hours))

		case SET_AVERAGE:
			return state
				.set('average', fromJS(payload.average))

		case SET_VIDEOS:
			return state
				.setIn(['items', payload.channelId.toString(), 'data', 'videos'], fromJS(payload.videos))

		case SET_GAMES:
			return state
				.setIn(['items', payload.channelId.toString(), 'data', 'games'], fromJS(payload.games))

		case SET_STATISTICS:
			return state
				.setIn(['items', payload.channelId.toString(), 'data', 'statistics'], fromJS(payload.statistics))

		case SET_TOP_FOLLOWED:
			return state
				.set('topFollowed', fromJS(payload.channels))

		case SET_TOP_VIEWED:
			return state
				.set('topViewed', fromJS(payload.channels))

		case SET_TOP_VIEWERS:
			return state
				.set('topViewers', fromJS(payload.channels))



		default:
			return state
	}
}


export const setItem = (channelId, item) => ({
	type: SET_ITEM,
	payload: {
		channelId,
		item
	}
})

export const setChatters = (channelId, chatters) => ({
	type: SET_CHATTERS,
	payload: {
		channelId,
		chatters
	}
})

export const setHours = (channelId, hours) => ({
	type: SET_HOURS,
	payload: {
		channelId,
		hours
	}
})

export const setAverage = average => ({
	type: SET_AVERAGE,
	payload: {
		average
	}
})

export const setVideos = (channelId, videos) => ({
	type: SET_VIDEOS,
	payload: {
		channelId,
		videos
	}
})

export const setGames = (channelId, games) => ({
	type: SET_GAMES,
	payload: {
		channelId,
		games
	}
})

export const setStatistics = (channelId, statistics) => ({
	type: SET_STATISTICS,
	payload: {
		channelId,
		statistics
	}
})

export const setTopFollowed = channels => ({
	type: SET_TOP_FOLLOWED,
	payload: {
		channels
	}
})

export const setTopViewed = channels => ({
	type: SET_TOP_VIEWED,
	payload: {
		channels
	}
})

export const setTopViewers = channels => ({
	type: SET_TOP_VIEWERS,
	payload: {
		channels
	}
})


export const loadHours = channelId => (dispatch, getState) => {
	const { settings, user } = getState()

	axios.get(
		`${settings.api.host}twitch/channels/${channelId}/hours.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {
			dispatch( setHours(channelId, data) )
		})
		.catch(error => {
			console.log('error', error)
		})
}

export const loadAverage = () => (dispatch, getState) => {
	const { settings, user } = getState()

	axios.get(
		`${settings.api.host}twitch/channels/average.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {
			dispatch( setAverage(data) )
		})
		.catch(error => {
			console.log('error', error)
		})
}

export const loadVideos = channelId => (dispatch, getState) => {
	const { settings, user } = getState()

	axios.get(
		`${settings.api.host}twitch/channels/${channelId}/videos.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {
			dispatch( setVideos(channelId, data) )
		})
		.catch(error => {
			console.log('error', error)
		})
}

export const loadGames = channelId => (dispatch, getState) => {
	const { settings, user } = getState()

	axios.get(
		`${settings.api.host}twitch/channels/${channelId}/games.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {
			dispatch( setGames(channelId, data) )
		})
		.catch(error => {
			console.log('error', error)
		})
}

export const loadStatistics = channelId => (dispatch, getState) => {

	API(getState())
		.get(`twitch/channels/${channelId}/statistics.json`)
		.then( ({ data }) => {
			dispatch( setStatistics(channelId, data) )
		})
		.catch(error => {
			console.log('error', error)
		})


}


export const loadItem = (channelId, channel)  => (dispatch, getState) => {
	const { settings, user } = getState()

	axios.get(
		`${settings.api.host}twitch/channels/${channelId}.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {
			dispatch( setItem(channelId, data) )
			dispatch( loadHours(channelId) )
			dispatch( loadVideos(channelId) )
			dispatch( loadGames(channelId) )
			dispatch( loadGames(channelId) )
			dispatch( loadStatistics(channelId) )
			dispatch( loadAverage() )
		})
		.catch(error => {
			console.log('setItem error', error)
		})


	axios.get(
		`${settings.api.host}twitch/chatters.json?channel=${channel}`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {
			dispatch( setChatters(channelId, data) )
		})
		.catch(error => {
			console.log('setItem error', error)
		})
}


export const loadTopFollowed = () => (dispatch, getState) => {
	const { settings, user } = getState()

	axios.get(
		`${settings.api.host}twitch/channels/top_followed.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {

			data.map( item => {
				dispatch( setItem(item._id, item) )
			})

			dispatch( setTopFollowed(data.map(item => item._id)) )
		})
		.catch(error => {
			console.log('error', error)
		})
}


export const loadTopViewed = () => (dispatch, getState) => {
	const { settings, user } = getState()

	axios.get(
		`${settings.api.host}twitch/channels/top_viewed.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {

			data.map( item => {
				dispatch( setItem(item._id, item) )
			})

			dispatch( setTopViewed(data.map(item => item._id)) )
		})
		.catch(error => {
			console.log('error', error)
		})
}


export const loadTopViewers = () => (dispatch, getState) => {

	API(getState()).get('twitch/channels/top_viewers.json')


}







export const getStatistics = createSelector(
	(state, channelId) => state.channels.getIn(['items', channelId, 'data', 'statistics']),
	statistics => {
		return statistics && statistics
			.sort( statistic => Date( statistic.get('created_at')) )
			.last()
	}
)

export const getHours = createSelector(
	(state, channelId) => state.channels.getIn(['items', channelId, 'data', 'hours']),
	hours => {
		return hours
	}
)

export const getGames = createSelector(
	(state, channelId) => state.channels.getIn(['items', channelId, 'data', 'games']),
	games => {
		return games
	}
)

export const getAverage = createSelector(
	state => state.channels.get('average'),
	average => average
)


export const getChattersCount = createSelector(
	(state, channelId) => state.channels.getIn(['items', channelId, 'data', 'chatters']),
	chatters => {
		return chatters && chatters.get('chatter_count')
	}
)

export const getViewsCount = createSelector(
	[getStatistics],
	statistic => {
		return statistic && statistic.get('views')
	}
)

export const getFollowersCount = createSelector(
	[getStatistics],
	statistic => {
		return statistic && statistic.get('followers')
	}
)

export const getVideos = createSelector(
	(state, channelId) => state.channels.getIn(['items', channelId, 'data', 'videos']),
	videos => videos || Map({})
)

export const getMetrics = createSelector(
	[getViewsCount, getViewers, getChattersCount, getFollowersCount, getVideos],
	(views, viewers, chatters, followers, videos) => {
		return Map({
			viewers,
			followers,
			views,
			chatters,
			videos: videos.size
		})
	}
)

export const getTopFollowedChannels = createSelector(
	state => state.channels.get('items'),
	state => state.channels.get('topFollowed'),
	(state, count = 15) => count,
	(channels, topFollowed, count) =>
		topFollowed.slice(0, count).map(channel_id => channels.getIn([`${channel_id}`, 'data']))

)

export const getTopViewedChannels = createSelector(
	state => state.channels.get('items'),
	state => state.channels.get('topViewed'),
	(state, count = 15) => count,
	(channels, topViewed, count) =>
		topViewed.slice(0, count).map(channel_id => channels.getIn([`${channel_id}`, 'data']))

)
