var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + '/client/src',
    entry: {
        app: './js/app.js',
        // styles: './styles/main.css'
    },
    output: {
        path: __dirname + '/client/dist',
        filename: "[name].js",
        library: "[name]"
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.sass', '.css']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
    //         {
    //             test: /\.vue$/,
    //             loader: 'vue'
    //   },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
},
            {
                test: /\.js$/,
                loader: 'babel?presets[]=es2015',
      },
            {
                test: /\.json$/,
                loader: 'json'
      },
    //         {
    //             test: /\.html$/,
    //             loader: 'vue-html'
    //   },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
      },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]'
}
    ]
    },
    devtool: '#source-map',
    plugins: [
    new ExtractTextPlugin("app.css")
 ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
    new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    new webpack.optimize.OccurenceOrderPlugin()
]);
}
