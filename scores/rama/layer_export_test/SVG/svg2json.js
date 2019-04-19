const fs = require('fs');
const convert = require('xml-js');
 
function styleStr2obj(style_)
{
    let ret = {};
    let tok = style_.split(';');
    tok.forEach(element => {
        let keyval = element.split(':');
        ret[ keyval[0] ] = keyval[1];
    });
    
    return ret;
}

function iterElements(el_array)
{
    return el_array.map( (n, i, ar) => {
        let obj_ = {};
        if( n.hasOwnProperty('name') )
            obj_.new = n.name;
        
        if( n.hasOwnProperty('attributes') )
        {
            for( let k in n.attributes )
            {
                obj_[k] = ( k == "style" ) ? styleStr2obj(n.attributes[k]) : n.attributes[k];
            }
        }

        if( n.hasOwnProperty('elements') )
            obj_.child = iterElements(n.elements);

        return obj_;

    });
}



let svgFile = fs.readFileSync(__dirname + '/Layer_1_vln.svg', 'utf8');

let doc = convert.xml2js(svgFile, {
    ignoreComment: true, 
    compact: false
});

fs.writeFile(__dirname + '/svg2json-test.json', JSON.stringify(doc), function(err) {
    if(err) {
        return console.log(err);
    }
});

for( let e of doc.elements )
{
    if( e.type == "element" && e.name == "svg" && e.elements )
    {
        let drawsocketJSON = iterElements(e.elements);

        
    }
}



/*

fs.writeFile(__dirname + '/Layer_1_vln2.json', JSON.stringify(result), function(err) {
    if(err) {
        return console.log(err);
    }
});
*/

/*


var parser = new xml2js.Parser({preserveChildrenOrder:true, explicitChildren:true});
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

*/