const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function Handler(req, res){
    
  
        console.log("Called")

         const{notificationID } = req.body;
         try{
           
            const deleted = await prisma.notifications.delete({
              where: {
                id: notificationID,
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