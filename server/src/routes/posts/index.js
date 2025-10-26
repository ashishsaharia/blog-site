import express from "express";
const postRouter = express.Router();

// Placeholder route
postRouter.get("/", (req, res) => {
  res.send("Posts route is working!");
});

export default postRouter;