import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    
  console.log("called handler")  
  const {studentEmail, jobid, Viewed, Accepted, EmployerEmail, firstname, lastname, jobtitle, companyName} = req.body

  try {
    const Applications = await prisma.Applications.create({
      data: {
        EmployerEmail : EmployerEmail,
        StudentEmail : studentEmail,
        FirstName : firstname,
        LastName : lastname,
        JobId : jobid,
        Viewed: Viewed,
        Accepted : Accepted,
        JobTitle : jobtitle,
        CompanyName : companyName,
      }
    })

    res.status(200).json({ message: 'Application submitted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application' })
  }
}
