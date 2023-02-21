function handleSubmit(event) {
    event.preventDefault()
    // create object that will store user info put into form fields
    let formData = {};
    // extract country ISO code
    formData.country = document.getElementById('myInput').value.slice(0,3)
    formData.city = document.getElementById('city').value
    formData.date = document.getElementById('date').value
    console.log(formData)

    if (Client.checkForCity(formData.country,formData.city,formData.date) === "NOK"){
        throw new Error('Input is either empty or isnt text. Please check input');
    }
    else {
        console.log("::: Form Submitted :::")


        Client.postData('http://localhost:8081/travelTime',formData)
        .then( data => {
            score.innerHTML = `::: Score_Tag: ${Client.scoreCheck(data.score_tag)} :::`
            sub.innerHTML = `::: Subjectivity: ${data.subjectivity} :::`
            text.innerHTML = `::: Text: ${data.text} :::`
        })
    }
}

export {handleSubmit}
