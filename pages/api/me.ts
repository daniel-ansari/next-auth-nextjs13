import prisma from "../../lib/prismadb";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // const session = await getSession({ req })
  // if (!session) {
  //   return res.status(401).send('Unauthorized')
  // }
  // const user = await prisma.user.findUnique({
  //   where: { email: session.user.email },
  // })
  // if (!user) {
  //   return res.status(404).send('User not found')
  // }
  // return res.json(user)
};

export default handler;
