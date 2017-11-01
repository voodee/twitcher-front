import axios from 'axios'
import { Map, List, fromJS } from 'immutable'

import { clearToken } from 'reducers/user'
import { loadItems as loadGamesStatistics } from 'reducers/games_statistics'
export const SET_ITEMS = 'GAMES@SET_ITEMS'

const initialState = Map({
	items   : Map({}),
	isLoaded: false
})

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
	const { settings, user, games } = getState();

	if (games.get('isLoaded')) return;

	return axios.get(
		`${settings.api.host}twitch/games.json`,
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		}
	)
		.then( ({ data }) => {

			const games = data.reduce((games, game) => {
				games[game._id] = game
				return games
			}, {})

			dispatch( setItems(games) )
			//dispatch( loadGamesStatistics() )
		})
		.catch(error => {
			if (error.response.status === 401) {
				dispatch( clearToken() )
			}
			console.log('error', error)
		})
}
