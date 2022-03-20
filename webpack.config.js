const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const simulation_target = {
    target: "node",
    entry: "./src/main.ts",
    devtool: "inline-source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                // exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: [
            "node_modules"
        ]
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Ovi.sh",
            template: "./src/index.html",
            // favicon: "./res/coin.ico",
            inject: "body"
        }),
        new CopyPlugin({
            patterns:
                [{ from: "src/styles.css", to: "styles.css" }]
        })
    ]
};

module.exports = [simulation_target];