const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

console.log(__dirname);
app.use(express.static(__dirname + '/dist/forms'));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/dist/forms/index.html'));
});
app.use(compression());
app.listen(process.env.PORT || 4000);
