import express from "express";
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

const postRouter = express.Router();
// Placeholder route
postRouter.get("/", (req, res) => {
  res.send("Posts route is working!");
});

// postRouter.post("/addusertodb", async (req, res) => {
//   const { name, email, username } = req.body;
//   try {
//     const user = await prisma.user.create({
//       data: {
//         username,
//         name,
//         email,
//       },
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add user" });
//   }
// });

export default postRouter;