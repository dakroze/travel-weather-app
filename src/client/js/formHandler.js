import { checkDate } from "./cityChecker";

function handleSubmit(event) {
    event.preventDefault()
    // create object that will store user info put into form fields
    let formData = {};
    // extract country ISO code
    formData.country = document.getElementById('myInput').value.slice(0,3)
    formData.city = document.getElementById('city').value
    if (checkDate(document.getElementById('date').value) === 'Pass'){
        formData.date = document.getElementById('date').value
    }
    console.log(formData)

    if (Client.checkForCity(formData.country,formData.city,formData.date) === "NOK"){
        throw new Error('Input is either empty or isnt text. Please check input.');
    }
    else {
        console.log("::: Form Submitted :::")

        const high = document.getElementById('high')
        const img = document.getElementById('pic')
        Client.postData('http://localhost:8081/travelTime',formData)
        .then( data => {
            img.src = data.pictureURL
            high.innerHTML = `::: Score_Tag: ${data.weatherData.weather.description} :::`
            // sub.innerHTML = `::: Subjectivity: ${data.subjectivity} :::`
            // text.innerHTML = `::: Text: ${data.text} :::`
        })
    }
}

export {handleSubmit}
