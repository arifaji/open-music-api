const routes = [].concat(
  require('./albumRouter'),
  require('./songRouter'),
  require('./userRouter'),
  require('./authRouter'),
  require('./playlistRouter')
);

module.exports = {
  plugin: {
    name: 'router',
    register: (server) => {
      server.route(routes);
    },
  },
};
