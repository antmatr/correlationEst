const path = require('path');

module.exports = {
    entry: {
        main: [
            "./app/index.less",
            "./app/index.js",
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            // CSS/LESS and svg->fonts rules separated for prod and dev
            {
                test: /\.(png|gif|jpg|jpeg|ico|tiff)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]",
                            outputPath: "images2",
                            context: './assets/static/images',
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: [ {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                        outputPath: "fonts",
                        context: './assets/static/fonts',
                    }
                }]
            }
        ]
    }
};