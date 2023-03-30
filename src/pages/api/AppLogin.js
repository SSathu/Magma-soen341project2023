// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a route that will handle the request to display the table
export default async function Handler(req, res){
    
    if(req.method == "POST"){
        console.log("Called")

        const{email, password } = req.body;
        try{
            
            const loggedUser = await prisma.user.findFirst({
              where:{
                Email:email
              }
            });
            const logId = loggedUser.id;

            const existingAccount = await prisma.user.update({
                where: {
                  id:logId,
                },
                data:{
                  LoggedIn:true},

              });

              if (!existingAccount) {
                return res.status(401).json({ error: 'Invalid login credentials' });
              }else{
                //  const updatedEntry = await prisma.user.update.findFirst({
                //    where: { Email:email},
                //    data: { LoggedIn: true },
                // });
                return res.status(200).json({ message: 'Login successful' }); 
              
              }
        }
          
         catch (error) {
          console.error(error);
        }
        
    }
}
