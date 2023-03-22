// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a route that will handle the request to display the table
export default async function Handler(req, res){
    
    if(req.method == "POST"){
        console.log("Called")
        const { firstname, lastname, email, password } = req.body;
   
        try {
          const newUser = await prisma.user.create({
            data: {
              FirstName: firstname,
              LastName: lastname,
              Email: email,
              Password: password,
              LoggedIn: false
            }
          });
          console.log(newUser); // Add this line to log the newUser object
        } catch (error) {
          console.error(error);
        }
        
    }


    res.status(200)




}