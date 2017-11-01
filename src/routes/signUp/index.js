module.exports = {
  path: 'sign-up',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./containers/SignUp').default);
    });
  }
};
