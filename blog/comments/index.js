const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");
// store posts
const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  res.send(commentsByPostId[postId] || []);
});
app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const postId = req.params.id;
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => console.log(`listening on 4001`));
