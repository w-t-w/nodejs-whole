const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), './project/list/backend/source/static');

const webpack_config = {
    target: 'web',
    devtool: 'cheap-module-source-map',
    mode: 'production',
    entry: {
        web_index: './project/list/frontend/page/index.js'
    },
    output: {
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: OUTPUT_DIR,
        library: {
            type: 'umd'
        }
    },
    stats: {
        preset: 'minimal'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }]
    }
};

module.exports = webpack_config;