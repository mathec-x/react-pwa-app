// post-install.js

/**
 * Script to run after npm install
 *
 * Copy selected files to user's directory
 */

'use strict'

const fs = require('fs');
const path = require('path');


const publicdir = path.resolve(process.env.INIT_CWD, "public");
const currentdir = path.resolve(__dirname, "public");

if (!fs.existsSync(publicdir + "/manifest.webmanifest")) {
    fs.copyFileSync(currentdir + "/manifest.webmanifest", publicdir + "/manifest.webmanifest");
}

if (!fs.existsSync(publicdir + "/service-worker.js")) {
    fs.copyFileSync(currentdir + "/service-worker.js", publicdir + "/service-worker.js");
}
