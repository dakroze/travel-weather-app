function checkForText(inputText) {
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

function scoreCheck(scoretag){
    switch (scoretag) {
        case "P+":
            return "Strong positive";
        case "P":
            return "Positive";
        case "NEU":
            return "Neutral";
        case "N":
            return "Negative";
        case "N+":
            return "Strong negative";
        case "NONE":
            return "Without sentiment";
        default:
            return "No data";
    }
}
export { checkForText, scoreCheck }
