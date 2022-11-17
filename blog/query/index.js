const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", async (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "postCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "commentCreated") {
    const { id, content, postId } = data;
    const post = post[postId];
    post.comments.push({ id, content });
  }

  res.send({});
});

app.listen(4002, () => console.log(`listening on 4002`));
