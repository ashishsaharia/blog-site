import express from "express";
import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

const authRouter = express.Router();


export default authRouter;
