const mongoose =require("mongoose");
const {MongoClient,ServerApiVersion}  =require("mongodb");
require("dotenv").config();

const MONGODB_URL= process.env.MONGODB_URL ;

const client = new MongoClient(MONGODB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      await client.connect();
    //   await client.db("ProjectUsers");
      console.log("Successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

