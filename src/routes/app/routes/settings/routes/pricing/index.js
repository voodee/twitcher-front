module.exports = {
	path: 'pricing',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./containers/index').default);
		});
	}
};
