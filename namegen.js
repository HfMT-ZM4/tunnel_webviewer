var instr = [ "violin", "violin", "flute", "flute", "clarinet", "alto sax", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "soprano recorder", "clarinet", "trumpet", "tuba", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "violin", "flute", "oboe", "clarinet", "tenor sax", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "bass recorder", "clarinet", "alto sax", "bassoon", "double bass", "percussion", "baritone", "e.guitar", "accordion", "violin", "violin", "flute", "tenor recorder", "clarinet", "trumpet", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "oboe", "clarinet", "tenor sax", "bass tuba", "violoncello", "percussion", "soprano", "e.guitar", "accordion" ];

var uiname = {
		new: "text",
		parent: "main-svg",
		text: "<put name here>",
		x: 100,
		y: 100
	};


function getName(i_)
{
	switch(i_)
	{
		case 111: // 112
			return "sub recorder";
		case 135: // 136
			return "alto recorder";
		case 138: // 139
			return "horn";
		default:
			return instr[ i_ % 72 ];
	}
}

function bang()
{
	var obj = {};
	var svg = [];
	
	for( var i = 0; i < 144; i++)
	{
		var ii = i + 1;
		uiname.text = ii + " " + getName(i);
		
		svg.push( JSON.parse( JSON.stringify(uiname) ) );
		
	}
	
	obj.foo = {};
	obj.foo.key = "svg";
	obj.foo.val = svg;
	
	var dct = new Dict();
	dct.parse(JSON.stringify(obj));
	outlet(0, "dictionary", dct.name);
}
