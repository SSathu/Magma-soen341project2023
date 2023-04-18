// Import the Prisma client instance
import { PrismaClient } from '@prisma/client';

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a function to retrieve the values from the database
async function getSelectBoxValues() {
  const values = await prisma.postings.findMany({
    select: {
      CompanyName: true,
    },
  });
  return values.map((item) => item.valueColumn);
}

export default async function getSelectBoxValues2(req, res) {
    const values = await prisma.postings.findMany({
        select: {
          CompanyName: true,
        },
      });  res.status(200).json(values);
}