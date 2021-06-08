const got = require('got');
const fs = require('fs/promises');

(async () => {
  try {
    const response = await got('https://impfterminservice-kvwl.service-now.com/');
    const currentBody = response.body
    const previousBody = await fs.readFile('current.html', 'utf-8');

    if (currentBody === previousBody) {
      process.exit(1);
    } else {
      await fs.writeFile('current.html', currentBody);
    }
  } catch (error) {
    console.error(error, error.message);
  }
})();
