const semver = require('semver')
const express = require('express')

const app = express()

app.set('port', (process.env.PORT || 5000))

app.get('/validRange/:s', (req, res) => {
  const validRange = semver.validRange(req.params["s"])
  if (validRange != null) {
    res.send(validRange)
  }
  else {
    res.status(400).send()
  }
});

app.listen(app.get('port'), () => {
  console.log('Node app is running at localhost:' + app.get('port'))
})

module.exports = app
