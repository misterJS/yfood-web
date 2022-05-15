import axios from 'axios'

const resetPassword = async (req, res) => {
  const url = `${process.env.DEV_GATEWAY_API}/customer/yfood/reset-password`
  const body = req.body
  
  try {
    const response = await axios.post(url, body)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({error})
  }
}

export default resetPassword