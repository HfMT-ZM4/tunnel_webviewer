const fs = require('fs');

const file = fs.readFileSync(__dirname +  '/longlong-performance.json', 'utf8');

let json = JSON.parse(file);
json["/141"] = json["/105"];

fs.writeFileSync( __dirname+'/longlong-performance_.json', JSON.stringify(json) );

