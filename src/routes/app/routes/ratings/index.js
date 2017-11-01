module.exports = {
	path: 'ratings',
	getChildRoutes(partialNextState, cb) {
		require.ensure([], (require) => {
			cb(null, [
				require('./routes/channels').default,
			]);
		});
	}
};
