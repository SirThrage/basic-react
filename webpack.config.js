const path = require( 'path' );

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?/i,
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new FriendlyErrorsWebpackPlugin()
  ],
  devServer: {
    quiet: true,
  },
  resolve: {
    alias: {
      Components: path.resolve( __dirname, 'src/Components' ),
      styles: path.resolve( __dirname, 'src/Styles/index.scss' ),
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