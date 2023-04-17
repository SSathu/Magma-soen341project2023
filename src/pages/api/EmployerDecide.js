const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function Handler(req, res){
    
  

         const{CompanyName, JobPosition, StudentEmail, Decision } = req.body;
         try{
            
            if(Decision == 'accepted'){
                const existingAccount = await prisma.applications.updateMany({
                    where: {
                        CompanyName:CompanyName,
                        JobTitle:JobPosition,
                        StudentEmail:StudentEmail,
                    },
                    data:{
                        Viewed:true,
                        Accepted:true,
                        GaveDecision: true
                    },
    
                  });
                  if(existingAccount){
                    return res.status(200).json({message:"WORKED"});
    
                } else{
                    return res.status(500).json({error:"NO WORK"});
    
                }
            }
            if(Decision == 'declined'){
                const existingAccount = await prisma.applications.updateMany({
                    where: {
                        CompanyName:CompanyName,
                        JobTitle:JobPosition,
                        StudentEmail:StudentEmail,
                    },
                    data:{
                        Viewed:true,
                        Accepted:false,
                        GaveDecision: true,
                    },
    
                  });
                  if(existingAccount){
                    return res.status(200).json({message:"WORKED"});
    
                } else{
                    return res.status(500).json({error:"NO WORK"});
    
                }
            }
            

          
            

         }
          
          catch (error) {
            return res.status(500).json({error});
         }
        
    
}