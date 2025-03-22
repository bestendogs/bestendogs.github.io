const fs = require('fs');
const { create } = require('xmlbuilder2');

const data = require('../image-data.js'); // Adjust the path as necessary

const rss = create({ version: '1.0' })
  .ele('rss', { version: '2.0' })
  .ele('channel')
    .ele('title').txt('Dog Images Feed').up()
    .ele('link').txt(`${data.root}/rss.xml`).up()
    .ele('description').txt('Latest dog images').up();
data.images.forEach(image => {
  const imageLink = `${data.root}/${image.dogId}.jpg`;
  rss.ele('item')
    .ele('title').txt(`Dog Image ${image.id}`).up()
    .ele('link').txt(imageLink).up()
    .ele('content').txt(`<img src="${imageLink}" alt="${image.alt}" />`).up()
    .ele('description').txt(image.alt).up()
    .ele('guid').txt(image.dogId).up()
    .ele('pubDate').txt(new Date().toUTCString()).up()
    .up();
});

fs.writeFileSync('rss.xml', rss.end({ prettyPrint: true }));
console.log('RSS feed updated!');