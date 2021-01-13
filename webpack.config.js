const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: __dirname + "/src/index.js",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.html",
            inject: "body",
        }),
        new MiniCssExtractPlugin({
            filename: "/static/css/[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
    },
    devtool: "#sourcemap",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: ["babel-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "static/img/[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },
};
