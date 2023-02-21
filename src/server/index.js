const path = require('path');
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
app.use(bodyParser.json());
app.use(express.static('dist'))

// console.log(__dirname)

let allResData = {};

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
app.post('/travelTime', (req,res) => {
    const userData = req.body
    posExt.fetchSumtin(`http://api.geonames.org/searchJSON?name=${userData.city}&country=${userData.country}&maxRows=1&username=${process.env.USERNAME}`)
    .then(data => {
        let coordData = {};
        console.log(data)
        coordData.lat = data.geonames[0].lat
        coordData.long = data.geonames[0].lng
        console.log(coordData)
        return coordData
    })

})