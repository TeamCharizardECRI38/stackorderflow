const mongoose = require("mongoose");


require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  Title: { type: String, required: true },
  Link: { type: String },
  DateCreated: { type: Date, default: Date.now },
  Comment: { type: String },
  Tags: { type: Array },
  Favorite: { type: Boolean },
  TopAnswer: { type: String },
});


const Links = mongoose.model('Links', linkSchema);


const projectSchema = new Schema({
  Name: { type: String, required: true },
  Links: [{ type: Schema.Types.ObjectId, ref: Links }],
  DateCreated: { type: Date, default: Date.now },
  Notes: { type: String },
});

const Projects = mongoose.model("Projects", projectSchema);

const userSchema = new Schema({
  Name: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Projects: [{ type: Schema.Types.ObjectId, ref: Projects }],
});


const Users = mongoose.model('Users', userSchema);


module.exports = { Users, Links, Projects };
