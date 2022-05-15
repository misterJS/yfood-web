import axios from 'axios'

const talentPopup = async (req, res) => {
  const params = req.query
  const url = `${process.env.DEV_EVENT_API}/api/v1/event-session-talents/${params.talent_id[0]}/popup`
  try {
    const response = await axios.get(url)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({error})
  }
}

export default talentPopup