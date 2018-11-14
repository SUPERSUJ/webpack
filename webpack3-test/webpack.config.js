var webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // 配置入口
    entry: {
        about: './src/pages/about/about.js',
        contact: './src/pages/contact/contact.js',
        testjquery: './src/pages/testjquery/testjquery.js',
        torem: './src/pages/torem/torem.js',
        lessautofix: './src/pages/lessautofix/lessautofix.js'
    },
    // 配置出口
    output: {
        path: __dirname + "/dist/",
        filename: 'js/[name]-[hash:5].js',
        publicPath: '/',
    },

    module: {
        loaders: [
            //解析.js
            // {
            //     test: '/\.js$/',
            //     loader: 'babel',
            //     exclude: path.resolve(__dirname, 'node_modules'),
            //     include: path.resolve(__dirname, 'src'),
            //     query: {
            //         presets: ['es2015']
            //     }
            // },
            {
                test: '/\.js$/',
                loader: 'babel',
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
                query: {
                    presets: ['es2015']
                }
            },
            // css处理
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!px2rem-loader?remUni=10&remPrecision=5!postcss-loader'

            },
            // less处理
            {
                test: /\.less$/,
                // loader: 'style-loader!css-loader!less-loader'
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    { loader: 'px2rem-loader', options: { remUni: 10, remPrecision: 5 } },
                    { loader: "postcss-loader" },
                    { loader: "less-loader" }//less放在最后，因为要最先加载（loader从右往左加载的规则）
                ]
            },
            // 图片处理
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',

                query: {
                    name: 'assets/[name]-[hash:5].[ext]'
                },
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    plugins: [
        // 声明全局变量
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),

        // 提取文本插件
        new ExtractTextPlugin(__dirname + '/assert/css/common.less'),

        new UglifyJsPlugin(),//压缩js
        //压缩css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            filename: __dirname + '/dist/about.html',
            inject: 'head', //传递true或'body'所有javascript资源将被放置在body元素的底部。'head'将脚本放在head元素中
            template: 'html-withimg-loader!' + __dirname + "/src/pages/about/about.html",
            chunks: ['about'],
            inlineSource: '.(js|css)$',
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
            // title 用于生成的HTML文档的标题
            //  favicon 将给定的favicon路径添加到输出HTML
            // excludeChunks 允许您跳过一些块（例如，不添加单元测试块）
            // hash true然后，如果webpack为所有包含的脚本和CSS文件添加唯一的编译哈希。这对缓存清除非常有用
            // meta
        }),
        new HtmlWebpackPlugin({
            inject: 'head',
            filename: __dirname + '/dist/contact.html',
            template: __dirname + "/src/pages/contact/contact.html",
            chunks: ['contact'],
            inlineSource: '.(js|css)$',
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            filename: __dirname + '/dist/testjquery.html',
            template: __dirname + "/src/pages/testjquery/testjquery.html",
            chunks: ['testjquery'],
            inlineSource: '.(js|css)$',
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
        }),
        new HtmlWebpackPlugin({
            inject: 'head',
            filename: __dirname + '/dist/torem.html',
            template: __dirname + "/src/pages/torem/torem.html",
            chunks: ['torem'],
            inlineSource: '.(js|css)$',
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
        }),
        new HtmlWebpackPlugin({
            inject: 'head',
            filename: __dirname + '/dist/lessautofix.html',
            template: __dirname + "/src/pages/lessautofix/lessautofix.html",
            chunks: ['lessautofix'],
            inlineSource: '.(js|css)$',
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
        }),
        //设置每一次build之前先删除dist
        new CleanWebpackPlugin(
            ['dist/*', 'dist/*',],　     //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                dry: false        　　　　　　　　　　//启用删除文件
            }
        )
    ],
    // 起本地服务，我起的dist目录
    devServer: {
        contentBase: "./dist/",
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '192.168.0.105',//我的局域网ip
    }
}
