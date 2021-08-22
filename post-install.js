const fs = require('fs');
const path = require('path');

const PostInstall = async () => {
    const publicdir = path.resolve(process.env.INIT_CWD, "public");
    const currentdir = path.resolve(__dirname, "node_modules", "react-pwa-app", "public");

    if (!fs.existsSync(publicdir + "/manifest.webmanifest")){
        fs.copyFileSync(currentdir + "/manifest.webmanifest", publicdir + "/manifest.webmanifest");
    }

    if (!fs.existsSync(publicdir + "/service-worker.js")){
        fs.copyFileSync(currentdir + "/service-worker.js", publicdir + "/service-worker.js");
    }

}

PostInstall();