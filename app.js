const express = require('express');
const app = express();
const zlib = require('zlib');    
const unzip = zlib.createUnzip();  
const fs = require('fs');   
const csv = require('fast-csv')

const list = [];

fs.createReadStream('2017.csv')
    .pipe(csv())
    .on('data',function(data){
        var json = {id : data[0],value : data[1] + '  ' + data[2]};
        console.log(json);
        list.push(json);
    })
    .on('end',function(data){
        console.log('Read finished');
    });

    app.get('/api/:id',(req,res) => {
        const details = list.find(c => c.id === req.params.id);
        if(!details) res.status(404).send('Not found');
        res.send(details.value);
    });

    const port = process.env.PORT || 3000
    app.listen(port,() => console.log(`Listening on ${port}`));


