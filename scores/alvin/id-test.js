const fs = require('fs');

const file = fs.readFileSync(__dirname +  '/underground-performance.json', 'utf8');

const json = JSON.parse(file);

Object.keys(json).forEach( k => {
    console.log( Number(k.slice(1)) % 12 );
    
});

