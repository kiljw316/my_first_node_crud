const express = require('express');
const Posts = require("../schemas/posts");
  
const router = express.Router();


router.get("/posts", async (req, res, next) => {
  try {
    const posts = await Posts.find({}, {'_id': false, 'password': false}).sort("-createdAt");
    res.json({ posts: posts });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { title, description, author, password } = req.body;
    await Posts.create({ title, description, author, password });
  } catch (err) {
    console.log(err);
  }
  
  res.send({ result: "success" });
});

router.get("/post/:postNum", async (req, res) => {
  try {
    const { postNum } = req.params;
    const post = await Posts.find({ postNum }, {'_id': false, 'password': false});
    res.json({ post: post });
    
  } catch (err) {
    console.log(err);
  }
});

router.delete('/post/:postNum', async (req, res) => {
  try {
    const { postNum } = req.params;
    const { password } = req.body;
    const post = await Posts.findOne({ postNum: postNum, password: password });
    if (post) {
      await Posts.deleteOne({ postNum });
      res.send({ result: "success" });
    } else {
      res.send({ result: "failure" });
    }
    
  } catch (err) {
    console.log(err);
  }
});

router.patch('/post/:postNum', async (req, res) => {
  try {
    const { postNum } = req.params;
    const { title, description, author, password } = req.body;
    const post = await Posts.findOne({postNum: postNum, password: password});
    if (post) {
      await Posts.updateOne({postNum}, { title: title, description: description, author: author } )
      res.send({ result: "success" });
    } else {
      res.send({ result: "failure" });
    };

  } catch (err) {
    console.log(err);
  }
});
module.exports = router;