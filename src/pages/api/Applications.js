// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a route that will handle the request to display the table
export default async function Handler(req, res){
    
  const applications = await prisma.Applications.findMany()

    // console.log(apps);
    res.status(200).json(applications)




}