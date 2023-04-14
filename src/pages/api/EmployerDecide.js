// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define a route that will handle the request to display the table
export default async function Handler(req, res){
    
    if(req.method == "POST"){
        console.log("Called")

        const{compName, jobtitle, studentemail, decision} = req.body;
        try{
            
            // const currentApplication = await prisma.applications.update({
            //   where:{
            //     CompanyName:compName,
            //     JobTitle:jobtitle,
            //     StudentEmail:studentemail,              
            //   },
            //   data:{
            //     Accepted:true
            //   }
            // });

            const logId = loggedUser.id;

            if(currentApplication){
                return res.status(200).json(decision);
            }else{
                return res.status(500).json({error:"Nothing to Delete"});
            }
            
              
              }
        
          
         catch (error) {
          console.error(error);
        }
        
    }
}
