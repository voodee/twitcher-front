export default {
	path: 'channels',
	getComponent(nextState, cb) {
		require.ensure([], (require) => {
			cb(null, require('./containers').default);
		});
	}
};
