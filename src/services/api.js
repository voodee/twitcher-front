import axios from 'axios'


const send = (instance, method = 'get', url) => instance[method](url)


export default ({ settings, user }) => {

	const instance = axios.create({
		baseURL: settings.api.host,
		// timeout: 1000,
		headers: {
			'X-USER-EMAIL': user.get('email'),
			'X-USER-TOKEN': user.get('token')
		}
	})

	return {
		get     : url => send(instance, 'get', url),
		post    : url => send(instance, 'post', url),
	}

}
