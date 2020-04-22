
//requires the use of libraries by the program
let express = require('express')
let bodyParser = require('body-parser')
let api_routes = require('./routes/api.js')
let path = require('path')

//App configuration
let app = express()

app.use(express.static(path.join(__dirname, 'student-sign-in-client', 'dist')))

//bodyParser converts data into json to be used by the client
app.use(bodyParser.json())

app.use('/api', api_routes)

//Error handling -- for route not found
app.use(function(req, res, next){
    res.status(404).send('Not found')
})

//Error handling for server errors
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Server error')
})

//Start server running, 3000 reflects the port to use
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})