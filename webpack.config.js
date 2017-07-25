const webpack = require('webpack');	
const path = require('path');

module.exports = {
  entry: 
      {modal: path.join(__dirname, 'admin', 'components', 'index.js')
      },
  output: {
    path: path.join(__dirname, 'admin/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      loader: ['babel-loader']
     
    }]
  }
}