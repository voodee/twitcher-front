import { Map, List, fromJS } from 'immutable'
import axios from 'axios'

export const SET_TOKEN = 'USERS@SET_TOKEN'
export const CLEAR_TOKEN = 'USERS@CLEAR_TOKEN'

const initialState = Map({
	token: localStorage.token,
	email: localStorage.email
});

export default (state = initialState, action) => {
	const { payload } = action;

	switch (action.type) {

		case SET_TOKEN:
			return state
				.set('token', payload.token)
				.set('email', payload.email)

		case CLEAR_TOKEN:
			return state
				.set('token', null)
				.set('email', null)


		default:
			return state;
	}
}


export const setToken = (email, token) => {

	localStorage.setItem('email', email);
	localStorage.setItem('token', token);

	return {
		type: SET_TOKEN,
		payload: {
			email, token
		}
	}
}


export const clearToken = () => {

	localStorage.removeItem('email');
	localStorage.removeItem('token');

	return {
		type: CLEAR_TOKEN
	}
}


export const signOut = router => (dispatch, getState) => {
	const { settings, user } = getState();

	axios.delete(
		`${settings.api.host}sign_out.json`,
		{ },
		{
			headers: {
				'X-USER-EMAIL': user.get('email'),
				'X-USER-TOKEN': user.get('token')
			}
		})
		.then( response => {
			dispatch( clearToken() )
			router.push('/login')
		})
		.catch( e => {
			console.log('catch', e)
		})
}


export const signUp = (email, password, password_confirmation, invalidateForm, router) => (dispatch, getState) => {
	const { settings } = getState();

	axios.post(
		`${settings.api.host}sign_up.json`,
		{
			user: {
				email, password, password_confirmation
			}
		})
		.then( response => {
			dispatch( setToken(email, response.data.authentication_token) );
			router.push('/app/dashboard')
		})
		.catch( e => {
			invalidateForm(e.response.data)
			console.log('catch', e.response.data)
		})
}
