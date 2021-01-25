const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = (env, argv) => {
    const MODE = argv.mode || 'none';
    return {
        mode: MODE,
        entry: './src/index.js',
        devtool: MODE === 'development' ? 'eval-source-map' : undefined,
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                title: 'Movie finder',
                hash: true,
                template: './src/index.html'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            pathinfo: true,
            filename: '[name].js'
        },
        devServer: {
            contentBase: './dist',
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MODE === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        },
    }
};
