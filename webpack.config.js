const path = require('path'); 
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Dotenv = require('dotenv-webpack');

//plugins [... , new NodePolyfillPlugin()]

const buildPath = './build';
// const nodeExternals = require('webpack-node-externals');

/**
 * ,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV),
    }),
    new NodePolyfillPlugin()
 */
/**
 * 
  resolve: {
    fallback: {
      fs: require.resolve('fs'),
      net: require.resolve('net'), 
      util: require.resolve('util/')
    },
  },
 */
// externals: [nodeExternals()],

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, buildPath),
    filename: 'bundle.js'
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      title: 'WeatherApp',
      template: 'client/html/index.html',
      filename: 'index.html'
    }), 
    new Dotenv({
      path: './.env', // load this now instead of the ones in '.env'
      safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: false, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: false, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
      ignoreStub: false,
      prefix: 'process.env.' // reference your env variables as 'import.meta.env.ENV_VAR'.
    })
  ],
  
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }
    ]
  },
  mode: process.env.NODE_ENV,
  devServer: {
    static: {
      directory: path.resolve(__dirname, buildPath),
      publicPath: 'http://localhost:8080/'
    },
    compress: true,
    port: 8080, 
    proxy: {
      '/user': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  }  
}