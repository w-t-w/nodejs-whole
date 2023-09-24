const fs = require('fs');
const path = require('path');

const run = require('./run');

const PORT = 3000;

const TEMPLATE_DIR = path.resolve(process.cwd(), './framework/config/play/template.html');

(async () => {
    const data_config = require('../config/play/data_config');

    const content = await new Promise((resolve, reject) => {
        fs.readFile(TEMPLATE_DIR, 'utf-8', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });

    run({
        ['/play']: {
            data_config,
            template: {
                name: TEMPLATE_DIR,
                content
            }
        }
    }).listen(PORT, () => {
        console.log(`The play page is running at http://localhost:${PORT}!`);
    });
})();