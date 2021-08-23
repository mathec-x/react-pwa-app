const glob = require('glob');
const fs = require('fs');
// +(css|js|html|png|jpeg|jpg|svg)
// !(json|txt)
const cacheArray = ['/'];

function makeHash(length) {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random()
      * charactersLength)));
  }
  return result.join('');
}

function makeScript() {
  const version = makeHash(10);
  const swScript = fs.readFileSync('./public/service-worker.js').toString();

  function makeFile() {
    console.log(`generated ${cacheArray.length} files to cache in ${version}`);

    const modSwScript = swScript
      .replace("['/', '/styles/styles.css', '/script/webpack-bundle.js']", JSON.stringify(cacheArray, null, 2))
      .replace('@cacheName', version)
      .toString();

    fs.writeFileSync('./build/service-worker.js', modSwScript);
  }

  if (glob) {
    return glob('build/**/*.+(css|js|html|png|jpeg|jpg|svg)', (_, res) => {
    // eslint-disable-next-line no-restricted-syntax
      for (const file of res) {
        cacheArray.push(file.replace('build/', '/'));
      }
      return makeFile();
    });
  }

  return makeFile();
}

makeScript();
