import axios from 'axios'

const eventDetail = async (req, res) => {
  const params = req.query
  const url = `${process.env.DEV_EVENT_API}/api/v1/events/${params.id[0]}`
  try {
    const response = await axios.get(url)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({error})
  }
}

export default eventDetail