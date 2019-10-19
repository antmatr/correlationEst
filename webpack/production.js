const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common.js');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    output: {
        path: path.resolve("./build/app"),
        filename: "index.js"
    },
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin({}) 
        ],
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [ require('autoprefixer') ],
                        }
                    },
                    {
                        loader: "less-loader", 
                        options: {
                            paths: [
                                path.resolve(__dirname, "../assets"),
                                path.resolve(__dirname, "../templates")
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.font\.(js|json)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'replace-loader',
                        options: {
                            flags: 'g',
                            regex: '\/icons\/',
                            sub: '\.\/icons\/'
                        }
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "webfonts-loader",
                        options: { fileName: 'icons/[fontname]-[hash].[ext]' }
                    }
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
        // new CopyWebpackPlugin(
        //     [
        //         {
        //             from: 'images',
        //             to: 'images',
        //         },
        //     ],
        //     {
        //         context: '../app/assets/static/',
        //         copyUnmodified: true,
        //     }
        // )
    ]
});