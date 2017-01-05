const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: '../portamento-server/public',
        filename: 'build.js'
    },

    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin([{from: './images', to: 'images'}],
        {copyUnmodified: true}
        )],

    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.scss$/,
            // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            loader: 'style!css-loader'
        }]
    }
    // sassLoader: {
    //     includePaths: ['./src/scss/partials']
    // }
};