const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, './build');

const component_config = {
    devtool: 'cheap-module-source-map',
    mode: 'production',
    target: 'web',
    entry: {
        component_index: './project/list/component/page/index.js'
    },
    output: {
        publicPath: '',
        path: OUTPUT_DIR,
        filename: '[name].js',
        chunkFilename: '[name].js',
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

module.exports = component_config;