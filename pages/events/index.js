import Head from 'next/head'
import Layout from '../../components/layout'
import EventCard from '../../components/cards/event-card'
import EventSearch from '../../components/filter-and-search/event-search'
import EventFilter from '../../components/filter-and-search/event-filter'
import { useState, useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function eventCardLoad(key) {
  return (
    <div className='animate-pulse' key={key}>
      <style jsx>{`
        .is-loading {
          background: #e2e8f0;
          background: linear-gradient(110deg, #e2e8f0 12%, #f5f5f5 25%, #e2e8f0 33%);
          border-radius: 5px;
          background-size: 200% 100%;
          -webkit-animation: 1.5s shine linear infinite;
                  animation: 1.5s shine linear infinite;
        }

        @-webkit-keyframes shine {
          to {
            background-position-x: -200%;
          }
        }
        
        @keyframes shine {
          to {
            background-position-x: -200%;
          }
        }
      `}</style>
      <div className='mb-4 relative min-h-[240px] lg:min-h-[322px]'>
        <div className='rounded-lg w-full max-w-[370px] h-[240px] lg:h-[322px] is-loading' />
      </div>
      <div className='tracking-wide min-h-[214px] lg:min-h-[230px] relative'>
        <div className='mb-2 w-full h-[30.8px] is-loading' />
        <div className='mb-4 w-1/2 h-[30.8px] is-loading' />
        <div className='mb-1 w-full h-[22.4px] is-loading' />
        <div className='mb-1 w-3/4 h-[22.4px] is-loading' />
        <div className='absolute bottom-0 left-0 right-0 '>
          <div className='mb-1 w-2/5 h-[16.8px] is-loading' />
          <div className='w-1/3 h-[16.8px] is-loading' />
        </div>
      </div>
    </div>
  )
}

let rows = []
for (let i = 0; i < 4; i++) {
  rows.push(eventCardLoad(i));
}

function Event() {
  // state 
  const [keyword, setKeyword] = useState('')
  const [absoluteFilter, setAbsoluteFilter] = useState(true)
	const [isLoading, setLoading] = useState(false)
	const [eventList, setEventList] = useState([])
  const [validation, setValidation] = useState({})

  // get keyword value
  const changeKeywordValue = (val) => {
    setKeyword(val.keyword)
  }
  
  const getEventLists = async () => {
    const res = await fetch(`/api/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    try {
      const data = res.json()
      const response = await data

      setTimeout(() => {
        if (response.status_code != 200) {
          if (response.data != '') {
            setValidation(response.data)
          } else {
            setValidation({
              fail: [response.message]
            })
          }
        } else {
          setEventList(response.data.data)
          setValidation({})
        }
        setLoading(false);
      }, 0)
    } catch (error) {
      // setValidation(error.response.data)
      setTimeout(() => {
        setLoading(false)
      }, 0)
    }
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      await getEventLists()
    }
    fetchData()
  }, [])

  return (
    <Layout>
        <Head>
          <title>YFood Hub | Events</title>
        </Head>
        <div className='bg-white pb-40'>
          <div
            id='changePosition'
            className={ classNames(
              absoluteFilter ? 'absolute left-0 right-0 z-[2]' : null,
              'bg-white pt-6'
            ) }>
              <div 
                className='w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8'>
                <div
                  className='lg:-mx-8'>
                  <EventSearch
                    changeKeywordValue={ changeKeywordValue }>
                    <EventFilter />
                  </EventSearch>
                </div>
              </div>
          </div>
          <div
            id='changePaddingTop'
            className={ classNames(
              absoluteFilter ? 'pt-[156px]' : null,
              'w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8'
              ) }>
            {/* event section */}
            <div className='mt-6'>
              <h4 className='lg:-mx-8 mb-6 text-gray-600 text-lg leading-[25.2px]'>Events</h4>
              <div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-x-6 gap-y-8 lg:-mx-8'>
                { isLoading ?
                  rows : 
                  eventList.length >= 1 ?
                  <>
                    { eventList.map((row) => (
                      <EventCard 
                        key={row.id}
                        href={'/events/' + row.id + '/' + row.slug}
                        image='/images/event-1.png'
                        title={row.name}
                        description={row.subtitle}
                        date={row.date + ' at 12:45 pm'}
                        date_color={(row.date_color == '#FFFFFF') ? 'light' : 'dark'}
                        duration={row.duration['hours'] + 'hrs ' + row.duration['minutes'] + 'mins'}
                        location={row.venue_room[0]}
                        event={row.venue_room.length >= 1 ? '' : 'Online'}
                      />
                    )) }
                    {/* <EventCard 
                      href='/events/event-1'
                      image='/images/event-1.png'
                      title='YFood Trends Talk'
                      description='Connect and make meaningful relationships with some of the key Food investors'
                      date='24 May 2022 at 12:45 pm'
                      date_color='light'
                      duration='5hrs 30mins'
                      location=''
                      event='Online'
                    />
                    <EventCard 
                      href='/events/event-2'
                      image='/images/event-2.png'
                      title='From NFTs to the Metaverse - What’s all the hype about?'
                      description='How NFTs, esports, play-to-earn, Web3 & the metaverse can create opportunities for F&D; real examples, new models & future channels '
                      date='24 May 2022 at 2:30 pm'
                      date_color='light'
                      duration='1hrs 40mins'
                      location=''
                      event='Online'
                    />
                    <EventCard
                      href='/events/event-3'
                      image='/images/event-3.png'
                      title='YFood Tech Wednesdays: London'
                      description='A short talk from an established Food Tech founder about their story & learnings, plus Q&A & networking'
                      date='25 May 2022 at 5:45 pm'
                      date_color='light'
                      duration='1hrs 40mins'
                      location=''
                      event='Online'
                    />
                    <EventCard
                      href='/events/event-4'
                      image='/images/event-4.png'
                      title='YFood Insight & Innovation Day, Connect: Now'
                      description='Automation, Delivery, Multi/New Channels, Digital Communities, the Metaverse & more'
                      date='8 June 2022 at 1:30 pm'
                      date_color='light'
                      duration='5hrs 30mins'
                      location='Oval Space, East London'
                      event=''
                    />
                    <EventCard 
                      href='/events/event-5'
                      image='/images/event-5.png'
                      title='YFood Link-Up Industry & Startup - Morning'
                      description='Startups, scaleups & innovators can book into short 1-2-1 meetings with F&D industry players'
                      date='09 June 2022 at 8:20 am'
                      date_color='light'
                      duration='4hrs 20mins'
                      location=''
                      event='Online'
                    />
                    <EventCard 
                      href='/events/event-6'
                      image='/images/event-6.png'
                      title='YFood Link-Up Industry & Startup - Afternoon'
                      description='How NFTs, esports, play-to-earn, Web3 & the metaverse can create opportunities for F&D; real examples, new models & future channels'
                      date='09 June 2022 at 2:00 pm'
                      date_color='light'
                      duration='4hrs 20mins'
                      location=''
                      event='Online'
                    />
                    <EventCard
                      href='/events/event-7'
                      image='/images/event-7.png'
                      title='YFood Link-Up Investor & Startup - Morning'
                      description='Startups, scaleups & innovators can book into short 1-2-1 meetings with leading investors'
                      date='10 June 2022 at 8:20 am'
                      date_color='light'
                      duration='3hrs 35mins'
                      location=''
                      event='Online'
                    />
                    <EventCard
                      href='/events/event-8'
                      image='/images/event-8.png'
                      title='YFood Link-Up Investor & Startup - Afternoon'
                      description='Startups, scaleups & innovators can book into short 1-2-1 meetings with leading investors'
                      date='10 June 2022 at 1:00 am'
                      date_color='light'
                      duration='4hrs 35mins'
                      location='Oval Space, East London'
                      event=''
                    />
                    <EventCard 
                      href='/events/event-9'
                      image='/images/event-9.png'
                      title='YFood Tech Wednesdays: London'
                      description='A meetup with Jamie Crummie, co-founder, Too Good to Go, Forbes 30 under 30 & hear his story & learnings'
                      date='15 June 2022 at 6:45 pm'
                      date_color='light'
                      duration='4hrs 20mins'
                      location='House of St. Barnabas, London'
                      event=''
                    />
                    <EventCard 
                      href='/events/event-10'
                      image='/images/event-10.png'
                      title='YYFood Link-Up - Experts & All Members'
                      description='All members can book into short 1-2-1 meetings with experts relevant to the world of Food Tech'
                      date='15 June 2022 at 8:50 am'
                      date_color='light'
                      duration='4hrs 20mins'
                      location=''
                      event='Online'
                    />
                    <EventCard
                      href='/events/event-11'
                      image='/images/event-11.png'
                      title='YFood Link-Up Investor & Startup - Morning'
                      description='Startups, scaleups & innovators can book into short 1-2-1 meetings with leading investors'
                      date='10 June 2022 at 8:20 am'
                      date_color='dark'
                      duration='3hrs 35mins'
                      location=''
                      event='Online'
                    />
                    <EventCard
                      href='/events/event-12'
                      image='/images/event-12.png'
                      title='YFood Link-Up Investor & Startup - Afternoon'
                      description='Startups, scaleups & innovators can book into short 1-2-1 meetings with leading investors'
                      date='10 June 2022 at 1:00 am'
                      date_color='light'
                      duration='1hrs 40mins'
                      location='Oval Space, East London'
                      event=''
                    /> */}
                  </> :
                  null
                }
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
}

export default Event