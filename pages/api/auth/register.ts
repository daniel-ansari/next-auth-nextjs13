import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const hashedPassword = await bcrypt.hashSync(req.body.password, 10)
      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        },
      })
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: 'Could not create user' })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
