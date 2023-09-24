const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const MFS = require('memory-fs');


const CONFIG_DIR = path.resolve(process.cwd(), './framework/config');
const SOURCE_DIR = path.resolve(__dirname, './source');

function upload(config_name, data_config, template) {
    const CONFIG_PATH_DIR = path.resolve(CONFIG_DIR, config_name);

    rimraf.sync(CONFIG_DIR);
    mkdirp.sync(CONFIG_PATH_DIR);

    fs.createReadStream(path.resolve(SOURCE_DIR, template['path']), 'utf-8')
        .pipe(fs.createWriteStream(path.resolve(CONFIG_PATH_DIR, template['name'])));

    const compiler = webpack({
        mode: 'development',
        devtool: false,
        target: 'node',
        entry: {
            [data_config['name']]: path.resolve(SOURCE_DIR, data_config['path'])
        },
        output: {
            publicPath: '',
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: `/${config_name}`,
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
    });

    const mfs = new MFS();

    compiler.outputFileSystem = mfs;

    compiler.run(() => {
        const content = mfs.readFileSync(`/${config_name}/${data_config['name']}.js`, 'utf-8');
        fs.writeFileSync(path.resolve(CONFIG_DIR, `${config_name}/${data_config['name']}.js`), content, 'utf-8');
    });
}

module.exports = upload;