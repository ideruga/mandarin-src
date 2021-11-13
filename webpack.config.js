const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')

module.exports = {
    mode: "production",
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    esModule: false,
                    variable: 'data',
                    interpolate : '\\{\\{(.+?)\\}\\}',
                    evaluate : '\\[\\[(.+?)\\]\\]'
                }
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        library: 'mainLib',
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Chinese Practice'
        }),
        new webpack.ProvidePlugin({
            _: "underscore"
        }),
    ],
};
