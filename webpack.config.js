const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = {
    output: {
        path: path.resolve(__dirname + '/dist/'),
    },
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            sourceMap: false,
            parallel: 4,
            uglifyOptions: {
              warnings: false,
              compress: {
                warnings: false,
                comments: false
              },
            },
          })
        ],
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                loaders: {
                  'scss': 'vue-style-loader!css-loader!sass-loader'
                }
                // other vue-loader options go here
              },
            },
            {
            test: /\.css$/,
                loader: 'vue-style-loader!css-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                ie8: false,
                output: {
                    comments: false
                }
            }
        })
    ]
};

module.exports = [
    merge(config, {
        entry: path.resolve(__dirname + '/src/plugin.js'),
        output: {
            filename: 'v-router-transition.min.js',
            libraryTarget: 'window',
            library: 'VRouterTransition',
        }
    }),
    merge(config, {
        entry: path.resolve(__dirname + '/src/RouterTransition.vue'),
        output: {
            filename: 'v-router-transition.js',
            libraryTarget: 'umd',
            library: 'v-router-transition',
            umdNamedDefine: true
        }
    })
];


if (process.env.NODE_ENV === 'production') {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ])
  }