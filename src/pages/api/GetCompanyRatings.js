import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const companies = await prisma.ratings.groupBy({
      by: ['CompanyName'],
      _count: { CompanyName: true },
      _avg: { Rating: true },
    })

    res.status(200).json(companies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}