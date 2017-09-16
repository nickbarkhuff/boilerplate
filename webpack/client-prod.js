// Config
const babelSettings = require("./babel");
const autoprefixerSettings = require("./autoprefixer");

// Dependencies
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Webpack
module.exports = {
    entry: "./client/index.js",
    output: {
        path: process.cwd() + "/dist/client",
        filename: "index.js",
        publicPath: "/"
    },
    devtool: "source-map",
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
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
                })
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
            minify: {collapseWhitespace: true},
            hash: true
        }),
        new ExtractTextPlugin("index.css")
    ]
};
