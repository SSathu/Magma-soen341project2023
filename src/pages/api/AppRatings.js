// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a route that will handle the request to display the table
export default async function Handler(req, res){
    
    if(req.method == "POST"){
        console.log("Called")
        const { CompanyName, CompanyReview, Rating } = req.body;
   
        const loggedUser = await prisma.user.findFirst({
            where:{
              LoggedIn:true
            }
          });

    const Email = loggedUser.Email;
    const FirstName = loggedUser.FirstName;
    const LastName = loggedUser.LastName;

    console.log("called2")
        try {
          
          const existingRating = await prisma.ratings.findFirst({
            where:{
              Email:Email,
              CompanyName:CompanyName

            }
          });

          if (existingRating) {
            // If the email already exists, return a 409 Conflict response
            return res.status(409).json({ error: 'Rating already submitted before' });
          }

          const newRating = await prisma.ratings.create({
            data: {
              Email: Email,
              FirstName: FirstName,
              LastName: LastName,
              CompanyName:CompanyName,
              CompanyReview:CompanyReview,
              Rating:Rating,
            }
          });
          return res.status(200).json({ message: 'Rating Submission Successful' }); 
          console.log(newUser); // Add this line to log the newUser object
        } catch (error) {
          console.error(error);
        }
        
    }


    res.status(200)




}