const mongoose = require('mongoose');

const connectToDB = async (url) => {
    try{
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    }
    catch (err) {
        throw err;
    }
}

module.exports = {connectToDB}