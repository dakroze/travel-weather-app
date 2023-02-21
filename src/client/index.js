// Import JS Files
import { checkForCity, autoComplete, checkDate} from './js/cityChecker'
import { handleSubmit } from './js/formHandler'
import { postData } from './js/postData'
import {countries} from './js/countries'

// Import CSS files
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

// console.log("CHANGE!!");

export {
    checkForCity,
    autoComplete,
    checkDate,
    countries,
    handleSubmit,
    postData
   }
