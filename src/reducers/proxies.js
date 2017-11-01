import axios from 'axios'
import { Map, List, fromJS } from 'immutable'

import { clearToken } from 'reducers/user'
export const SET_ITEMS = 'PROXIES@SET_ITEMS'

const initialState = Map({
	items: List([])
});

export default (state = initialState, action) => {
	const { payload } = action;

	switch (action.type) {

		case SET_ITEMS:
			return state.set('items', fromJS(payload.items))

		default:
			return state
	}
}


export const setItems = items => ({
	type: SET_ITEMS,
	payload: {
		items
	}
})


export const loadItems = () => (dispatch, getState) => {
	const { settings, user } = getState();

	return axios.get(
		`${settings.api.host}proxies.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {
			dispatch( setItems(data) )
		})
		.catch(error => {
			if (error.response.status === 401) {
				dispatch( clearToken() )
			}
			console.log('error', error)
		})
}
