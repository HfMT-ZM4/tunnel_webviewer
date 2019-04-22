const fs = require('fs');
const convert = require('xml-js');


const sys_w = 731.441; // pixel with of system
const scale = 10;

let playheadX = 250;
let scoreY = 100;

let nameX = 10;
let nameY = 80;

let obj_id_incr = 0; // unique id tag for every element


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

let ui_html = {
    "key": "html",
    "val": [
        {
            "parent": "forms",
            "id": "UI",
            "new": "div",
            "style": {
                "position": "absolute",
                "float": "left",
                "width": "100vw"
            }
        },
        {
            "parent": "UI",
            "id": "playbutton",
            "new": "button",
            "text": "play",
            "class": "button",
            "style": {
                "float": "left"
            },
            "onclick": "\n     if( !this.classList.contains('ready') )\n     {\n        this.classList.add('ready');\n        drawsocket.input({\n          key: 'tween',\n          val: [ {\n            id: 'score-anim',\n       \t\t   cmd : 'play'\n          }, {\n            id: 'miniscore-anim',\n       \t\t   cmd : 'play'\n          } ],\n          timetag: Date.now()\n        });\n     } else { \n        this.classList.remove('ready');\n\n       let starttime = document.getElementById('userinput');\n\n        drawsocket.input({\n          key: 'tween',\n          val: [{\n            id: 'score-anim',\n       \t\t   cmd: 'pause',\n            time: starttime.value\n          }, {\n            id: 'miniscore-anim',\n       \t\t   cmd : 'pause',\n            time: starttime.value\n          }]\n        });\n     }"
        },
        {
            "parent": "UI",
            "new": "label",
            "for": "userinput",
            "id": "sent",
            "name": "sent",
            "text": "start at time<br>",
            "style": {
                "font-size": "60%",
                "color": "gray",
                "margin-left": "20px"
            }
        },
        {
            "parent": "UI",
            "new": "input",
            "type": "text",
            "id": "userinput",
            "name": "userinput",
            "placeholder": "0",
            "size": 5,
            "onkeydown": "\n     if( drawsocket.submitOnEnterKey(this) ) { \n       let button = document.getElementById('playbutton');\n       if( button.classList.contains('ready') )\n            button.classList.remove('ready');\n\n       drawsocket.input({\n         key: 'tween',\n         val: [{\n           id: 'score-anim',\n           cmd: 'pause',\n           time: this.value\n         }, {\n          id: 'miniscore-anim',\n       \t\t cmd : 'pause',\n          time: this.value\n          }]\n       });\n     }",
            "style": {
                "margin-left": "35px",
                "text-align": "center"
            }
        }
    ]
};

var instr = ["violin", "violin", "flute", "flute", "clarinet in Bb", "alto sax in Eb", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "soprano recorder", "clarinet in Bb", "trumpet in Bb", "tuba", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "violin", "flute", "oboe", "clarinet in Bb", "tenor sax in Bb", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "bass recorder", "clarinet in Bb", "alto sax in Eb", "bassoon", "double bass", "percussion", "baritone", "e.guitar", "accordion", "violin", "violin", "flute", "tenor recorder", "clarinet in Bb", "trumpet in Bb", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "oboe", "clarinet in Bb", "tenor sax in Bb", "bass tuba", "violoncello", "percussion", "soprano", "e.guitar", "accordion"];

function getName(i_)
{
	switch(i_)
	{
		case 111: // 112
			return "sub recorder";
		case 135: // 136
			return "alto recorder";
		case 138: // 139
			return "horn in F";
        default:
            console.log( 'i_ % 72 ', i_ % 72 );
            return instr[ i_ % 72 ];
            break;
	}
}

function makeUIName(i_) {
    return {
        new: "text",
        id: "playerID",
        text: getName(i_),
        x: nameX,
        y: nameY
    };
}


