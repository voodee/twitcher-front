import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {applyRouterMiddleware, Router, Route, hashHistory, IndexRedirect, Redirect} from 'react-router'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(
	applyMiddleware(thunk, routerMiddleware(hashHistory))
));

const history = syncHistoryWithStore(hashHistory, store);

function scrollToTop() {
	window.scrollTo(0, 0);
}

const rootRoute = {
	childRoutes: [{
		path: '/',
		component: require('./containers/App'),
		indexRoute: {
			onEnter: (nextState, replace) => {
				replace('/app/dashboard')
			}
		},
		childRoutes: [
			require('./routes/app').default,
			require('./routes/404'),
			require('./routes/500'),
			require('./routes/confirmEmail'),
			require('./routes/forgotPassword'),
			require('./routes/login'),
			require('./routes/signUp'),
			require('./routes/fullscreen'),
			{
				path: '*',
				indexRoute: {onEnter: (nextState, replace) => replace('/404')},
			}
		]
	}]
};

render(
	<Provider store={store}>
		<Router
			onUpdate={scrollToTop}
			history={history}
			routes={rootRoute}
		/>
	</Provider>,
	document.getElementById('app-container')
);
