const webpack = require('webpack');	
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'admin', 'controllers', 'comp.js'),
  output: {
    path: path.join(__dirname, 'admin/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      //test: path.join(__dirname, 'admin'),
      loader: ['babel-loader']
     
    }]
  }
}