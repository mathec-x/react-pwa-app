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

if (!fs.existsSync(publicdir + "/icons")) {
    fs.mkdirSync(publicdir + "/icons/favicon.ico");
}

if (!fs.existsSync(publicdir + "/icons/favicon.ico")) {
    fs.copyFileSync(currentdir + "/icons/favicon.ico", publicdir + "/icons/favicon.ico");
}

if (!fs.existsSync(publicdir + "/icons/logo192.png")) {
    fs.copyFileSync(currentdir + "/icons/logo192.png", publicdir + "/icons/logo192.png");
}

if (!fs.existsSync(publicdir + "/icons/logo512.png")) {
    fs.copyFileSync(currentdir + "/icons/logo512.png", publicdir + "/icons/logo512.png");
}