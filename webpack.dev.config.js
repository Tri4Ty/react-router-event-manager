const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const core = require('./webpack.core.config');

module.exports = merge(core, {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        'react-router-event-manager': './dev/src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    'style-loader', // 3. inject styles into DOM
                    'css-loader',   // 2. turn css into commonjs
                    'sass-loader'   // 1. turn sass into css
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Router Event Manager - Demo',
            template: './index_template.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // webpack logging level while bundling
        // stats: 'normal',

        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting
        clientLogLevel: 'none',
        // Enable gzip compression of generated files
        compress: true,
        // where to pull the source from
        contentBase: './dist',
        // enable hot module replacement
        hot: true,
        // launce a browser by default on start up
        open: 'chrome'
    }
});