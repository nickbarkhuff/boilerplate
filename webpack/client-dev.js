// Config
const config = require("../config");
const babelSettings = require("./babel");
const autoprefixerSettings = require("./autoprefixer");

// Dependencies
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Webpack
module.exports = {
    entry: "./client/index.js",
    output: {
        path: process.cwd() + "/dist/client",
        filename: "index.js",
        publicPath: "/"
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        port: 3000,
        contentBase: "dist/client",
        proxy: {"/api": `http://localhost:${config.port}`},
        historyApiFallback: true,
        disableHostCheck: true,
        host: "0"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: babelSettings
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [autoprefixer(autoprefixerSettings)],
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: ["client"],
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "client/template.html",
            favicon: "client/favicon.png",
            hash: true
        })
    ]
};
