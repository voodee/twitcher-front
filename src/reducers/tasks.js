import axios from 'axios'
import { Map, List, fromJS } from 'immutable'

import { clearToken } from 'reducers/user'
import { loadItem as loadChannels } from 'reducers/channels'
import { loadItem as loadStreams } from 'reducers/streams'

export const SET_ITEMS = 'TASKS@SET_ITEMS'
export const REQUEST_ITEMS = 'TASKS@REQUEST_ITEMS'

export const REQUEST_ITEM = 'TASKS@REQUEST_ITEM'
export const REJECT_ITEM = 'TASKS@REJECT_ITEM'
export const SET_ITEM = 'TASKS@SET_ITEM'

const initialState = Map({
	items: Map(),
	loaded: false,
	isFetching: false
})


export default (state = initialState, action) => {
	const { payload } = action;
	let id;

	switch (action.type) {

		case SET_ITEMS:
			const items = payload.items.reduce(
				(items, item) => {
					items[item.id.toString()] = Object.assign(item, {
						isFetching: false,
						isError: false,
						errors: {}
					})
					return items
				}, {}
			);

			return state
				.set('items', fromJS(items))
				.set('loaded', true)
				.set('isFetching', false)

		case REQUEST_ITEMS:
			return state
				.set('isFetching', true)


		case REQUEST_ITEM:
			id = payload.id.toString()
			return state
				.setIn(['items', id, 'isFetching'], true)


		case SET_ITEM:
			id = payload.id.toString()
			return state
				.mergeIn(['items', id], fromJS(payload))
				.setIn(['items', id, 'isFetching'], false)
				.setIn(['items', id, 'errors'], {})


		case REJECT_ITEM:
			id = payload.id.toString()
			return state
				.setIn(['items', id, 'isFetching'], false)
				.setIn(['items', id, 'errors'], fromJS(payload.errors))


		default:
			return state
	}
}


export const requestItems = () => ({
	type: REQUEST_ITEMS
})

export const setItems = items => ({
	type: SET_ITEMS,
	payload: {
		items
	}
})


export const requestItem = id => ({
	type: REQUEST_ITEM,
	payload: {
		id
	}
})

export const setItem = item => ({
	type: SET_ITEM,
	payload: item
})

export const rejectItem = (id, errors) => ({
	type: REJECT_ITEM,
	payload: {
		id, errors
	}
})


export const loadItems = () => (dispatch, getState) => {
	const { settings, user, tasks } = getState()

	if ( tasks.get('loaded') || tasks.get('isFetching') ) return

	dispatch( requestItems() )
	return axios.get(
		`${settings.api.host}tasks.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {
			dispatch( setItems(data) )
			dispatch( loadChannels(data[0].channel_id, data[0].channel) )
			dispatch( loadStreams(data[0].channel_id) )
		})
		.catch(error => {
			if (error.response && error.response.status === 401) {
				dispatch( clearToken() )
			}
			console.error(error)
		})
}


export const updateTask = task => (dispatch, getState) => {
	const { settings, user } = getState()

	dispatch( requestItem(task.id) )
	return axios.put(
		`${settings.api.host}tasks/${task.id}`,
		{
			task
		},
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {
			dispatch( setItem(data) )
			console.log('DD', data)
			dispatch( loadChannels(data.channel_id) )
			dispatch( loadStreams(data.channel_id) )
		})
		.catch(error => {
			if (error.response.status === 401) {
				dispatch( clearToken() )
			} else {
				dispatch(
					rejectItem(task.id, error.response.data)
				)
			}
			console.log('error', error)
		})
}
