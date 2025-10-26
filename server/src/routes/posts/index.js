import express from "express";
// import { PrismaClient } from '../../generated/prisma/index.js';

// const prisma = new PrismaClient();

import prisma from '../../prisma.js';
const postRouter = express.Router();
// Placeholder route
postRouter.get("/", (req, res) => {
  res.send("Posts route is working!");
});

postRouter.post("/addusertodb", async (req, res) => {
  const { name, email, username } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error});
  }
});


postRouter.get('/getposts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [posts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              profileImage: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
      }),
      prisma.post.count(),
    ]);

    res.json({
      data: posts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts', message: error.message });
  }
});


postRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id }, // assume id is String (cuid)
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            bio: true,
            profileImage: true,
          },
        },
        comments: {
          take: 5, // fetch only first 5 comments
          orderBy: { createdAt: 'desc' }, // newest first
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                profileImage: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true, // total count of comments
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post', message: error.message });
  }
});


postRouter.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            bio: true,
            profileImage: true,
          },
        },
        comments: {
          take: 5, // fetch only first 5 comments
          orderBy: { createdAt: 'desc' }, // newest first
          include: {
            author: {
              select: {
                id: true,
                username: true,
                name: true,
                profileImage: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true, // total count of comments
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post', message: error.message });
  }
});




export default postRouter;