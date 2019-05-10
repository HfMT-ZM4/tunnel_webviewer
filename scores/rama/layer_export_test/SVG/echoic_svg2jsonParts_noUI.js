const fs = require('fs');
const convert = require('xml-js');

const make = ""; // "play" "perf"

const sys_w = 731.441; // pixel with of system

const scale = 10;

let playheadX = 250;
let scoreY = 0;

const leadin = 200;
let scoreX = 0;

let nameX = 10;
let nameY = 90;

const npages = 1;
const secPerPage = 36;

const stafflength = sys_w * scale;

const scoreWidth = stafflength * npages ;

const pixWidth = scoreWidth + leadin;

const secPerPix = secPerPage / stafflength;

const totalduration = pixWidth * secPerPix;


const ministartX = playheadX + 37;
const ministartY = 4;

const miniH = 50;
const miniplayH = miniH;
const scrollbarH = miniH;
const scrollbarColor = "rgba(0,0,255,0.25)"

const miniW = 700;
const miniscaleX = miniW / scoreWidth;

const standardH = 22.344 * scale;
const accordH = 33.186 * scale;


let miniscaleY = miniH / standardH;
let miniscaleYaccord = miniH / accordH;

const miniX = (ministartX + (leadin * miniscaleX))/ miniscaleX;
const miniY = ministartY / miniscaleY;// 2717.3740234375;


let obj_id_incr = 0; // unique id tag for every element

let ui_clear = {
    key: "clear",
    val: "*"
}

let ui_css = {
    "key": "css",
    "val": [
        {
            "selector": ".ready",
            "props": {
                "background-color": "lightblue",
                "color": "black"
            }
        },
        {
            "selector": ".noclick",
            "props": {
                "user-select": "none",
                "pointer-events": "none"
            }
        },
        {
            "selector": "path",
            "props": {
                "stroke-width": 0,
                "fill": "none"
            }
        },
        {
            "selector": "polygon",
            "props": {
                "stroke-width": 0,
                "fill": "none"
            }
        },
        {
            "selector": "polyline",
            "props": {
                "stroke-width": 0,
                "fill": "none"
            }
        }
    ]
};



var ui_svg = {
    "key": "svg",
    "val": [
        {
            "new": "g",
            "id": "scoreGroup"
        },
        {
            "id": "score",
            "parent": "scoreGroup",
            "new": "use",
            "href": "#defscore",
            "x": scoreX,
            "y": scoreY
        }
    ]
}


let ui_tween = {
    "key": "tween",
    "val": [
        {
            "id": "score-anim",
            "target": "#defscore",
            "dur": totalduration,
            "vars": {
                "x": -pixWidth,
                "ease": "linear",
                "paused": "true",
                force3D: false,
                "onUpdate": {
                    "function": " \n  if( this.time() % 1\t< 0.05){\n    let text = document.getElementById('timecount');\n    text.innerHTML = Math.floor( this.time() );\n  }\n"
                }
            }
        }
    ]
};


/**
 * SVG to JSON
 *
 */


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

function procElements(el_array)
{
    if( !Array.isArray(el_array) )
        el_array = [ el_array ];

    return el_array.map( (n, i, ar) => {
        let obj_ = {};
        if( n.hasOwnProperty('name') )
            obj_.new = n.name;
        
        if( n.hasOwnProperty('attributes') )
        {
            for( let k in n.attributes )
            {
                if( k == 'id' )
                    obj_.id = n.attributes[k]+(obj_id_incr++);
                else
                    obj_[k] = ( k == "style" ) ? styleStr2obj(n.attributes[k]) : n.attributes[k];
            }
        }

        if( n.hasOwnProperty('elements') )
            if( obj_.new == "text" )
                obj_.text = n.elements[0].text;
            else
                obj_.child = procElements(n.elements);

        return obj_;

    });
}

let artboards = [];
let pages = [];

