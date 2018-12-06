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
        },
      ],
    ],
  };
};
