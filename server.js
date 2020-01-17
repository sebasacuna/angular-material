const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

console.log(__dirname);
app.use(express.static(__dirname + '/dist/forms'));


function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

/*app.use(compression({
  // filter decides if the response should be compressed or not,
  // based on the `shouldCompress` function above
  filter: shouldCompress,
  // threshold is the byte threshold for the response body size
  // before compression is considered, the default is 1kb
  threshold: 0
}));*/
app.use(compression({
  filter: function () { return true; }
}));

app.get('/*', function(req, res) {
  res.set('Content-Encoding', 'gzip');
	res.sendFile(path.join(__dirname + '/dist/forms/index.html'));

});

app.listen(process.env.PORT || 4000);