for( let i = 0; i < npages; i++ )
{
    let strI = i+1;
    if( i < 9 )
        strI = "0"+strI

    pages.push(strI)
    let svgFile = fs.readFileSync(__dirname +  '/echoic_expanded-'+strI+'.svg', 'utf8');
    artboards.push( convert.xml2js(svgFile, { ignoreComment: true, compact: false }) );  
}


function getSVGElements(_artboard)
{
    for( let e of _artboard.elements )
    {
        if( e.type == "element" && e.name == "svg" && e.elements )
        {
            return e.elements;
        }
    }
}

// for each instrument, iterate all artboards, and copy that instrument's layer name for looking up into all artboards below
// then apply the offset to the parent group.

let layerInfo = [];
let clefs = {};

// a getElementByID woudl be nice 

function getElementByID_startswith(_elements, _id)
{
    for( let ee of _elements )
    {
        if( ee.hasOwnProperty('attributes') &&  ee.attributes.hasOwnProperty('id') && ee.attributes.id.startsWith(_id) )
            return ee;
        else if( ee.hasOwnProperty('elements') )
        {
            let ret = getElementByID_startswith(ee.elements, _id);
            if( ret != null )
                return ret;
        }
    }

    return null;
}

let layerCount = 0;
let lookup = {};

function getLayersAndSpacer()
{
    let svg_elements = getSVGElements(artboards[0]);

    for( let ee of svg_elements )
    {
        if( ee.hasOwnProperty('attributes') && ee.attributes.hasOwnProperty('id') )
        {
            if( ee.attributes.id.startsWith('Layer') )
            {
                let spacer = 0;
                for( let eee of ee.elements )
                {
                    if( eee.name == "line" && eee.attributes.hasOwnProperty('id') && eee.attributes.id.startsWith("spacer") )
                    {
                        spacer = { x: eee.attributes.x2,  y: eee.attributes.y2 };
                        break;
                    }
                }
                lookup[ee.attributes.id] = layerCount;

                layerInfo.push({
                    id: ee.attributes.id,
                    spacer: spacer,
                    idx: layerCount
                });    
                layerCount++;
            }
            else if(ee.attributes.id.startsWith('clef-names') )
            {
                clefs.g = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-1-vln")),
                    offset: (649.938 - 8.412) * scale
                };
                clefs.f = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-7-trb")),
                    offset: (734.055 - 8.412) * scale
                };
                clefs.grand = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-12-accord")),
                    offset: (804.153 - 8.412) * scale
                };
                clefs.gtr = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-11-egtr")),
                    offset: (790.134 - 8.412) * scale
                };
                clefs.srec = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-16-srec")),
                    offset: (875.573 - 8.412) * scale
                };
                clefs.brec = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-40-brec")),
                    offset: (1242.314 - 8.412) * scale
                };
                clefs.alto = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-14-vla")),
                    offset: (847.534 - 8.412) * scale
                };

            }    

        }
        
    }
    
    clefs.g.spacer = layerInfo[lookup['Layer_1_vln']].spacer;    
    clefs.f.spacer = layerInfo[lookup['Layer_7_trb']].spacer;
    clefs.grand.spacer = layerInfo[lookup['Layer_12_accord']].spacer;
    clefs.gtr.spacer = layerInfo[lookup['Layer_11_egtr']].spacer;
    clefs.srec.spacer = layerInfo[lookup['Layer_16_srec']].spacer; 
    clefs.brec.spacer = layerInfo[lookup['Layer_40_brec']].spacer;
    clefs.alto.spacer = layerInfo[lookup['Layer_14_vla']].spacer;
    
}

getLayersAndSpacer();

function getLayerByID(_artboard, _id)
{
    let svg_elements = getSVGElements(_artboard);
    for( let ee of svg_elements )
    {
        if( ee.hasOwnProperty('attributes') && ee.attributes.id.startsWith(_id) )
            return ee;
    }
}


let perfObj = {};

