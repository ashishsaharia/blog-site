
import { PrismaClient } from './generated/prisma/index.js';// Create a single instance to avoid multiple connections
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;


// To use this import
// import prisma from '../../prisma.js';
