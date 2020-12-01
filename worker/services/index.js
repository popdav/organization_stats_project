const axios = require('axios');

const getSessionToken = async (masterToken) => {
    try{
        const res = await axios.get('https://www.insidemaps.com/api/v2/sessionToken', {
            headers: {
                'Authorization': 'Bearer ' + masterToken
            }
        }); 
        console.log(res.data);
        return res.data.data
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}

module.exports = {getSessionToken}

