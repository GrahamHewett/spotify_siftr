let express = require('express')
let request = require('request')
let querystring = require('querystring')
let path = require('path')
let app = express()

// let redirect_uri = req.protocol + '://' + req.get('host') + '/callback'
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback'

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: '9a83fea5e2d04504a311aee6166ef775',
      scope: 'user-read-private user-read-email playlist-modify-private playlist-modify-public',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        '9a83fea5e2d04504a311aee6166ef775' + ':' + '92955232e75842e8ae6049bf18fbbba7'
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = req.protocol + '://' + req.get('host');
    res.redirect(uri + '?access_token=' + access_token)
  })
})

app.use(express.static(path.join(__dirname, '../../../build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../../build', 'index.html'));
});

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)