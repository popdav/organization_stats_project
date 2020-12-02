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
            process.exit(1);
            return;
        }
    }

    async find(col, query, paging) {
        try {
            console.log(paging)
            let res = await this.db.collection(col).find(query, paging).toArray();
            return res;
        }
        catch(err) {
            console.log('MongoDB find error:')
            console.log(err);
            return;
        }
    }

    async aggregate(col, query) {
        try {
            
            let res = await this.db.collection(col).aggregate(query).toArray();
            return res;
        }
        catch(err) {
            console.log('MongoDB aggregation error:')
            console.log(err);
            return;
        }
    }

    async count(col, query) {
        try {
            
            let res = await this.db.collection(col).find(query).count();
            return res;
        }
        catch(err) {
            console.log('MongoDB count error:')
            console.log(err);
            return;
        }
    }
}

const mdb = new MongoDB();
module.exports = mdb;