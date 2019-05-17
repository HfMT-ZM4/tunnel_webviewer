const fs = require('fs');

let pngfile = fs.readFileSync(__dirname +  `/reduced/dekompressiongroup1-01_1.png`, 'base64');

let svgfile = `
    <svg id="svg" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <image xlink:href="data:image/png;base64,${pngfile}"/>
    </svg>
`;

fs.writeFile(__dirname + '/test.svg', svgfile, function(err) {
    if(err) {
        return console.log(err);
    }
});  
