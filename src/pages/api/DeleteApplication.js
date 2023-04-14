const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function Handler(req, res){
    
  
        console.log("Called")

         const{compName, jobtitle, status, empemail } = req.body;
         try{
            const toDelete = await prisma.applications.findFirst({
                where:{
                  CompanyName:compName,
                  JobTitle:jobtitle,
                  EmployerEmail:empemail,
                }
            });
              
            console.log(compName);
            const deleted = await prisma.applications.delete({
              where: {
                id: toDelete.id,
              },
            });

            if(deleted){
                return res.status(200).json("Delete Successful");
            }else{
                return res.status(500).json({error:"Nothing to Delete"});
            }
         }
          
          catch (error) {
           console.error(error);
         }
        
    
}