var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

// console.log(`Your API key is ${process.env.API_KEY}`)

const mockAPIResponse = require('./mockAPI.js');

// import posExt module from posExt.js
const posExt = require('./posExt.js')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', (req, res) => {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, () => {
    console.log('Example app listening on port 8081!')
})

app.get('/test', (req, res) => {
    res.send(mockAPIResponse)
})


// POST request route
app.post('/pr', (req,res) => {
    const userText = req.body
    console.log(userText)
    posExt(`${process.env.API_KEY}`,`${userText}`)
    .then(data => res.send(data))
})