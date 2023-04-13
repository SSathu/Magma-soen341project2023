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
              },
              select:{
                Occupation:true
              }
            });
        
        if(loggedUser.Occupation == "student"){
            res.status(200).json("student");

        }else{
            res.status(201).json("employer");
        }


        res.status(200);
    }catch(error){
        console.log(error);
    }
}
}
