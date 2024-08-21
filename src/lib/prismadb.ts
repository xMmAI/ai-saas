"use client"

import { PrismaClient } from "@prisma/client";

// Initialize the Prisma Client only
declare global {
    var prisma: PrismaClient | undefined;
}

// Use the global `prisma` instance if it exists; otherwise, create a new one
const prismadb = globalThis.prisma || new PrismaClient();

// Set the Prisma client globally to avoid multiple instances in development
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;

// Note: Moved Supabase client initialization to a separate file if needed for other features.
