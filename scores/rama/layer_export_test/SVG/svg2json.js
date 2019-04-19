var fs = require('fs'),
    xml2js = require('xml2js');
 
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/Layer_1_vln.svg', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log('Done');

        fs.writeFile(__dirname + '/Layer_1_vln2.json', JSON.stringify(result), function(err) {
            if(err) {
                return console.log(err);
            }
        });

    });
});