layerInfo.reverse().forEach( info => {

    let def_score = {
        new: "g",
//        parent: "defs",
        id: "defscore",
        child: []
    };

    for( let i = 0; i < artboards.length; i++)
    {
        let _ab = artboards[i];
        let _page = pages[i];
        let layer = getLayerByID(_ab, info.id);
        
        let _x = scale * (sys_w * i - info.spacer.x);
        let _y = -(scale * info.spacer.y);

        let layer_g = {
            new: "g",
            id: info.id + _page,
            transform: `matrix(${scale},0,0,${scale},${_x},${_y})`,
            child: procElements(layer.elements)
        };

        def_score.child.push(layer_g);
    };

    let svg_obj = {
        "key": "svg",
        "val":[]
    };
    // score is first
    svg_obj.val.push(def_score);

    // svg_obj.val.push({
    //     "id": "score",
    //     "new": "use",
    //     "href": "#defscore",
    //     "x": scoreX,
    //     "y": scoreY
    // });

    let layerNameA = info.id.split("_");

    let layerNumA = Number(layerNameA[1]);
    let layerNumB = 0;

    console.log(layerNameA);
    
    if(layerNumA != layerNumA)
    {
        layerNumB = Number(layerNameA[1].slice(0,2)) + 72;
        let svgB = svg_obj;


/*        let objB = {
            "/1" : [ ui_css, ui_html, svgB, ui_tween ]
        }
*/
        if( make == 'perf')
        {
            perfObj["/"+layerNumB] =[ ui_clear, ui_css, perf_ui_html, svgB, ui_tween ];
/*
            let objB = {};
            objB["/"+layerNumB] = perfObj["/"+layerNumB];

            fs.writeFileSync(__dirname + '/echoic-perf-'+layerNumB+'.json', JSON.stringify(objB), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
            */
        }
        else
        {

            let objB = {};
            objB["/"+layerNumB] = [ ui_css, svgB, ui_tween ];


            fs.writeFileSync(__dirname + '/echoic-raw-'+layerNumB+'.json', JSON.stringify(objB), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        }
        

    }
    else
    {
        layerNumB = layerNumA + 72;

        let svgA = svg_obj;
        let svgB = JSON.parse(JSON.stringify(svg_obj));

        if( make == 'perf')
        {
            perfObj["/"+layerNumA] = [ ui_clear, ui_css, perf_ui_html, svgA, ui_tween ];
           /* 
            let obj = {};
            obj["/"+layerNumA] = perfObj["/"+layerNumA];
            
            fs.writeFile(__dirname + '/echoic-perf-'+layerNumA+'.json', JSON.stringify(obj), function(err) {
                if(err) {
                    return console.log(err);
                }
            });*/
        }
        else
        {
            let obj = {};
            obj["/"+layerNumA] = [ ui_css, svgA, ui_tween ];
    
            fs.writeFileSync(__dirname + '/echoic-raw-'+layerNumA+'.json', JSON.stringify(obj), function(err) {
                if(err) {
                    return console.log(err);
                }
            });    
        }

        if( make == 'perf')
        {
            perfObj["/"+layerNumB] = [ ui_clear, ui_css, perf_ui_html, svgB, ui_tween ];
            /*
            let objB = {};
            objB["/"+layerNumB] = perfObj["/"+layerNumB];

            fs.writeFile(__dirname + '/echoic-perf-'+layerNumB+'.json', JSON.stringify(objB), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
            */
        }
        else
        {
            let objB = {};
            objB["/"+layerNumB] = [ ui_css, svgB ];

            fs.writeFileSync(__dirname + '/echoic-raw-'+layerNumB+'.json', JSON.stringify(objB), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        }

    }        

  //  console.log(layerNameA,  Number(layerNameA[1]), layerNum == layerNum, info.id);
    
});

if( make == "perf" )
{
    fs.writeFile(__dirname + '/echoic-raw-performance.json', JSON.stringify(perfObj), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}
