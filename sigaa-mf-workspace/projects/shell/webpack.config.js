const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    mfUser: 'http://localhost:4201/remoteEntry.js',
    mfAuth: 'http://localhost:4202/remoteEntry.js',
    mfAccessControl: 'http://localhost:4203/remoteEntry.js',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});
