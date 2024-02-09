const semver = require('semver')
const express = require('express')

const app = express()

app.set('port', (process.env.PORT || 5000))

app.get('/validRange', (req, res) => {
  const validRange = semver.validRange(req.query["range"])
  if (validRange != null) {
    res.send(validRange)
  }
  else {
    res.status(400).send()
  }
});

function stringOrArrayToArray(thing) {
  if (typeof thing == "string") {
    return [thing]
  } else if (thing instanceof Array) {
    return thing
  }
  else {
    return null
  }
}

app.get('/maxSatisfying', (req, res) => {
  const versions = stringOrArrayToArray(req.query["v"])
  if (versions != null) {
    const maxSatisfying = semver.maxSatisfying(versions, req.query["range"])
    if (maxSatisfying != null) {
      res.send(maxSatisfying)
    } else {
      res.status(400).send()
    }
  }
  else {
    res.status(400).send()
  }
});

app.listen(app.get('port'), () => {
  console.log('Node app is running at localhost:' + app.get('port'))
})

module.exports = app
