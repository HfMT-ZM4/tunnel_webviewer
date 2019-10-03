const fs = require('fs');

const file = fs.readFileSync(__dirname +  '/derfruehlingdesgoldenenschweins-1-performance.json', 'utf8');

let json = JSON.parse(file);

let p1 = json['/1'];




for( let n of p1 )
{
    if( n.key == 'svg' )
    {
        for( let o of n.val )
        {
            if( o.hasOwnProperty('id') && o.id == 'defscore') 
                console.log(o.child);
        }
    }
        
}






/*
json["/141"] = json["/105"];
fs.writeFileSync( __dirname+'/test.json', JSON.stringify(json) );

*/