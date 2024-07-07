const { MongoClient } = require("mongodb"); 
require("dotenv").config({path: "./config.env"});

async function main() {
    const db = process.env.ATLAS_URI;
    const client = new MongoClient(db); //creates new Mongo client & logs in using user/pw in config.env

    try {
        await client.connect();
        const database = client.db("synergplus");
        const collections = await database.collections();
        collections.forEach((collection) => console.log(collection.collectionName));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
};

main();