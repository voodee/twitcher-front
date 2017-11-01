const autorize = (nextState, replaceState) => {
	// console.log('autorize', nextState, replaceState)
}

export default {
	path: 'app',
	onChange: autorize,
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				require('./routes/dashboard'),
				require('./routes/settings'),
				require('./routes/ratings'),


				require('./routes/charts'),
				require('./routes/ecommerce'),
				require('./routes/forms'),
				require('./routes/pageLayouts'),
				require('./routes/pages'),
				require('./routes/tables'),
				require('./routes/ui'),
			]);
		});
	},
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./components/MainApp').default);
		});
	}
};
