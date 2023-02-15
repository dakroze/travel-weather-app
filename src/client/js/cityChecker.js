function checkForCity(inputText) {
    console.log("::: Running checkForText :::", inputText);
    if(!inputText) {
        alert('No input provided')
        return "NOK";
    }
    else if(!isNaN(inputText)){
        alert("This AI only works on english sentences. Please re-enter input")
        return "NOK";
    }
    else {
        return "OK"
    }
}

export { checkForCity }
