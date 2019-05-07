
const fs = require('fs');


let tile_offset = 2000;
let tile_y = 0;
let tile_w = 800;

let tile_files = [
    { 
        href: "scores/wendy/1-01.jpg",
        dur: 1
    },{ 
        href: "scores/wendy/2-01.jpg",
        dur: 1
    }, { 
        href: "scores/wendy/3-01.jpg",
        dur: 1
    }, { 
        href: "scores/wendy/4-01.jpg",
        dur: 1
    }, { 
        href: "scores/wendy/5-01.jpg",
        dur: 1
    }, { 
        href: "scores/wendy/6-01.jpg",
        dur: 1
    }, { 
        href: "scores/wendy/7-01.jpg",
        dur: 1
    }
];

let _dur = 0;
tile_files.forEach( n => {
    _dur += n.dur;
});

function getFilesForInstr(i_)
{
    // insert instrument distribution here if needed
    return tile_files;
}


let setup = {

    sys_w: 14000, // pixel width of system

    npages: 1,
    
    secPerPage: _dur,
    
    pieceName: 'chakra',
    
    scale: 1,
    
    part_height: 800, // height of standard part notation
    accordion_height: 800, // height of accordion notation
    
    playheadX: 250,
    scoreY: 100,
    leadin: 0,
 
    nameX: 10, //instrument name
    nameY: 90,
 
    titleX: 320,
    titleY: 90,

    ministartX: 320,
    ministartY: 4,
    miniH: 50,
    scrollbarColor: "rgba(0,0,255,0.25)",
    
    miniW: 700,

    playheadH: 720,

    get standardH(){ return this.part_height * this.scale; }, 
    get accordH(){ return this.accordion_height * this.scale; }, 
   
    get scoreX(){ return this.playheadX + this.leadin; },
   
    get stafflength(){ return this.sys_w * this.scale; },
    
    get scoreWidth(){ return this.stafflength * this.npages; },
    
    get pixWidth(){ return this.scoreWidth + this.leadin; },
    
    get secPerPix(){ return this.secPerPage / this.stafflength; },
    
    get totalduration(){ return _dur; },

    get miniplayH(){ return this.miniH; },
    get scrollbarH(){ return this.miniH; },

    get miniscaleX(){ return this.miniW / this.scoreWidth; },
    
    get miniscaleY(){ return this.miniH / this.standardH; },
    get miniscaleYaccord(){ return this.miniH / this.accordH; },
    
    get miniX(){ return (this.ministartX + (this.leadin * this.miniscaleX))/ this.miniscaleX; },
    get miniY(){ return  this.ministartY / this.miniscaleY; }// 2717.3740234375,
    
};


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

// removed overlay since it's created in maxscore
function ui_svg(){
    return {
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
                "id": "miniplayhead",
                "x1": setup.ministartX,
                "x2": setup.ministartX,
                "y1": setup.ministartY,
                "y2": setup.ministartY + setup.miniplayH,
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
                "x": setup.scoreX,
                "y": setup.scoreY
            }
        ]
    }
};

// function ui_tween(){
//     return {
//         "key": "tween",
//         "val": [
//             {
//                 "id": "score-anim",
//                 "target": "#score",
//                 "dur": setup.totalduration,
//                 "vars": {
//                     "x": -setup.pixWidth,
//                     "ease": "linear",
//                     "paused": "true",
//                     "onUpdate": {
//                         "function": " \n  if( this.time() % 1\t< 0.05){\n    let text = document.getElementById('timecount');\n    text.innerHTML = Math.floor( this.time() );\n  }\n"
//                     }
//                 }
//             },
//             {
//                 "id": "miniscore-anim",
//                 "target": "#miniplayhead",
//                 "dur": setup.totalduration,
//                 "vars": {
//                     "x": "+="+setup.miniW,
//                     "ease": "linear",
//                     "paused": "true"
//                 }
//             }
//         ]
//     }
// };


