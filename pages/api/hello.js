// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import protectAPI from '../../middleware/protectApi';

const handler = (req, res) => {
  return res.status(200).json({ message: 'Hello Ari !' })
}

export default protectAPI(handler)
