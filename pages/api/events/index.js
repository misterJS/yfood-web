import axios from 'axios'

const eventList = async (req, res) => {
  let url = `${process.env.DEV_EVENT_API}/api/v1/events/list?limit=100`
  
  try {
    const response = await axios.get(url)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({error})
  }
}

export default eventList