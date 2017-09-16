// Config
const babelSettings = require("./babel.js")

// Dependencies
const nodeExternals = require("webpack-node-externals");

// Weppack
module.exports = {
    entry: "./server/index.js",
    output: {
        path: process.cwd() + "/dist",
        filename: "server.js"
    },
    target: "node",
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: babelSettings
            }]
        }]
    },
    externals: [nodeExternals()]
};
