const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

console.log('ENV: ', process.env.NODE_ENV)

module.exports = {
  //mode: 'production',
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    //publicPath: '/js/'
  },
  devServer: {
    contentBase: false,
    compress: true,
    host: 'localhost',
    port: '8080'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        loader: "babel-loader",
        include: [ path.resolve(__dirname, "src") ], 
        exclude: [ path.resolve(__dirname, 'node_modules') ]
      },
      { 
        test: /\.pug$/, 
        loader: 'pug-plain-loader',
        include: [ path.resolve(__dirname, "src") ], 
        exclude: [ path.resolve(__dirname, 'node_modules') ]
      },
      { 
        test: /\.vue$/, 
        loader: "vue-loader",
        include: [ path.resolve(__dirname, "src") ], 
        exclude: [ path.resolve(__dirname, 'node_modules') ]
      }
    ]
  },
  plugins: [
    /*new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),*/
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new VueLoaderPlugin(),
    /*new UglifyJsPlugin({
      uglifyOptions: {
        output:{
          comments: false, // remove comments
        }
      }
    }),*/
    //new BundleAnalyzerPlugin()
  ]
}