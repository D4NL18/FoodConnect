const fs = require('fs');

const path = './src/data/mockData.js';
let content = fs.readFileSync(path, 'utf8');

// Function to generate handle from name
function generateHandle(name) {
  return '@' + name.split(' - ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
}

// simple regex base approach
content = content.replace(/(name:\s*['"](.*?)['"],\s*)(location:)/g, (match, p1, p2, p3) => {
  const handle = generateHandle(p2);
  return p1 + `handle: '${handle}',\n    ` + p3;
});

fs.writeFileSync(path, content, 'utf8');
console.log('handles added to mockData.js');
