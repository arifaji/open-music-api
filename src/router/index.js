const routes = [].concat(require('./albumRouter'), require('./songRouter'));

module.exports = {
  plugin: {
    name: 'router',
    register: (server) => {
      server.route(routes);
    },
  },
};
