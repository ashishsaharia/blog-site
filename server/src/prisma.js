const { PrismaClient } = require('./generated/prisma');

// Create a single instance to avoid multiple connections
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;


// To use this import
// import prisma from '../prisma.js';