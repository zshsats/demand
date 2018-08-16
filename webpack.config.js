const path = require('path');
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
function resolve(relatedPath) {
    return path.join(__dirname, relatedPath);
}
module.exports = {
    entry : {
        "main":"./src/main.js"
    },
    output: {
        filename:'[name].js',
        chunkFilename: 'js/[name].js',
        path:path.resolve(__dirname,"dist")
    },
    module:{
        rules: [
            {
                test: /\.html$/,
                loaders: ['raw-loader'],
                exclude: /node_modules/
            },
            {//引入less
                test: /main\.less$/,
                loaders: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: true
                        }
                    }
                ]
            },
            { test: /iview.src.*?js$/, loader: 'babel-loader' },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.less$/,
                exclude: /main\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','less-loader?sourceMap']
                })
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.(woff?|eot|ttf|otf|svg|woff2)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },

        ]
    },
    plugins:[
        new ExtractTextPlugin({
            filename: 'main.css',
            ignoreOrder: true
        }),
        new VueLoaderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new htmlWebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            favicon:'./src/favicon.png' //favicon路径
        }),
        new CopyWebpackPlugin([
            {from:"./src/assets",to:"assets"},
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
            'assets':resolve('./src/assets'),
            'src':resolve('./src'),
        },
        extensions: ['.js', '.vue','.css'],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 1999,
        inline: true,//实时刷新
        hot: true//自动刷新
    },

}