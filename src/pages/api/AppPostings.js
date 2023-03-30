// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a route that will handle the request to display the table
export default async function Handler(req, res){
    
    if(req.method == "POST"){
        console.log("Called")
        const { companyname, jobtitle, salary, jobdescription, location } = req.body;
   
        try {
          const loggedUser = await prisma.user.findFirst({
            where:{
              LoggedIn:true
            }
          });
          const email = loggedUser.Email;

          const existingUser = await prisma.postings.findFirst({
            where:{
              CompanyName:companyname,
              jobTitle: jobtitle,
              Salary: salary,
              jobDescription: jobdescription,
              Location: location,
              Email:email,
            }
          });

          if (existingUser) {
            return res.status(409).json({ error: 'Job Posting Already Exists' });
          }

          const newUser = await prisma.postings.create({
            data: {
              CompanyName: companyname,
              jobTitle: jobtitle,
              jobDescription: jobdescription,
              Salary: salary,
              Location: location,
              Email: email
            }
          });
          return res.status(200).json({ message: 'Job Posting Creation Successful' }); 
        } catch (error) {
          console.error(error);
        }
        
    }






}