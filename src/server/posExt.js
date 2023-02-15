const FormData = require('form-data');
const fetch = require('node-fetch');
const URL = "https://api.meaningcloud.com/sentiment-2.1";
const posExt = async (key, url) => {

// console.log(`Your API key is ${process.env.API_KEY}`)
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

module.exports = posExt;