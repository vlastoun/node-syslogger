/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  webpack: (config, options, webpack) => {
    // Perform customizations to config
    // Important: return the modified config

    // changes the name of the entry point from index -> main.js
    config.entry.main = ['./src/index.ts'];

    config.resolve = {
      extensions: ['.ts', '.js', '.json'],
    };

    config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader',
    });

    config.output.path = path.join(process.cwd(), 'lib');

    config.target = 'node'; // in order to ignore built-in modules like path, fs, etc.
    config.externals = [nodeExternals()];

    return config;
  },
};
