const FormData = require('form-data');
const fetch = require('node-fetch');
const URL = "https://api.meaningcloud.com/sentiment-2.1";

// Fetch post request function postFetch
const postFetch = async (key, url) => {
    const formdata = new FormData();
    formdata.append("key", key);
    formdata.append("url", url);
    formdata.append("lang", 'en');  // 2-letter code, like en es fr ...
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    const response = await fetch(URL, requestOptions)
    try {
        const res = await response.json()
        console.log(res)
        const data =  {
                        score_tag: res.score_tag,
                        subjectivity: res.subjectivity,
                        text: res.sentence_list[Math.floor(Math.random() * res.sentence_list.length)].text
                      }
        console.log(data)
        return data
    }
    catch(err) {
        console.log(err, error.message)
    }
}
// Fetch GET request function getFetch
const getFetch = async (url) => {
    const result = await fetch(url);
    try{
        const res = await result.json();
        return res
    } catch (err) {
        console.log(err, error.message)
    }
}

exports.fetchSumtin = getFetch;