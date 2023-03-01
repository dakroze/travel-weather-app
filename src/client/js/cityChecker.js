function checkForCity(inputCountry,inputCity, inputDate) {
    console.log("::: Running checkForText :::");
    if(!inputCountry || !inputCity || !inputDate) {
        alert('One of the input fields is empty.')
        return "NOK";
    }
    else if(!isNaN(inputCountry) || !isNaN(inputCity) ){
        alert("You have entered a number.")
        return "NOK";
    }
    else {
        return "OK"
    }
}

/* checkDate function will test to make sure user date input is 
    between 0 - 16 days from current date */

function checkDate(userdate) {
    // get current date
    const date = new Date();
    const dateNow = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    console.log(dateNow)
    const nowYear = parseInt(dateNow.slice(0,4))
    const nowMonth = parseInt(dateNow.slice(5,7))
    const nowDay = parseInt(dateNow.slice(8,10))
    // convert to date String to Int
    const userYear = parseInt(userdate.slice(0,4))
    const userMonth = parseInt(userdate.slice(5,7))
    const userDay = parseInt(userdate.slice(8,10))
    if (userYear !== nowYear) {
        alert("This application only works for dates that are no more than 16 days out. It also doesn't work for past dates.")
    } else if ((userMonth - nowMonth) > 1 || (userMonth - nowMonth) < 0) {
        alert("This application only works for dates that are no more than 16 days out. It also doesn't work for past dates.")
    } else if ((userMonth - nowMonth) === 1){
        // conditional statement for months with 28 days (February)
        if (nowMonth == '02') {
            if((((28 - nowDay) + userDay) > 16)) {
                alert("This application only works for dates that are no more than 16 days out.")
            } else {return "Pass"}
            // conditional statement for months with 30 days
        }else if (nowMonth == '04' || nowMonth == '06' || nowMonth == '09' || nowMonth == '11') {
            if(((30 - nowDay) + userDay > 16)){
                alert("This application only works dates that are no more than 16 days out.")
            } else {return "Pass"}
        }
            // conditional statement for months with 31 days
        else{
            if ((31 - nowDay) + userDay > 16) {
                alert("This application only works dates that are no more than 16 days out.")
            } else {return "Pass"}
        }
    } else if (userMonth - nowMonth === 0){
        if( userDay - nowDay > 16 ){
            alert('This application only works dates that are no more than 16 days out.')
        }
        else if (userDay - nowDay < 0){
            alert('This is a past date. Please re-enter travel date.')
        } else {return 'Pass'}

    } else {
        return "Pass"
    }
}
      


function autoComplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a div element that will contain the items (values):*/
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the div element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        const matches = arr.filter((item) => {
            if(item.toLowerCase().includes(val) || item.includes(val)){
                return true;
            }
        })
        /*create a div element for each matching element:*/
        matches.forEach((item) => {
            b = document.createElement("div");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + item.substring(0, val.length) + "</strong>";
            b.innerHTML += item.substring(val.length);
            /*insert an input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + item + "'>";
            /* execute a function when someone clicks on the item value (div element) */
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /* close the list of autocompleted values,
                (or any other open lists of autocompleted values */
                closeAllLists();
            });
            a.appendChild(b);

        })
     });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) {x = x.getElementsByTagName("div")}
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /* and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) {x[currentFocus].click()}
              }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) {return false}
          /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) {currentFocus = 0}
        if (currentFocus < 0) {currentFocus = (x.length - 1)}
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
          closeAllLists(e.target);
    });
}

export { checkForCity, autoComplete, checkDate }
