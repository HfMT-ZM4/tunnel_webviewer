const fs = require('fs');

let obj = {};

for( let i = 0; i < 144; i++ )
{
    let idx = i+1;
    obj["/"+idx] = {
        key: 'svg',
        val: {
            new: 'text',
            text: `${idx}`,
            x: 200,
            y: 200,
            "font-size": 120
        }
    };
}

fs.writeFile(__dirname + '/ID-test.json', JSON.stringify(obj), function(err) {
    if(err) {
        return console.log(err);
    }
});