import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

// Derive __dirname from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/app.js', // Your entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    module: true, // Output as ES module
  },
  experiments: {
    outputModule: true, // Enable output as ES module
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            // Options for html-loader
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['url-loader'],
      },
    ],

  },
  resolve: {
    alias: {
      path: 'path-browserify',
      crypto: false,
      buffer: 'buffer',
      process: 'process/browser',
      timers: 'timers-browserify',
      util: 'util',
      assert: 'assert',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      fs: false, // Ignore 'fs' module
      url: 'url',
      'vm-browserify': 'vm-browserify',
      os: 'os',
      http: false,
      querystring: 'querystring',
      net: false, // Ignore 'net' module
      dns: false,
      tls: false,
      timersPromises: false, // Add this line to ignore timers/promises
      child_process: false, // Ignore 'child_process' module
      'nock': false, // Ignore 'nock' module
      'mock-aws-s3': false, // Ignore 'mock-aws-s3' module
      'aws-sdk': false, // Ignore 'aws-sdk' module
      'json-loader': false,
      async_hooks: false, // Add this line to ignore async_hooks
      vm: false, // Ignore vm module,
      npm: false, // Ignore vm module
      'node-gyp': false, // Exclude node-gyp
    },
    fallback: {
      path: 'path-browserify',
      crypto: false,
      buffer: 'buffer',
      process: 'process/browser',
      timers: 'timers-browserify',
      util: 'util',
      assert: 'assert',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      fs: false, // Ignore 'fs' module
      url: 'url',
      'vm-browserify': 'vm-browserify',
      os: 'os',
      http: false,
      querystring: 'querystring',
      net: false, // Ignore 'net' module
      dns: false,
      tls: false,
      timersPromises: false, // Add this line to ignore timers/promises
      child_process: false, // Ignore 'child_process' module
      'nock': false, // Ignore 'nock' module
      'mock-aws-s3': false, // Ignore 'mock-aws-s3' module
      'aws-sdk': false, // Ignore 'aws-sdk' module
      'json-loader': false,
      async_hooks: false, // Add this line to ignore async_hooks
      vm: false, // Ignore vm module
      npm: false, // Ignore vm module
      'node-gyp': false, // Exclude node-gyp
    },
    extensions: ['.js'],
  },
  externals: [
    'mongodb', // Exclude mongodb from the bundle
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MONGODB_URI: JSON.stringify(process.env.MONGODB_URI),
      },
    }),
  ],
};