function makeJSON()
{
    
    let perfObj = {};

    for( let i = 0; i < 144; i++ )
    {
        let layerNumA = i+1;

        const _prefix = `${layerNumA}`;   
        
        let svg_obj = {
            "key": "svg",
            "val":[]
        };

        let tween_obj = {
            "key": "tween",
            "val": []
        };

        let timeline_obj = {
            "id" : "score-anim",
            "init" : {
                "paused" : "true"
            },
            "tweens" : []
        };

        let fileArr = getFilesForInstr(i);
        
        let _svg = [];
        let prev_dur = 0;

        fileArr.forEach( (n, idx) => {
         
            let _x = (idx * tile_offset);

            _svg.push({
                "new":  "image",
                "id": "image_"+idx,
                "href": n.href,
                "x": _x,
                "y": tile_y,
                "width": tile_w           
            });

            timeline_obj.tweens.push({
                "target" : "#score",
                "dur" : prev_dur
            },
            {
                "target" : "#score",
                "dur" : 0.0001,
                "vars" : {
                    "x": -_x
                }
            });

            prev_dur = n.dur;
        });


        
   

        let def_score = {
            new: "g",
            parent: "defs",
            id: "defscore",
            transform : `scale(${setup.scale})`,
            child: _svg
        };
    
        svg_obj.val.push(def_score);
        tween_obj.val.push(timeline_obj);

        console.log(_dur);
        
        tween_obj.val.push({
            "id": "miniscore-anim",
            "target": "#miniplayhead",
            "dur": _dur,
            "vars": {
                "x": "+=" + setup.miniW,
                "ease": "linear",
                "paused": "true"
            }
        });

        // add ui svg elements
        ui_svg().val.forEach( _el => {
            svg_obj.val.push( _el );
        });

       
        let instr_name = getName(i);
        let miniscaleY_ = setup.miniscaleY;
    
        svg_obj.val.push({
            "id": "mini",
            "parent": "scoreGroup",
            "new": "use",
            "href": "#defscore",
            "y": setup.miniY,
            "x": setup.miniX,
            "transform": "scale("+setup.miniscaleX+", "+miniscaleY_+")",
            "class": "noclick"
        });
    
        
        let svgA = svg_obj;
    
        // MAKE A
        svgA.val.push({
            "new": "text",
            "id": "playerID",
            "x": setup.nameX,
            "y": setup.nameY,
            "text": layerNumA + " " + instr_name
        });
        
    
        {
            
            perfObj["/"+layerNumA] = [ ui_clear, ui_css, perf_ui_html, JSON.parse(JSON.stringify(svgA)), tween_obj ];
/*            
            let obj = {};
            obj["/"+layerNumA] = perfObj["/"+layerNumA];
            
    
            fs.writeFile(__dirname + '/'+setup.pieceName+'-'+layerNumA+'.json', JSON.stringify(obj), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
            console.log("output", __dirname + '/'+setup.pieceName+'-'+layerNumA+'.json')
*/
        }
//        else
        {
            svgA.val.push({
                "parent": "overlay",
                "id": "scrollbar",
                "new": "rect",
                "x": setup.ministartX,
                "y": setup.ministartY,
                "height": setup.scrollbarH,
                "width": setup.miniW,
                "fill": setup.scrollbarColor,
                "onmousemove": `
                    event.preventDefault();
                    let x = event.clientX;
                    if(event.buttons == 1){
                        let r = ( ( x - ${setup.ministartX} ) / ${setup.miniW}) * ${setup.totalduration};
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
                    let r = ((x-${setup.ministartX}) / ${setup.miniW}) * ${setup.totalduration};
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

            let obj = {};
            obj["/"+layerNumA] = [ ui_css, ui_html, svgA, tween_obj ];
    
            fs.writeFile(__dirname + '/'+setup.pieceName+'-'+layerNumA+'.json', JSON.stringify(obj), function(err) {
                if(err) {
                    return console.log(err);
                }
            });    
            console.log("output", __dirname + '/'+setup.pieceName+'-'+layerNumA+'.json')

        }
    
             //  console.log(layerNameA,  Number(layerNameA[1]), layerNum == layerNum, info.id);
        
    }
    
    {
        fs.writeFile(__dirname + '/'+setup.pieceName+'-performance.json', JSON.stringify(perfObj), function(err) {
            if(err) {
                return console.log(err);
            }
        });
        console.log("output", __dirname + '/'+setup.pieceName+'-performance.json')
    }

}




try {
    const Max = require('max-api');

    Max.addHandler(Max.MESSAGE_TYPES.DICT, (dict) => {
        makeJSON(dict);
    });

    Max.addHandler("setup", dict => {

        if( typeof dict == "object" ){
            for( let k in dict )
            {
                setup[k] = dict[k];
            }
        }

        Max.outlet({
            make: setup.make, // if set to "perf" this script will produce the performance UI instead of the reherasal UI

            sys_w: setup.sys_w, // pixel width of system

            npages: setup.npages,
            
            secPerPage: setup.secPerPage,
            
            pieceName: setup.pieceName,
            
            scale: setup.scale,
            
            part_height: setup.part_height, // height of standard part notation
            accordion_height: setup.accordion_height, // height of accordion notation
            
            playheadX: setup.playheadX,
            scoreY: setup.scoreY,
            leadin: setup.leadin,
        
            nameX: setup.nameX,
            nameY: setup.nameY,
        
            ministartX: setup.ministartX,
            ministartY: setup.ministartY,
            miniH: setup.miniH,
            scrollbarColor: setup.scrollbarColor,
            
            miniW: setup.miniW,
            playheadH: setup.playheadH,

            titleX: setup.titleX,
            titleY: setup.titleY
        });
    });

    Max.post( "script save directory: "+ __dirname )

} catch (e){}

const in_max = typeof Max !== "undefined";

// could process outside of max here too

if( !in_max )
{
     makeJSON();
}