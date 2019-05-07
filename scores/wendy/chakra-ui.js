let tile_offset = 2000;
let tile_y = 100;
let tile_w = 800;

let tile_files = [
    { 
        href: "scores/wendy/root-01.jpg",
        dur: 10
    },{ 
        href: "scores/wendy/sacral-01.jpg",
        dur: 10
    }, { 
        href: "scores/wendy/heart-01.jpg",
        dur: 10
    }, { 
        href: "scores/wendy/throat-01.jpg",
        dur: 10
    }, { 
        href: "scores/wendy/solar-01.jpg",
        dur: 10
    }, { 
        href: "scores/wendy/brow-01.jpg",
        dur: 10
    }, { 
        href: "scores/wendy/crown-01.jpg",
        dur: 10
    }
];


function makeJSON()
{
    let svg = {
        key: 'svg',
        val: []
    }

    tile_files.forEach(img_obj => {
        svg.val.push()
    })

    return {
        "*" : [{
            "key": "svg",
            "val": [{
                "parent": "defs",
                "new":  "g",
                "id": "defscore"            
            },
            {
                "parent": "tile_score",
                "new":  "image",
                "id": "root",
                "href": "scores/wendy/root-01.jpg",
                "x":0,
                "y":100,
                "width": 800           
            },
            {
                "parent": "tile_score",
                "new":  "image",
                "id": "sacral",
                "href": "scores/wendy/sacral-01.jpg",
                "x":2000,
                "y":100,
                "width": 800
            },
            {
                "parent": "tile_score",
                "new":  "image",
                "id": "heart",
                "href": "scores/wendy/heart-01.jpg",
                "x":4000,
                "y":100,
                "width": 800
            },
            {
                "parent": "tile_score",
                "new":  "image",
                "id": "throat",
                "href": "scores/wendy/throat-01.jpg",
                "x":6000,
                "y":100,
                "width": 800
            },
            {
                "parent": "tile_score",
                "new":  "image",
                "id": "solar",
                "href": "scores/wendy/solar-01.jpg",
                "x":8000,
                "y":100,
                "width": 800
            },
            {
                "parent": "tile_score",
                "new":  "image",
                "id": "brow",
                "href": "scores/wendy/brow-01.jpg",
                "x":10000,
                "y":100,
                "width": 800
            },
            {
                "parent": "tile_score",
                "new":  "image",
                "id": "crown",
                "href": "scores/wendy/crown-01.jpg",
                "x":12000,
                "y":100,
                "width": 800
            }]
        }, {
            "key" : "tween",
            "val" : {
                "id" : "score-anim",
                "init" : {
                    "paused" : "true"
                },
                "tweens" : [
                    {
                        "target" : "#tile_score",
                        "dur" : 1
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 0.0001,
                        "vars" : {
                            "x": "-= 2000"
                        }
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 1
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 0.0001,
                        "vars" : {
                            "x": "-= 2000"
                        }
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 1
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 0.0001,
                        "vars" : {
                            "x": "-= 2000"
                        }
                    },{
                        "target" : "#tile_score",
                        "dur" : 1
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 0.0001,
                        "vars" : {
                            "x": "-= 2000"
                        }
                    },{
                        "target" : "#tile_score",
                        "dur" : 1
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 0.0001,
                        "vars" : {
                            "x": "-= 2000"
                        }
                    },{
                        "target" : "#tile_score",
                        "dur" : 1
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 0.0001,
                        "vars" : {
                            "x": "-= 2000"
                        }
                    },{
                        "target" : "#tile_score",
                        "dur" : 1
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 0.0001,
                        "vars" : {
                            "x": "-= 2000"
                        }
                    },{
                        "target" : "#tile_score",
                        "dur" : 1
                    },
                    {
                        "target" : "#tile_score",
                        "dur" : 0.0001,
                        "vars" : {
                            "x": "-= 2000"
                        }
                    }
                ]
                
            }
        }]
    };
}