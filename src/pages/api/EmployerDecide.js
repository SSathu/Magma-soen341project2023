const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function Handler(req, res){


        console.log("Called")

         const{compName, jobtitle, email, decision } = req.body;
         try{

            return res.status(200).json(decision);

         }

          catch (error) {
           console.error(error);
         }


}