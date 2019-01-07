module.exports = function (api) { // eslint-disable-line import/no-commonjs
  api.cache(true);

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: {
            node: true,
          },
          include: [
            // Cypress uses Electron to run tests headlessly on CI. Unfortunately, Electron does
            // not understand object rest spread, which is why we explicitly transform it here.
            'proposal-object-rest-spread',
          ],
        },
      ],
    ],
  };
};
