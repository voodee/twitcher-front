import axios from 'axios'
import { Map, List, fromJS } from 'immutable'

import { clearToken } from 'reducers/user'
export const SET_ITEMS = 'GAMES_STATISTICS@SET_ITEMS'

const initialState = Map({
	items   : Map({}),
	isLoaded: false
});

export default (state = initialState, action) => {
	const { payload } = action;

	switch (action.type) {

		case SET_ITEMS:
			return state
				.set('items', fromJS(payload.items))
				.set('isLoaded', true)

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
	const { settings, user, games, games_statistics } = getState();

	if (games_statistics.get('isLoaded')) return;

	return axios.get(
		`${settings.api.host}twitch/games_statistics.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {

			const statistics = data.reduce((statistics, item) => {
				statistics[item.id] = item
				statistics['game_name'] = games.get(item.game_id)
				return statistics
			}, {})

			dispatch( setItems(statistics) )
		})
		.catch(error => {
			if (error.response.status === 401) {
				dispatch( clearToken() )
			}
			console.log('error', error)
		})
}
