const fs = require('fs');

const path = './src/data/mockData.js';
let content = fs.readFileSync(path, 'utf8');

function generateHandle(name) {
  return '@' + name.split(' - ')[0].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '');
}

content = content.replace(/(name:\s*['"](.*?)['"],\s*)(location:)/g, (match, p1, p2, p3) => {
  const handle = generateHandle(p2);
  return p1 + `handle: '${handle}',\n    ` + p3;
});

fs.writeFileSync(path, content, 'utf8');
console.log('handles added to mockData.js');
