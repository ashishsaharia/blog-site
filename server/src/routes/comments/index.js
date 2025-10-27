import express from "express";
import prisma from '../../prisma.js';
const commentRouter = express.Router();


commentRouter.get("/", (req, res) => {
  res.send("Comments route is working!");
});

// ============================================
// GET /api/comments/post/:postId - Get all comments for a post
// ============================================
commentRouter.get('/post/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
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
      },
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments', message: error.message });
  }
});


// ============================================
// GET /api/comments/:id - Get single comment
// ============================================
commentRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            profileImage: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comment', message: error.message });
  }
});

// ============================================
// POST /api/comments - Create a new comment
// ============================================
commentRouter.post('/post', async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    // Validate required fields
    if (!postId || !userId || !content) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['postId', 'userId', 'content'],
      });
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        postId: parseInt(postId),
        userId: parseInt(userId),
        content,
      },
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
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment', message: error.message });
  }
});


// ============================================
// PUT /api/comments/:id - Update a comment
// ============================================
commentRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    // need user id as well to verify ownership
    if (existingComment.userId !== parseInt(req.user.id)) {
  return res.status(403).json({ error: 'Unauthorized' });
}


    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    // Check if comment exists
    const existingComment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { content },
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
    });

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment', message: error.message });
  }
});


// ============================================
// DELETE /api/comments/:id - Delete a comment
// ============================================
commentRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if comment exists
    const existingComment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await prisma.comment.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment', message: error.message });
  }
});





export default commentRouter;