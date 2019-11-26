/**
 * Created by Администратор on 15.07.2016.
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = path.resolve(__dirname, './public');

module.exports = {
    mode: 'development',
    devtool: 'source-map',

    entry: {
        popup: './src/popup/index.js',
        background: './src/background.js',
        options: './src/options/index.js'
    },
    output: {
        publicPath: '/',
        path: publicPath,
        filename: 'js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-export-default-from"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        }
                    },
                    {// translates CSS into CommonJS
                        loader: 'css-loader',
                        options: {
                            //importLoaders: 1,
                            //minimize: true
                        }
                    },
                ]
            },
            {test: /\.(woff2?|svg)/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'},
            {test: /\.(ttf|eot)/, loader: 'file-loader?name=fonts/[name].[ext]'},
            {test: /\.(png|jpg)/, loader: "file-loader?name=images/[name].[ext]"},
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            chunks: ['popup'],
            filename: 'popup.html',
            template: 'src/popup/index.html',
            minify: false
        }),
        new HtmlWebpackPlugin({
            chunks: ['options'],
            filename: 'options.html',
            template: 'src/options/index.html',
            minify: false
        }),
        new CopyWebpackPlugin([
             {from: 'src/config.js', to: './'},
             {from: 'src/images', to: './images'},
             {from: 'src/end.js', to: "./js"},
             {from: 'src/manifest.json', to: "./"},
        ]),
    ],
    watch: true,
};


