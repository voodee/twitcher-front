import axios from 'axios'
import { Map, List, fromJS } from 'immutable'
import { createSelector } from 'reselect'


export const REQUEST_ITEM = 'STREAMS@REQUEST_ITEM'
export const SET_ITEMS = 'STREAMS@SET_ITEMS'

const initialState = Map({
	items   : Map({}),
	isFetching: false
})


export default (state = initialState, action) => {
	const { payload } = action;

	switch (action.type) {

		case REQUEST_ITEM:
			return state
				.set('isFetching', true)

		case SET_ITEMS:
			return state
				.set('items',
					state.get('items').mergeDeep( fromJS(payload.items) )
				)
				.set('isFetching', false)


		default:
			return state
	}
}


export const requestItem = channelId => ({
	type: REQUEST_ITEM,
	payload: {
		channelId: channelId
	}
})

export const setItems = items => ({
	type: SET_ITEMS,
	payload: {
		items
	}
})


export const loadItem = channelId  => (dispatch, getState) => {
	const { settings, user } = getState()

	dispatch( requestItem(channelId) )
	return axios.get(
		`${settings.api.host}twitch/channels/${channelId}/streams.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {

			const streams = data.reduce((streams, stream) => {
				streams[stream._id] = stream
				return streams
			}, {})

			dispatch( setItems(streams) )
		})
		.catch(error => {
			console.log('error', error)
		})
}


export const getStreamsByChannel = createSelector(
	state => state.streams.get('items'),
	(state, channelId) => channelId,
	(items, channelId) => {
		return items
			.filter( item => item.get('channel_id') == channelId )
			.sort( stream => Date( stream.get('start_at')) )
	}
)

export const getStreamByChannel = createSelector(
	[getStreamsByChannel],
	streams => {
		return streams
			.filter( item => !item.get('end_at') )
			.first()
	}
)

export const getStreamStatistics = createSelector(
	[getStreamByChannel],
	stream => {
		return stream && stream.get('statistics')
			.sort( statistics => Date( statistics.get('created_at')) )
			.last()
	}
)

export const getViewers = createSelector(
	[getStreamStatistics],
	statistics => {
		return statistics && statistics.get('viewers')
	}
)



