const routes = [].concat(
  require('./albumRouter'),
  require('./songRouter'),
  require('./userRouter'),
  require('./authRouter')
);

module.exports = {
  plugin: {
    name: 'router',
    register: (server) => {
      server.route(routes);
    },
  },
};
