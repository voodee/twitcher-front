module.exports = {
  path: 'proxies',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/Proxies').default);
    });
  }
};
