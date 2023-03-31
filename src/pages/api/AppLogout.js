// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a route that will handle the request to display the table
export default async function Handler(req, res){
    
    if(req.method == "POST"){
        console.log("Called")

        try{
            
            const loggedUser = await prisma.user.findFirst({
              where:{
                LoggedIn:true
              }
            });
            const logId = loggedUser.id;

            const existingAccount = await prisma.user.update({
                where: {
                  id:logId,
                },
                data:{
                  LoggedIn:false},

              });
            
            if(!existingAccount){
                return res.status(409).json({error: 'Account does not exist'});
            }
              return res.status(200).json({ message: 'Logout successful' }); 

        }
          
         catch (error) {
          console.error(error);
        }
        
    }
}
