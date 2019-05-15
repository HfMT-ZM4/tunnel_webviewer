const fs = require('fs');
const convert = require('xml-js');

const make = ""; // "play" "perf"

const sys_w = 731.441; // pixel with of system

const scale = 10;

let playheadX = 250;
let scoreY = 100;

const leadin = 200;
let scoreX = playheadX + leadin;

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
                "width": "200px"
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
            "onclick": `if( !this.classList.contains('ready') )
            {
                this.classList.add('ready');
                drawsocket.input({
                    key: 'tween',
                    val: [ {
                        id: 'score-anim',
                        cmd : 'play'
                    }, {
                        id: 'miniscore-anim',
                        cmd : 'play'
                    } ],
                    timetag: Date.now()
                });
            } else {
                this.classList.remove('ready');
                let starttime = document.getElementById('userinput');
                drawsocket.input({
                    key: 'tween',
                    val: [{
                        id: 'score-anim',
                        cmd: 'pause',
                        time: starttime.value
                    }, {
                        id: 'miniscore-anim',
                        cmd : 'pause',
                        time: starttime.value
                    }]
                });
            }`
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


let perf_ui_html = {
	key : "html",
	val : [{
		parent : "forms",
		id : "UI",
		new : "div",
		style : {
			position : "absolute",
			float : "left",
			width : "100vw"
		}
	}, {
		parent : "UI",
		id : "readybutton",
		new : "button",
		text : "ready",
		class : "button",
		onload : "let msg = {}; let addr = drawsocket.oscprefix+'/readybutton'; msg[addr] = 0; drawsocket.send(msg);",
		onclick : "drawsocket.startAudio();  let msg = {};      let addr = drawsocket.oscprefix+'/readybutton/state';      if( !this.classList.contains('ready') )      {        this.classList.add('ready');        msg[addr] = 1;        drawsocket.send(msg);     } else {         this.classList.remove('ready');        msg[addr] = 0;    drawsocket.send(msg);     }"
	}, {
		parent : "UI",
		id : "msg",
		new : "div",
		text : "please click the button when you're ready to play",
		style : {
			position : "absolute",
			left : "105px",
			"font-size" : "12px"
		}
	}, {
		parent : "UI",
		new : "input",
		type : "text",
		id : "userinput",
		name : "userinput",
		size : 10,
		onkeydown : " if( drawsocket.submitOnEnterKey(this) ) {     document.getElementById('sent').innerHTML = `sent: ${this.value}`; this.value = ''; }",
		style : {
			position : "relative",
			"margin-left" : "5px"
		}
	}, {
		parent : "UI",
		new : "label",
		for : "userinput",
		id : "sent",
		name : "sent",
		text : "",
		style : {
			"font-size" : "60%",
			color : "gray"
		}
	}]
}

