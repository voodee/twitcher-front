module.exports = {
  path: 'dashboard',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/Dashboard').default);
    });
  }
};
