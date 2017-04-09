export default () => {
  return new Promise((resolve) => {
    require.ensure([], () => {
      require('./styles.sass'); // eslint-disable-line global-require

      resolve({
        pulpy: require('./InputTextFactory'), // eslint-disable-line global-require
      });
    });
  });
};
