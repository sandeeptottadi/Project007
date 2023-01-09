const express = require("express");
const app = express()
const env = require('dotenv')
const mongoose = require("mongoose");
const Post = require("./post_schema")
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

env.config();


mongoose.set('strictQuery', true)
mongoose.connect(`mongodb+srv://sandeeptottadi:${process.env.Database_password}@cluster0.mqb2isn.mongodb.net/?retryWrites=true&w=majority`, {useNewUrlParser: true})
const db = mongoose.connection;

db.once("open", () => {
    console.log("connected");
})

app.use(cors());

app.get("/get_posts", async(req, res) => {
    const data = await Post.find()
    res.json(data)
})

app.post("/create_new_post", async (req, res) => {
    const newPost = await new Post({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    type: req.body.type
    })
    newPost.save(function (err, data) {
        if (err) {
          return res.status(400).send(err);
        }
        return res.json(data);
      });
})


app.listen(5000)