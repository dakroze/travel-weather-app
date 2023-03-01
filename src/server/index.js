const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


// const mockAPIResponse = require('./mockAPI.js');

// import posExt module from posExt.js
const posExt = require('./posExt.js')

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))

// console.log(__dirname)


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

// create empty object to hold all API response data

const allResData = {};

// POST request route
app.post('/travelTime', (req,res) => {
    const userData = req.body
    // fetch city photo from Pixabay API 
    posExt.fetchSumtin(`https://pixabay.com/api/?key=${process.env.PX_API_KEY}&q=${userData.city}+landmark&category=travel&image_type=photo`)
    .then(data => {
        if (data.total === 0){
            allResData.pictureURL = "https://pixabay.com/get/gbc55c80e82a2fa86be29fbf5b14ca454653883c00bae8f48e83e1dc8cedc32c018eadd3469bb101365dd6c7cb6382ce3aba2a03f972f20ea00136b38d0c0011d_640.jpg";
        } else {
            // generate random hit from all hits
            const hit = data.hits[Math.floor(Math.random() * data.hits.length)];
            // update object store
            allResData.pictureURL = hit.webformatURL
        }
         // fetch lat and long from Geonames API 
        posExt.fetchSumtin(`http://api.geonames.org/searchJSON?name=${userData.city}&country=${userData.country}&maxRows=1&username=${process.env.USERNAME}`)
        .then(data => {
            let coordData = {};
            coordData.lat = data.geonames[0].lat
            coordData.long = data.geonames[0].lng
            // fetch weather data from Weatherbit API
            posExt.fetchSumtin(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${coordData.lat}&lon=${coordData.long}&units=I&key=${process.env.WB_API_KEY}`)
            .then(wbData => {
                let servData = wbData.data.filter(i => i.datetime === userData.date)
                allResData.weatherHigh = `High - ${servData[0].high_temp+String.fromCodePoint(8451)}`
                allResData.weatherLow = `Low - ${servData[0].low_temp+String.fromCodePoint(8451)}`
                allResData.description = `Mostly ${servData[0].weather.description.toLowerCase()} throughout the day.`
                // send servData to client
                res.send(allResData)
            })
        })
    .catch( (err) => { 
        console.log(err.message)
    })
    })
})