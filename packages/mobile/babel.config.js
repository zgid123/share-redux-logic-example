module.exports = function (api) {
  api.cache(true);

  let inlineDotEnvPath = '.env';

  if (process.env.BUILD_ENV === 'production') {
    inlineDotEnvPath = '.env.production';
  } else if (process.env.BUILD_ENV === 'staging') {
    inlineDotEnvPath = '.env.staging';
  }

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'inline-dotenv',
        {
          path: inlineDotEnvPath,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
