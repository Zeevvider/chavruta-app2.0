// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            // app & common
            '@app': './app',
            '@others': './others',
            '@src': './src',

            // UI + theme + types (the important new ones)
            '@ui': 'ui',
            '@theme': 'src/styles/theme',
            '@types': 'src/types',
          },
          extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        },
      ],

      // IMPORTANT: must be last
      'react-native-reanimated/plugin',
    ],
  };
};
