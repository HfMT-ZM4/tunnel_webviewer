

const fs = require('fs');


let setup = {

    make: "", // if set to "perf" this script will produce the performance UI instead of the reherasal UI

    sys_w: 9129, // pixel width of system

    npages: 1,
    
    secPerPage: 720,
    
    pieceName: 'realtime-UI',
    
    scale: 1.5,
    
    part_height: 100, // height of standard part notation
    accordion_height: 100, // height of accordion notation
    
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
    
    get totalduration(){ return this.pixWidth * this.secPerPix; },

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
       
        let instr_name = getName(i);
        
        svg_obj.val.push({
            "new": "text",
            "id": "playerID",
            "x": setup.nameX,
            "y": setup.nameY,
            "text": layerNumA + " " + instr_name
        });

        perfObj["/"+layerNumA] = [ ui_clear, ui_css, perf_ui_html, svg_obj ];

    }
            

    fs.writeFile(__dirname + '/'+setup.pieceName+'-performance.json', JSON.stringify(perfObj), function(err) {
        if(err) {
            return console.log(err);
        }
    });

    console.log("output", __dirname + '/'+setup.pieceName+'-performance.json')

}

makeJSON();
