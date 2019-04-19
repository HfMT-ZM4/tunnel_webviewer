var instr = ["violin", "violin", "flute", "flute", "clarinet in Bb", "alto sax in Eb", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "soprano recorder", "clarinet in Bb", "trumpet in Bb", "tuba", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "violin", "flute", "oboe", "clarinet in Bb", "tenor sax in Bb", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "bass recorder", "clarinet in Bb", "alto sax in Eb", "bassoon", "double bass", "percussion", "baritone", "e.guitar", "accordion", "violin", "violin", "flute", "tenor recorder", "clarinet in Bb", "trumpet in Bb", "trombone", "violoncello", "percussion", "soprano", "e.guitar", "accordion", "violin", "viola", "flute", "oboe", "clarinet in Bb", "tenor sax in Bb", "bass tuba", "violoncello", "percussion", "soprano", "e.guitar", "accordion"];

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
			return "horn in F";
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
