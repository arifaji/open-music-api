const routes = [].concat(
  require('./albumRouter'),
  require('./songRouter'),
  require('./userRouter')
);

module.exports = {
  plugin: {
    name: 'router',
    register: (server) => {
      server.route(routes);
    },
  },
};