var instr = ["violin", "violin", "flute", "flute", "clarinet in Bb", "alto sax in Eb", "trombone", "violoncello", "percussion", "alto", "e.guitar", "accordion", "violin", "viola", "flute", "soprano recorder", "clarinet in Bb", "trumpet in Bb", "tuba", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "violin", "flute", "oboe", "clarinet in Bb", "tenor sax in Bb", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "bass recorder", "clarinet in Bb", "alto sax in Eb", "bassoon", "double bass", "percussion", "baritone", "e.guitar", "accordion", "violin", "violin", "flute", "tenor recorder", "clarinet in Bb", "trumpet in Bb", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "oboe", "clarinet in Bb", "tenor sax in Bb", "bass tuba", "violoncello", "percussion", "soprano", "e.guitar", "accordion"];


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
            return instr[ i_ % 72 ];
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
            "x1": ministartX,
            "x2": ministartX,
            "y1": ministartY,
            "y2": ministartY + miniplayH,
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
            "id": "score",
            "parent": "scoreGroup",
            "new": "use",
            "href": "#defscore",
            "x": scoreX,
            "y": scoreY
        }, {
            "id": "whiteout",
            "parent": "scoreGroup",
            "new": "rect",
            "x": 0,
            "y": 75,
            "width": 100,
            "height": accordH,
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
            "dur": totalduration,
            "vars": {
                "x": -pixWidth,
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
            "dur": totalduration,
            "vars": {
                "x": "+="+miniW,
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

/**
 * 
 * @param {array/object} el_array - XML elements to be processed
 * @param {number} artboard_index - artboard index is used to make sure ids are not overwritten when reused in different files
 * @param {array} _ret_reflist - (optional) a reference to an array that will be filled with the ids of href links used in the layer
 */
function procElements(el_array, artboard_index, _ret_reflist)
{
    if( !Array.isArray(el_array) )
        el_array = [ el_array ];

    return el_array.map( n => {
        let obj_ = {};
        if( n.hasOwnProperty('name') )
            obj_.new = n.name;
        
        if( n.hasOwnProperty('attributes') )
        {
            for( let k in n.attributes )
            {

                switch(k)
                {
                    case 'id':
                        obj_.id =`${n.attributes[k]}_${artboard_index}`;
                    break;
                    case 'style':
                        obj_.style = styleStr2obj(n.attributes[k]);
                    break;
                    case 'xlink:href':
                        if( typeof _ret_reflist !== 'undefined' && n.attributes[k].startsWith('#') )
                        {                       
                            obj_[k] =`${n.attributes[k]}_${artboard_index}`;     
                            _ret_reflist.push( obj_[k].slice(1) );
                        }
                        else
                            obj_[k] = n.attributes[k];


                    break;
                    default:
                        obj_[k] = n.attributes[k];
                    break;

                }
               
            }

           
                       
        }

        if( n.hasOwnProperty('elements') )
            if( obj_.new == "text" )
                obj_.text = n.elements[0].text;
            else
                obj_.child = procElements(n.elements, artboard_index, _ret_reflist);

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

    pages.push(strI);
    let svgFile = fs.readFileSync(__dirname +  '/tunnel_chakra1-'+strI+'.svg', 'utf8');
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
let defs_by_id = {};

function getLayerByID(_artboard, _id)
{
    let svg_elements = getSVGElements(_artboard);
    for( let ee of svg_elements )
    {
        if( ee.hasOwnProperty('attributes') && ee.attributes.id.startsWith(_id) )
            return ee;
    }
}

function getDefs(_artboard, artboard_index)
{
    let _def_arr = [];
    let svg_elements = getSVGElements(_artboard);
    for( let ee of svg_elements )
    {
        if( ee.name === 'defs' && ee.hasOwnProperty('elements') )
        {
            let _obj_arr = procElements(ee.elements, artboard_index);
            _obj_arr.forEach( _ob => {
                if( _ob.hasOwnProperty('id') )
                {
                    _def_arr[_ob.id] = _ob;
                }
            });
        
        }
    }

    return _def_arr
}

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
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-1-vln"), 0),
                    offset: (649.938 - 8.412) * scale
                };
                clefs.f = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-7-trb"), 0),
                    offset: (734.055 - 8.412) * scale
                };
                clefs.grand = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-12-accord"), 0),
                    offset: (804.153 - 8.412) * scale
                };
                clefs.gtr = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-11-egtr"), 0),
                    offset: (790.134 - 8.412) * scale
                };
                clefs.srec = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-16-srec"), 0),
                    offset: (875.573 - 8.412) * scale
                };
                clefs.brec = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-40-brec"), 0),
                    offset: (1242.314 - 8.412) * scale
                };
                clefs.alto = {
                    svg: procElements(getElementByID_startswith(ee.elements, "clef-14-vla"), 0),
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
//console.log(defs_by_id);



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

let perfObj = {};

layerInfo.reverse().forEach( info => {

    let def_objs = [];

    let def_score = {
        new: "g",
        parent: "defs",
        id: "defscore",
        child: []
    };

    for( let i = 0; i < artboards.length; i++)
    {
        let _ab = artboards[i];

        // get defs
        let def_arr = getDefs(_ab, i);
        let ref_list = [];

        
        let _page = pages[i];
        let layer = getLayerByID(_ab, info.id);
        
        let _x = scale * (sys_w * i - info.spacer.x);
        let _y = -(scale * info.spacer.y);

        let layer_g = {
            new: "g",
            id: info.id + _page,
            transform: `matrix(${scale},0,0,${scale},${_x},${_y})`,
            child: procElements(layer.elements, i, ref_list)
        };

        for( let _link of ref_list ){
            def_objs.push( def_arr[_link] );
        }

        def_score.child.push(layer_g);
        
    };    

    let svg_obj = {
        "key": "svg",
        "val":[]
    };
   
    // first add defs
    for( let _def of def_objs )
    {
        _def.parent = 'defs';
        svg_obj.val.push( _def );
    }

    // then the score
    svg_obj.val.push(def_score);

    // add ui svg elements
    ui_svg.val.forEach( _el => {
        svg_obj.val.push( _el );
    });

    if( make != "perf")
    {
        svg_obj.val.push({
            "parent": "overlay",
            "id": "scrollbar",
            "new": "rect",
            "x": ministartX,
            "y": ministartY,
            "height": scrollbarH,
            "width": miniW,
            "fill": scrollbarColor,
            "onmousemove": `
                event.preventDefault();
                let x = event.clientX;
                if(event.buttons == 1){
                    let r = ((x-${ministartX}) / ${miniW}) * ${totalduration};
                    drawsocket.input({
                        key: 'tween',
                        val: [{
                            id: 'score-anim',
                            cmd: 'pause',
                            time: r 
                        }, {
                            id: 'miniscore-anim',
                            cmd: 'pause',
                            time: r
                        }]
                    });
                    let uiTxt = document.getElementById('userinput');
                    uiTxt.value = r;
                    let button = document.getElementById('playbutton');
                    if( button.classList.contains('ready') )
                        button.classList.remove('ready');

                }`,
            "ontouchmove": `
                event.preventDefault();
                let x = event.pageX;
                let r = ((x-${ministartX}) / ${miniW}) * ${totalduration};
                drawsocket.input({
                    key: 'tween',
                    val: [{
                        id: 'score-anim',
                        cmd: 'pause',
                        time: r 
                    }, {
                        id: 'miniscore-anim',
                        cmd: 'pause',
                        time: r
                    }]
                });
                let uiTxt = document.getElementById('userinput');
                uiTxt.value = r;
                `
        });
    }
    else
    {
        svg_obj.val.push({
            "parent": "overlay",
            "id": "scrollbar",
            "new": "rect",
            "x": ministartX,
            "y": ministartY + (miniH / 2),
            "height": 5,
            "width": miniW,
            "fill": scrollbarColor
        });
    }

    if( !info.id.endsWith('perc') )
    {
        let clef_obj = getClef(info.id)

       // console.log(info);        
    
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
    

    let miniscaleY_ = info.id.endsWith('accord') ? miniscaleYaccord : miniscaleY;

    if( make != "perf" )
    {
        svg_obj.val.push({
            "id": "mini",
            "parent": "scoreGroup",
            "new": "use",
            "href": "#defscore",
            "y": miniY,
            "x": miniX,
            "transform": "scale("+miniscaleX+", "+miniscaleY_+")",
            "class": "noclick"
        });
    }
    
    let layerNameA = info.id.split("_");

    let layerNumA = Number(layerNameA[1]);
    let layerNumB = 0;

    //console.log(layerNameA);
    
    if(layerNumA != layerNumA)
    {
        layerNumB = Number(layerNameA[1].slice(0,2)) + 72;
        let svgB = svg_obj;

         // MAKE B
         svgB.val.push({
            "new": "text",
            "id": "playerID",
            "x": nameX,
            "y": nameY,
            "text": layerNumB + " " + getName(layerNumB-1)
        });
        //console.log(layerNumB, getName(layerNumB-1));

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

            fs.writeFileSync(__dirname + '/chakra-perf-'+layerNumB+'.json', JSON.stringify(objB), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
            */
        }
        else
        {

            let objB = {};
            objB["/"+layerNumB] = [ ui_css, ui_html, svgB, ui_tween ];


            fs.writeFileSync(__dirname + '/chakra-'+layerNumB+'.json', JSON.stringify(objB), function(err) {
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

        // MAKE A
        svgA.val.push({
            "new": "text",
            "id": "playerID",
            "x": nameX,
            "y": nameY,
            "text": layerNumA + " " + getName(layerNumA-1)
        });
    


        if( make == 'perf')
        {
            perfObj["/"+layerNumA] = [ ui_clear, ui_css, perf_ui_html, svgA, ui_tween ];
           /* 
            let obj = {};
            obj["/"+layerNumA] = perfObj["/"+layerNumA];
            
            fs.writeFile(__dirname + '/chakra-perf-'+layerNumA+'.json', JSON.stringify(obj), function(err) {
                if(err) {
                    return console.log(err);
                }
            });*/
        }
        else
        {
            let obj = {};
            obj["/"+layerNumA] = [ ui_css, ui_html, svgA, ui_tween ];
    
            fs.writeFileSync(__dirname + '/chakra-'+layerNumA+'.json', JSON.stringify(obj), function(err) {
                if(err) {
                    return console.log(err);
                }
            });    
        }

        
        // MAKE B
        svgB.val.push({
            "new": "text",
            "id": "playerID",
            "x": nameX,
            "y": nameY,
            "text": layerNumB + " " + getName(layerNumA-1)
        });

        if( make == 'perf')
        {
            perfObj["/"+layerNumB] = [ ui_clear, ui_css, perf_ui_html, svgB, ui_tween ];
            /*
            let objB = {};
            objB["/"+layerNumB] = perfObj["/"+layerNumB];

            fs.writeFile(__dirname + '/chakra-perf-'+layerNumB+'.json', JSON.stringify(objB), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
            */
        }
        else
        {
            let objB = {};
            objB["/"+layerNumB] = [ ui_css, ui_html, svgB, ui_tween ];

            fs.writeFileSync(__dirname + '/chakra-'+layerNumB+'.json', JSON.stringify(objB), function(err) {
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
    fs.writeFileSync(__dirname + '/chakra-performance.json', JSON.stringify(perfObj), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}
