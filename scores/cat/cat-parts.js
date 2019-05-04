const fs = require('fs');
const convert = require('xml-js');

const make = ""; // "play" "perf"

const sys_w = 9129; // pixel with of system
// 9129 × 716

const scale = 1;

let playheadX = 250;
let scoreY = 100;

const leadin = 0;
let scoreX = playheadX + leadin;

let nameX = 10;
let nameY = 90;

const npages = 1;
const secPerPage = 720;

const stafflength = sys_w * scale;

const scoreWidth = stafflength * npages ;

const pixWidth = scoreWidth + leadin;

const secPerPix = secPerPage / stafflength;

const totalduration = pixWidth * secPerPix;

const ministartX = 320;
const ministartY = 4;

const miniH = 50;
const miniplayH = miniH;
const scrollbarH = miniH;
const scrollbarColor = "rgba(0,0,255,0.25)"

const miniW = 700;
const miniscaleX = miniW / scoreWidth;

const standardH = 716 * scale;

let miniscaleY = miniH / standardH;

const miniX = (ministartX + (leadin * miniscaleX))/ miniscaleX;
const miniY = ministartY / miniscaleY;// 2717.3740234375;

let playheadH = 720;


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
		text : "hi! please click the button when you're ready to play<br> (we're not quite ready yet)",
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
            "id": "back"
        },
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
            "y2": playheadH,
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
        }, 
        {
            new: "text",
            id: "group_instr",
            text: `RED: strings, accordion, voice -- BLACK: winds, brass, percussion, guitar`,
            x: ministartX,
            y: miniplayH + 20
        },
        {
            new: "text",
            id: "instructions",
            text: `pitches are indicated by relative vertical position, from lowest to highest possible`,
            x: ministartX,
            y: miniplayH + 40,
            "font-style" : "italic",
            "font-size" : 12
        },
        {
            new: "rect",
            id: "ui_rect",
            parent: "back",
            x: 0,
            y: scoreY-1,
            height: standardH+2,
            width: 1024,
            'stroke-weight' : 1,
            fill: 'rgba(0,0,0,0.01)',
            stroke: 'black'
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

const filenames = [
"Musk1_2.png",
"Musk3_4.png",
"Musk5_6.png",
"Musk7_8.png",
"Musk9_10.png",
"Musk11_12.png"
];

function getFileForIDX(i_)
{
    let group = Math.floor(i_ / 24 );
    return "scores/cat/"+filenames[ group ];
}

/*

Musk1_2.png 1 7
Musk3_4.png 2 8
Musk5_6.png 
Musk7_8.png
Musk9_10.png
Musk11_12.png
*/
let perfObj = {};


for( let i = 0; i < 144; i++)
{

    let def_score = {
        new: "image",
        parent: "defs",
        id: "defscore",
        href: getFileForIDX(i) //,
        //transform: `matrix(${scale},0,0,${scale},${_x},${_y})`,

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

    let miniscaleY_ = miniscaleY;

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

    
    let layerNumA = i+1;

    let svgA = svg_obj;

    // MAKE A
    svgA.val.push({
        "new": "text",
        "id": "playerID",
        "x": nameX,
        "y": nameY,
        "text": layerNumA + " " + getName(i) +", group "+ (Math.floor(i / 12 ) + 1)
    });
    

    if( make == 'perf')
    {
        perfObj["/"+layerNumA] = [ ui_clear, ui_css, perf_ui_html, svgA, ui_tween ];
        
        let obj = {};
        obj["/"+layerNumA] = perfObj["/"+layerNumA];
        
        fs.writeFile(__dirname + '/musk-'+layerNumA+'.json', JSON.stringify(obj), function(err) {
            if(err) {
                return console.log(err);
            }
        });
    }
    else
    {
        let obj = {};
        obj["/"+layerNumA] = [ ui_css, ui_html, svgA, ui_tween ];

        fs.writeFile(__dirname + '/musk-'+layerNumA+'.json', JSON.stringify(obj), function(err) {
            if(err) {
                return console.log(err);
            }
        });    
    }

         //  console.log(layerNameA,  Number(layerNameA[1]), layerNum == layerNum, info.id);
    
}

if( make == "perf" )
{
    fs.writeFile(__dirname + '/musk-performance.json', JSON.stringify(perfObj), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}
