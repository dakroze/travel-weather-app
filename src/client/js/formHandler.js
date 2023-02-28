import { checkDate } from "./cityChecker";

function handleSubmit(event) {
    event.preventDefault()
    // create object that will store user info put into form fields
    let formData = {};
    // extract country ISO code
    formData.country = document.getElementById('country').value.slice(0,3)
    formData.city = document.getElementById('city').value
    if (checkDate(document.getElementById('date').value) === 'Pass'){
        formData.date = document.getElementById('date').value
    }

    if (Client.checkForCity(formData.country,formData.city,formData.date) === "NOK"){
        throw new Error('Input is either empty or isnt text. Please check input.');
    }
    else {
        console.log("::: Form Submitted :::")

        let img = document.getElementById('pic')
        let myCity = document.getElementById('myCity')
        let myCountry = document.getElementById('myCountry')
        let myDate = document.getElementById('myDate')
        let hiLo = document.getElementById('hiLo')
        let myDesc = document.getElementById('myDesc')
        Client.postData('http://localhost:8081/travelTime',formData)
        .then( data => {
            img.src = data.pictureURL
            myCity.innerHTML = formData.city[0].toUpperCase() + formData.city.slice(1);
            myCountry.innerHTML = document.getElementById('country').value[3].toUpperCase() + document.getElementById('country').value.slice(4);
            myDate.innerHTML = formData.date
            hiLo.innerHTML = `${data.weatherHigh}, ${data.weatherLow}`
            myDesc.innerHTML = data.description
            document.getElementById('user-fb-wrapper').style.display = 'grid';
        })
    }
}

export {handleSubmit}
