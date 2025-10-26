import express from "express";
import prisma from "../../prisma.js";

const authRouter = express.Router();

authRouter.post("/createUser", async (req, res) => {
  const { name, email, username, profileImage } = req.body;

  // Basic validation
  if (!name || !email || !username) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and username are required",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email or username already exists",
        user: existingUser, // send existing user if already registered
      });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        profileImage,
      },
    });

    // Send created user back
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
});

export default authRouter;
