// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a route that will handle the request to display the table
export default async function Handler(req, res){
    
    if (req.method === 'GET') {
      
      try {
        const loggedUser = await prisma.user.findFirst({
          where:{
            LoggedIn:true
          }
        });
        const email = loggedUser.Email;

        const appliedJobs = await prisma.applications.findMany({
          where: {
            Email: email
          },
          select: {
            JobId: true,
            Viewed: true,
            Accepted: true
          }
        });

        const jobIds = appliedJobs.map(job => job.JobId);

        const myPostings = [];
        for (const jobId of jobIds) {
          const posting = await prisma.postings.findFirst({
            where: {
              id: jobId
            },
            select: {
              CompanyName: true,
              jobTitle: true
            }
          });
          if (posting) {
            const application = appliedJobs.find(job => job.JobId === jobId);
            myPostings.push({
              ...posting,
              Viewed: application.Viewed,
              //Accepted: application.Accepted
            });
          }
        }
        
        console.log('Here');
        res.status(200).json(myPostings);
      
      }catch(error){
          console.log(error);
          res.status(500).json({ message: 'Internal Server Error' });
      }

    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
}
