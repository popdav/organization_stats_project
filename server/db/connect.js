const MongoClient = require('mongodb').MongoClient;

class MongoDB {
    constructor(){
        this.url = '';
        this.dbName = '';
    }

    async connect(url, db) {
        try {
            this.client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            this.db = this.client.db(db);
            console.log('Connected to MongoDB');
        }
        catch(err) {
            console.log('MongoDB connection error:');
            console.log(err);
            return;
        }
    }

    async find(col, query) {
        try {
            let res = await this.db.collection(col).find(query).toArray();
            return res;
        }
        catch(err) {
            console.log('MongoDB find error:')
            console.log(err);
            return;
        }
    }
}

const mdb = new MongoDB();
module.exports = mdb;