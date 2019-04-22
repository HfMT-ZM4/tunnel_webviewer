const fs = require('fs');
const convert = require('xml-js');


const sys_w = 731.441;
const scale = 10;

let obj_id_incr = 0; // unique id tag for every element



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
    let ret = {
        child: [],
        offset: null
    };

    for( let i = 0; i < el_array.length; i++)
    {
        let n = el_array[i];

        let obj_ = {};
        if( n.hasOwnProperty('name') )
            obj_.new = n.name;

        if( n.hasOwnProperty('attributes') )
        {
            for( let k in n.attributes )
            {
                if( k == 'id' )
                { 
                    if( n.attributes[k].startsWith('spacer') )
                    {
                        ret.offset = n.attributes.y2;
                        obj_.id = n.attributes[k]+(obj_id_incr++);
                    }

                }
                else
                    obj_[k] = ( k == "style" ) ? styleStr2obj(n.attributes[k]) : n.attributes[k];
            }

        }

        if( n.hasOwnProperty('elements') )
        {
            if( obj_.new == "text" )
                obj_.text = n.elements[0].text;
            else
            {
                let child_offset = iterElements(n.elements);
                obj_.child = child_offset.child;

                if( child_offset.offset ){                    
                    let _x = (scale * sys_w * i);
                    let _y = -(scale * child_offset.offset);
                    obj_.transform =  `matrix(${scale},0,0,${scale},${_x},${_y})`;                                        
                }
                    

            }
        }

        ret.child.push( obj_ );
    }
    return ret;

}

let svgFile = fs.readFileSync(__dirname + '/Layer_1_vln.svg', 'utf8');

let doc = convert.xml2js(svgFile, {
    ignoreComment: true, 
    compact: false
});

fs.writeFile(__dirname + '/echoic-svg2json-raw.json', JSON.stringify(doc), function(err) {
    if(err) {
        return console.log(err);
    }
});

for( let e of doc.elements )
{
    if( e.type == "element" && e.name == "svg" && e.elements )
    {
        let child_offset = iterElements(e.elements);
        fs.writeFile(__dirname + '/echoic-svg2json-test.json', JSON.stringify(child_offset.child), function(err) {
            if(err) {
                return console.log(err);
            }
        });

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