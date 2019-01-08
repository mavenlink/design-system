module.exports = function (api) { // eslint-disable-line import/no-commonjs
  api.cache(true);

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: [
            'IE 11',
            'last 5 Chrome versions',
            'last 5 Edge versions',
            'last 5 Firefox versions',
            'last 5 Opera versions',
            'last 5 Safari versions',
          ],
        },
      ],
    ],
  };
};
