module.exports = function (env, argv) {
  const environment = env && env.production ? 'production' : 'development';
  console.log('Building for ' + `*** ${environment.toUpperCase()} ***`);
  return {
    mode: environment,
    entry: './src/index.ts',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
    output: {
      path: __dirname + '/dist',
      filename: 'index.js',
      library: 'trace',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.ts'],
    },
  };
};
