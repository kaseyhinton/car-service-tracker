module.exports = {
  staticFileGlobs: ['manifest.json', 'node_modules/babel-polyfill/dist/polyfill.min.js', 'src/**/*', 'images/**.*'],
  navigateFallback: 'index.html',
  navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest',
    },
    {
      urlPattern: /.*\.(png|jpg|gif|svg)/i,
      handler: 'fastest',
      options: {
        cache: {
          maxEntries: 200,
          name: 'data-images-cache',
        },
      },
    },
  ],
  verbose: true,
};