var ui_svg = {
    "key": "svg",
    "val": [
        {
            "new": "g",
            "id": "scoreGroup"
        },
        {
            "new": "g",
            "id": "overlay"
        },
        {
            "parent": "overlay",
            "new": "line",
            "id": "playhead",
            "x1": playheadX,
            "x2": playheadX,
            "y1": 0,
            "y2": 400,
            "style": {
                "stroke": "red",
                "stroke-width": 3,
                "stroke-opacity": 0.5
            }
        },
        {
            "parent": "overlay",
            "new": "line",
            "id": "miniplayhead",
            "x1": 20,
            "x2": 20,
            "y1": 400,
            "y2": 500,
            "style": {
                "stroke": "blue",
                "stroke-width": 3,
                "stroke-opacity": 0.5
            }
        },
        {
            "parent": "overlay",
            "new": "text",
            "id": "timecount",
            "x": 195,
            "y": 35
        },
        {
            "parent": "overlay",
            "id": "scrollbar",
            "new": "rect",
            "x": 20,
            "y": 400,
            "height": 15,
            "width": 1080,
            "fill": "rgba(0,0,255,0.5)",
            "onmousemove": "    \n    event.preventDefault();\n    let x = event.clientX;\n    if(event.buttons == 1){\n      let r = ((x-20) / 1080) * 722.215;\n\n      drawsocket.input({\n        key: 'tween',\n        val: [{\n          id: 'score-anim',\n          cmd: 'pause',\n          time: r \n        }, {\n          id: 'miniscore-anim',\n          cmd: 'pause',\n          time: r\n        }]\n      });\n      let uiTxt = document.getElementById('userinput');\n      uiTxt.value = r;\n    }",
            "ontouchmove": "\n    event.preventDefault();\n    let x = event.pageX;\n\n      let r = ((x-20) / 1080) * 722.215;\n\n      drawsocket.input({\n        key: 'tween',\n        val: [{\n          id: 'score-anim',\n          cmd: 'pause',\n          time: r \n        }, {\n          id: 'miniscore-anim',\n          cmd: 'pause',\n          time: r\n        }]\n       });\n    let uiTxt = document.getElementById('userinput');\n    uiTxt.value = r;\n    "
        },
        {
            "id": "score",
            "parent": "scoreGroup",
            "new": "use",
            "href": "#defscore",
            "x": playheadX,
            "y": scoreY
        },
        {
            "id": "mini",
            "parent": "scoreGroup",
            "new": "use",
            "href": "#defscore",
            "y": 720,
            "x": 2717.3740234375,
            "transform": "scale(0.00736005, 0.5)",
            "class": "noclick"
        },
        {
            "id": "whiteout",
            "parent": "scoreGroup",
            "new": "rect",
            "x": 0,
            "y": 75,
            "width": 100,
            "height": 250,
            "fill": "white"
        }    
    ]
}

let ui_tween = {
    "key": "tween",
    "val": [
        {
            "id": "score-anim",
            "target": "#score",
            "dur": 722.2147827148438,
            "vars": {
                "x": -146738.203125,
                "ease": "linear",
                "paused": "true",
                "onUpdate": {
                    "function": " \n  if( this.time() % 1\t< 0.05){\n    let text = document.getElementById('timecount');\n    text.innerHTML = Math.floor( this.time() );\n  }\n"
                }
            }
        },
        {
            "id": "miniscore-anim",
            "target": "#miniplayhead",
            "dur": 722.2147827148438,
            "vars": {
                "x": "+= 1080",
                "ease": "linear",
                "paused": "true"
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

for( let i = 0; i < 20; i++ )
{
    let strI = i+1;
    if( i < 9 )
        strI = "0"+strI

    pages.push(strI)
    let svgFile = fs.readFileSync(__dirname +  '/echoic_-'+strI+'.svg', 'utf8');
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

let test = "layer_foo_vln";
console.log( "test", test.endsWith("vln") );

let gclef = ["vln", "fl", "ob","arec", "trec", "cl", "trp",  "asax", "tsax", "sopr", "hrn"];
let fclef = ["trb", "tuba", "btuba", "vc", "db", "subrec", "bsn", "baritone" ];

function getClef(_layerName)
{
    for(let i = 0; i < gclef.length; i++)
    {
        if( _layerName.endsWith( gclef[i] )  ){      
            //console.log("found g", clefs.g.svg);
            return clefs.g;
        }
    }
   
    for(let i = 0; i < fclef.length; i++)
    {
        if( _layerName.endsWith( fclef[i] )  ){      
            //console.log("found g", clefs.g.svg);                  
            return clefs.f;
        }
    }


    if( _layerName.endsWith( "accord" ) )
        return clefs.grand;
    else if( _layerName.endsWith( "egtr" ) )
        return clefs.gtr;
    else if( _layerName.endsWith( "srec" ) )
        return clefs.srec;
    else if( _layerName.endsWith( "brec" ) )
        return clefs.brec;
    else if( _layerName.endsWith( "vla" ) )
        return clefs.alto;
    else
        return "not found clef "+_layerName;
}

let instrArr = {};

layerInfo.forEach( info => {

    let def_score = {
        new: "g",
        parent: "defs",
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

    // add ui svg elements
    ui_svg.val.forEach( _el => {
        svg_obj.val.push( _el );
    });

    svg_obj.val.push({
        "new": "text",
        "id": "playerID",
        "x": nameX,
        "y": nameY,
        "text": info.id + " " + getName(info.idx)
    });

    if( !info.id.endsWith('perc') )
    {
        let clef_obj = getClef(info.id)

     //   console.log(clef_obj, info.spacer.y);
        
    
        let _x = -(scale * (info.spacer.x - 9.631));
        let _y = -(clef_obj.spacer.y * scale) + scoreY; 
    
        // add clef
        let clef = {
            new: "g",
            id: "clef_"+info.id,
            transform: `matrix(${scale},0,0,${scale},${_x},${_y})`,
            child: clef_obj.svg
        };
    
        svg_obj.val.push(clef);
    }
    

    let obj = {
        "/1" : [ ui_css, ui_html, svg_obj, ui_tween ]
    }

    fs.writeFile(__dirname + '/echoic-'+info.id+'.json', JSON.stringify(obj), function(err) {
        if(err) {
            return console.log(err);
        }
    });
    
});
