const { create } = require('xmlbuilder2');
const fs = require('fs');
const data = require('../image-data.js');

const rss = create({ version: '1.0' })
  .ele('rss', { 
    version: '2.0', 
    'xmlns:content': 'http://purl.org/rss/1.0/modules/content/'
  })
  .ele('channel')
    .ele('title').txt('Dog Images Feed').up()
    .ele('link').txt(`https://bestendogs.rip/rss.xml`).up()
    .ele('description').txt('Latest dog images').up();

data.images.forEach(image => {
  const imageLink = `${data.root}/${image.dogId}.jpg`;
  rss.ele('item')
    .ele('title').txt(`Dog Image ${image.id}`).up()
    .ele('link').txt(imageLink).up()
    .ele('guid', { isPermaLink: 'false' }).txt(image.dogId).up()
    .ele('description').txt(image.alt).up()
    .ele('content:encoded').txt(`<![CDATA[<img src="${imageLink}" alt="${image.alt}" />]]>`).up()
    .ele('pubDate').txt(new Date().toUTCString()).up()
    .up();
});

fs.writeFileSync('rss.xml', rss.end({ prettyPrint: true }));
console.log('RSS feed updated!');