const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
// const client = new MongoClient(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Projects: { type: Array },
});

// async function run() {
//   // try {
//   await client.connect();
//   const database = client.db('Wonderpets');
//   const collection = database.collection('Users');
//   const docCount = await collection.countDocuments({});

// }
// run().catch(console.dir);

const projectSchema = new Schema({
  Name: { type: String, required: true },
  Links: { type: Array },
  DateCreated: { type: Date, default: Date.now },
  Notes: { type: String },
});

const linkSchema = new Schema({
  Title: { type: String, required: true },
  Link: { type: String },
  DateCreated: { type: Date, default: Date.now },
  Comment: { type: String },
  Tags: { type: Array },
  Favorite: { type: Boolean },
});

const Projects = mongoose.model("Projects", projectSchema);
const Users = mongoose.model("Users", userSchema);
const Links = mongoose.model("Links", linkSchema);
module.exports = { Users, Links, Projects };
