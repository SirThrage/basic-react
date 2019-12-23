const path = require( 'path' );

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.s?css/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif)/i,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.svg$/i,
        use: {
          loader: 'svg-inline-loader',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './public',
        to: './public',
        ignore: [
          'index.html',
          'favicon.ico',
        ]
      }
    ]),
  ],
  devServer: {
    quiet: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      Components: path.resolve( __dirname, 'src/Components' ),
      Styles: path.resolve( __dirname, 'src/Styles' ),
    }
  },
  output: {
    filename: '[hash].bundle.js',
    path: path.resolve( __dirname, 'dist' )
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
}