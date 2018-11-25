const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

var config = {
    output: {
        path: path.resolve(__dirname + '/dist/'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: __dirname,
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue',
            },
            {
                test: /\.css$/,
                loader: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            mangle: true,
            compress: {
                warnings: false
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
