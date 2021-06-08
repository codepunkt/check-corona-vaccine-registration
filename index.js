const got = require('got');
const fs = require('fs/promises');

const cacheFile = 'content.html';

(async () => {
  try {
    const response = await got('https://impfterminservice-kvwl.service-now.com/');
    const currentBody = response.body
    const previousBody = await fs.readFile(cacheFile, 'utf-8');

    if (currentBody === previousBody) {
      process.exit(1);
    } else {
      await fs.writeFile(cacheFile, currentBody);
    }
  } catch (error) {
    console.error(error, error.message);
  }
})();
