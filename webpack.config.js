var
    path = require('path'),
    webpack = require('webpack'),
    // cssUtils = require('./css-utils'),
    // env = require('./env-utils'),
    // HtmlWebpackPlugin = require('html-webpack-plugin'),
    projectRoot = __dirname + '../';
// projectRoot = path.resolve(__dirname, '../');
// entry = './js/main.js';
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: '#eval-source-map',
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    context: __dirname + '/client/src',
    entry: {
        app: './js/main.js',
        vendor: [
        "socket.io-client",
        "vue",
        "vue-router",
        "keyboardjs",
        "nipplejs",
        "hammerjs",
        "vue-slider-component"
    ]
    },
    output: {
        path: __dirname + '/client/dist',
        publicPath: '/',
        filename: '[name].js',
        library: '[name]'
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css'],
        modules: [
      path.join(__dirname, '../'),
      'node_modules'
    ],
        // alias: {
        //   assets: path.resolve(__dirname, '../dev/assets'),
        //   components: path.resolve(__dirname, '../dev/components'),
        //   data: path.resolve(__dirname, '../dev/data')
        // }
    },
    module: {
        rules: [
            { // eslint
                enforce: 'pre',
                test: /\.(vue|js)$/,
                loader: 'eslint-loader',
                include: projectRoot,
                exclude: /node_modules/
      },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                exclude: /node_modules/
      },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    //   postcss: cssUtils.postcss,
                    loaders: merge({
                            js: 'babel-loader'
                        }
                        // cssUtils.styleLoaders({sourceMap: true})
                    )
                }
      },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader',
            }],
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        },
            }, {
                        loader: 'sass-loader',
            }],
                })
                // loader: ExtractTextPlugin.extract(
                //     'style', // The backup style loader
                //     'css?sourceMap!sass?sourceMap'
                // )
      },
    //         {
    //             test: /\.svg$/,
    //             loader: 'raw'
    //   },
            {
                test: /\.json$/,
                loader: 'json-loader'
      },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
      },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
      }
    ]
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"development"'
    //   },
    //   '__THEME': '"' + env.platform.theme + '"'
    // }),
    new webpack.NoEmitOnErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'dev/index.html',
    //   inject: true
    // }),
    new webpack.LoaderOptionsPlugin({
            options: {
                context: path.resolve(__dirname, '../src'),
                //     eslint: {
                //       formatter: require('eslint-friendly-formatter')
                //     },
                //     // postcss: cssUtils.postcss
            }
        }),
    new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        }),
    new ExtractTextPlugin({
            filename: 'index.css',
            disable: false,
            allChunks: true
        }),
  ],
    performance: {
        hints: false
    }
};
