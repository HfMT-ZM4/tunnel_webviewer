const fs = require('fs');

let monitor = [];
let monitor_html = [];

let x_space = 5;
let x_linelength = 20;

let x_idx = 20;
let x1_line1 = x_idx + 15;
let x2_line1 = x1_line1 + x_linelength;

let x_logged = x2_line1 + x_space;
let x1_line2 = x_logged + 25;
let x2_line2 = x1_line2 + x_linelength;

let x_ready = x2_line2 + x_space;
let x1_line3 = x_ready + 70;
let x2_line3 = x1_line3 + x_linelength;

let x_sync = x2_line3 + x_space;
let x1_line4 = x_sync + 30;
let x2_line4 = x1_line4 + x_linelength;

let x_input = x2_line4 + x_space;
let x1_line5 = x_input + 120;
let x2_line5 = x1_line5 + x_linelength;

let x_sendmessage = x2_line5 + x_space;
let x1_line6 = x_sendmessage + 120;
let x2_line6 = x1_line6 + x_linelength;

let x_log =  x2_line6 + x_space;

let y_step = 12;
let y_lineOffset = 4;

let ui_css = {
		"key" : "css",
		"val" : [ 			{
				"selector" : ".index",
				"props" : 				{
					"font-size" : "12px"
				}

			}
, 			{
				"selector" : ".spacerLine",
				"props" : 				{
					"stroke" : "gray"
				}

			}
, 			{
				"selector" : ".loggedout",
				"props" : 				{
					"font-size" : "12px",
					"fill" : "red"
				}

			}
, 			{
				"selector" : ".loggedin",
				"props" : 				{
					"font-size" : "12px",
					"fill" : "black"
				}

			}
, 			{
				"selector" : ".notready",
				"props" : 				{
					"font-size" : "12px",
					"fill" : "red"
				}

			}
, 			{
				"selector" : ".ready",
				"props" : 				{
					"font-size" : "12px",
					"fill" : "black"
				}

			}
, 			{
				"selector" : ".textfield",
				"props" : 				{
					"position" : "absolute",
					"font-size" : "8px",
					"fill" : "black",
					"background" : "rgba(0,0,0,0.1)",
					"boarder" : "none",
					"outline" : "rgba(0,0,0,0.1)",
					"height" : "5px",
					"width" : "100px"
				}

			}
, 			{
				"selector" : ".ready",
				"props" : 				{
					"background-color" : "lightblue",
					"color" : "black"
				}

			}
 ]
};

const maxY = 72 * y_step;

monitor.push({
    new: 'line',
    id: 'separator',
    x1: 800,
    x2: 800,
    y1: 0,
    y2: 1024
});

for( let i = 1; i <= 144; i++)
{
    let column = Math.floor((i-1) / 72);
    let _y = (i * y_step) - (column * maxY);
    let lineY = _y - y_lineOffset;
    let xoffset = column * 800;

    monitor.push({
        new: "text",
        id: "id-"+i,
        x: x_idx + xoffset,
        y: _y,
        text: i,
        class: "index"
    });

    monitor.push({
        new: "line",
        id: "line1-"+i,
        x1: x1_line1 + xoffset,
        x2: x2_line1 + xoffset,
        y1: lineY,
        y2: lineY,
        class: "spacerLine"
    });

    monitor.push({
        new: "text",
        id: "connected-"+i,
        x: x_logged + xoffset,
        y: _y,
        text: "out",
        class: "loggedout"
    });

    monitor.push({
        new: "line",
        id: "line2-"+i,
        x1: x1_line2 + xoffset,
        x2: x2_line2 + xoffset,
        y1: lineY,
        y2: lineY,
        class: "spacerLine"
    });

    monitor.push({
        new: "text",
        id: "readybutton-state-"+i,
        x: x_ready + xoffset,
        y: _y,
        text: "not ready",
        class: "notready"
    });

    monitor.push({
        new: "line",
        id: "line3-"+i,
        x1: x1_line3 + xoffset,
        x2: x2_line3 + xoffset,
        y1: lineY,
        y2: lineY,
        class: "spacerLine"
    });

    monitor.push({
        new: "text",
        id: "syncOffset-"+i,
        x: x_sync + xoffset,
        y: _y,
        text: "",
        class: "index"
    });

    monitor.push({
        new: "line",
        id: "line4-"+i,
        x1: x1_line4 + xoffset,
        x2: x2_line4 + xoffset,
        y1: lineY,
        y2: lineY,
        class: "spacerLine"
    });

    monitor.push({
        new: "text",
        id: "userinput-input-"+i,
        x: x_input + xoffset,
        y: _y,
        text: "",
        class: "index"
    });

    monitor.push({
        new: "line",
        id: "line5-"+i,
        x1: x1_line5 + xoffset,
        x2: x2_line5 + xoffset,
        y1: lineY,
        y2: lineY,
        class: "spacerLine"
    });

    monitor_html.push({
        new: "input",
        parent: "forms",
        type: "text",
        id: "msgfromserver-"+i,
        name: "msgfromserver",
        size: 10,
        onkeydown: "drawsocket.submitOnEnterKey(this)",
        class: "textfield",
        style: {
            top: ((i-1) * y_step + 3 - (column * maxY)) + "px",
            left: (x_sendmessage + xoffset) + "px"
        }
    });

    monitor.push({
        new: "line",
        id: "line6-"+i,
        x1: x1_line6 + xoffset,
        x2: x2_line6 + xoffset,
        y1: lineY,
        y2: lineY,
        class: "spacerLine"
    });

    monitor.push({
        new: "text",
        id: "log-"+i,
        x: x_log + xoffset,
        y: _y,
        text: "",
        class: "index",
        style: {
            "font-size" : 8
        }
    });

}

let svg = {
    key: 'svg',
    val: monitor
}

let html = {
    key: 'html',
    val: monitor_html
};

let obj = {};
obj['/monitor']= [ ui_css, svg, html ];

fs.writeFile(__dirname + '/monitor.json', JSON.stringify(obj), function(err) {
    if(err) {
        return console.log(err);
    }
});