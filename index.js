const got = require('got');
const fs = require('fs/promises');

const cacheFile = 'content.html';
//const siteToCheck = 'https://impfterminservice-kvwl.service-now.com/';
const siteToCheck = 'https://codepunkt.de/';

(async () => {
  try {
    const response = await got(siteToCheck);
    const currentBody = response.body
    const previousBody = await fs.readFile(cacheFile, 'utf-8');

    if (currentBody === previousBody) {
      console.log('nothing changed');
      process.exit(1);
    } else {
      await fs.writeFile(cacheFile, currentBody);
    }
  } catch (error) {
    console.error(error, error.message);
  }
})();
