const fetch = require('node-fetch');
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