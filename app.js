let express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

