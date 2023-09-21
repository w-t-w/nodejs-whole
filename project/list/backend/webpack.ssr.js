const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, './build');

const ssr_config = {
    devtool: 'cheap-module-source-map',
    mode: 'production',
    target: 'node',
    entry: {
        ssr_index: './project/list/backend/page/index.js'
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

module.exports = ssr_config;