import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    
  console.log("called handler")  
  const {studentEmail, Notified, CompanyName, result} = req.body

  try {
    const Notifications = await prisma.Notifications.create({
      data: {
        
        studentEmail : studentEmail,
        CompanyName : CompanyName,
        Notified : Notified,
        Decision: result, 
      }
    })

    res.status(200).json({ message: 'Application submitted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application' })
  }
}
