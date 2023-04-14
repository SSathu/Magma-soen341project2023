import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    
  console.log("called handler")  
  const {email, jobid, Viewed, Accepted, job } = req.body

  try {
    const Applications = await prisma.Applications.create({
      data: {
        Email : email,
        JobId : jobid,
        Viewed: Viewed,
        Accepted : Accepted,
        JobTitle : job,
      }
    })

    res.status(200).json({ message: 'Application submitted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application' })
  }
}
