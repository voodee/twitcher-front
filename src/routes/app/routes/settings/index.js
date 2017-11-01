module.exports = {
  path: 'setting',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/proxies'),
        require('./routes/pricing'),
      ]);
    });
  }
}
