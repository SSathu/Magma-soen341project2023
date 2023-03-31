// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a route that will handle the request to display the table
export default async function Handler(req, res){
    
    if(req.method == "POST"){
        console.log("Called")
        const { firstname, lastname, email, password, occupation } = req.body;
   
        try {
          
          const existingUser = await prisma.user.findFirst({
            where:{
              Email:email
            }
          });

          if (existingUser) {
            // If the email already exists, return a 409 Conflict response
            return res.status(409).json({ error: 'Email already exists' });
          }

          const newUser = await prisma.user.create({
            data: {
              FirstName: firstname,
              LastName: lastname,
              Email: email,
              Password: password,
              LoggedIn: false,
              Occupation: occupation
            }
          });
          return res.status(200).json({ message: 'Login successful' }); 
          console.log(newUser); // Add this line to log the newUser object
        } catch (error) {
          console.error(error);
        }
        
    }


    res.status(200)




}