import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Icon from 'react-feather'
import Layout from '../../components/layout'
import Accordion from '../../components/accordion'
import Modal from '../../components/modal'
import Image from 'next/image'

const EventDetails = () => {
  const router = useRouter()
  const { id } = router.query
  let event = {}
  let talent = {}

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [eventId, setEventId] = useState(null)
  const [eventData, setEventData] = useState(null)
  const [talentData, setTalentData] = useState(null)
  const [scroll, setScroll] = useState(1)
  const [speakerModal, setSpeakerModal] = useState(false)

  const getEvenDetail = async () => {

    const res = await fetch(`/api/events/${id[0]}`, {
      query: {id : id[0]},
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    try {
      const data = res.json()
      const response = await data

      setTimeout(() => {
        setEventData(response.data)
        event = response.data
      }, 0)
    } catch (error) {
      // console.log(error);
    }
  }

  // running on mount
  useEffect(() => {
    if(!router.isReady) return;
    setEventId(id[0])

    const onScroll = () => {
      const scrollCheck = window.scrollY < 320
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck)
      }
    }

    document.addEventListener("scroll", onScroll)
    // cleaning up from the web API
    // return () => {
    //   document.removeEventListener("scroll", onScroll)
    // }
    if (id) {
      const fetchData = async () => {
        await getEvenDetail()
      }

      if (id[0] && !eventData) fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scroll, setScroll, router.isReady, eventData, id])

  const openSpeakerModal = async (id) =>{
    const res = await fetch(`/api/events/popup/${id}`, {
      query: {talent_id : id},
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    try {
      const data = res.json()
      const response = await data

      setTimeout(() => {
        setTalentData(response.data)
        talent = response.data

        setSpeakerModal(true)
      }, 0)
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <Layout>
        <Head>
          <title>YFood Hub | Event Details</title>
        </Head>
        <Modal 
          onClose={() => setSpeakerModal(false)}
          size='max-w-5xl'
          image={'url(/images/person-1.jpeg)'}
          show={speakerModal}>
            { talentData ?
              <div className='text-gray-400 tracking-[0.02em]'>
                <h3 className='text-black text-2xl leading-[28.8px] font-black mb-[2px]'>{talentData.firstname + ' ' + talentData.surname}</h3>
                <p className='text-lg leading-[25.2px] mb-[10px]'>{talentData.job_title}</p>
                <div className='text-green-400 text-lg leading-[25.2px] font-semibold'>{talentData.work_place}</div>
                <div className='text-base leading-[22.4px] mt-8'>
                  {talentData.biography}
                </div>
                <div className='pt-6'>
                  <p className='mb-2 text-lg leading-[25.2px]'>Events</p>
                  <div className='relative no-scrollbar shadow-inner_white'>
                    <style jsx> {`
                        .no-scrollbar::-webkit-scrollbar {
                          display: none;
                        }

                        .no-scrollbar {
                          -ms-overflow-style: none; /* IE and Edge */
                          scrollbar-width: none; /* Firefox */
                        }

                        .shadow-inner_white:before {
                          content: '';
                          position: absolute;
                          top: 0;
                          bottom: 0;
                          right: -20px;
                          width: 80px;
                          background: linear-gradient(270deg, #FFFFFF 37.25%, rgba(255, 255, 255, 0) 100%);
                          z-index: 1;
                        }
                      `}
                    </style>
                    <div className='relative flex overflow-auto space-x-2 no-scrollbar pr-14'>
                      { talentData.events.map((item) => (
                        <Image src='/images/event-1.png'
                          className='w-[100px] h-[100px] rounded-[5px]'
                          alt=''
                          key={item.id} />
                      ))}
                    </div>
                  </div>
                </div>
              </div> : null
            }
        </Modal>
        { eventData ? 
        <>
          <div className={ classNames(
            scroll ? 'top-0 -translate-y-full' : 'top-[88px] translate-y-0',
            'w-full py-4 fixed bg-white shadow-lg z-[9] transition-all duration-300 ease-linear hidden lg:block'
          ) }>
            <div className='w-full max-w-[998px] mx-auto flex justify-between items-center '>
              <div>
                <h1 className='font-fjalla text-[40px] leading-[56px] tracking-[0.04em] mb-1'>{eventData.name}</h1>
                <p className='font-lato text-[18px] leading-[25.2px] tracking-[0.02em]'>{eventData.start_date}  •  {eventData.start_time}</p>
              </div>
              <div className='flex justify-between items-center'>
                <button className='bg-[#D3D3D3] text-gray-400 text-base tracking-[0.02em] py-4 px-20 rounded-full mr-2
                  hover:bg-green-400 hover:text-white hover:cursor-pointer transition-all duration-300 ease-in-out'>Register</button>
                <button className='bg-[#D3D3D3] text-gray-400 text-base tracking-[0.02em] p-[18px] rounded-full mr-2
                  hover:bg-green-400 hover:text-white hover:cursor-pointer transition-all duration-300 ease-in-out'>
                  <Icon.Share2 className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
          <div
            className='h-[320px] bg-cover bg-center bg-no-repeat' style={{backgroundImage: 'url(/images/event-1.png)' }}>
          </div>
          <div className='w-full pt-10 pb-24'>
            <section id="header"
              className='w-full max-w-[998px] mb-10 mx-auto px-5 lg:px-0'>
              <h2
                className='font-fjalla text-[40px] leading-[56px] mb-1 text-black tracking-[0.04em]'>
                  {eventData.name}
              </h2>
              <span
                className='font-lato text-[18px] leading-[25.2px] mb-4 text-gray-600 tracking-[0.023em] block'>
                {eventData.start_date}  •  {eventData.start_time}
              </span>
              <p
                className='font-lato text-[22px] leading-[30.8px] mb-3 text-gray-800 trackgin-[0.02em] font-bold'>
                {eventData.subtitle}
              </p>
              <div className='font-lato text-sm leading-[16.8px] flex space-x-2'>
                <div className='inline-flex items-center px-4 text-gray-50 bg-[#0095A9] rounded-full h-10'>
                  <div className='bg-[#F0F0F0] w-7 h-7 rounded-full mr-[10px]'></div>
                  <span>{eventData.event_type}</span>
                </div>
                { eventData.content_themes.map((item) => (
                  <div 
                    className='inline-flex items-center px-6 text-gray-50 bg-[#00A88D] rounded-full h-10'
                    key={item.id}>
                    <span>{item.short_description}</span>
                  </div>
                ))}
              </div>
            </section>
            <section id="content"
              className='font-lato text-[18px] leading-[25.2px] text-gray-600 tracking-[0.023em]'>
              <div className='w-full max-w-[998px] mx-auto px-5 lg:px-0'>
                <div
                  className='mb-16'
                   dangerouslySetInnerHTML={{
                    __html: eventData.description
                  }} />
              </div>
              {/* event speaker */}
              <div
                className='w-full max-w-[998px] mx-auto px-5 lg:px-0'>
                <h4
                  className='mb-6 font-bold leading-[27px] text-black'>
                  Event Speakers
                </h4>
              </div>
              <div className='mb-16 overflow-auto no-scrollbar px-5 lg:px-0'>
                <style jsx> {`
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }

                  .no-scrollbar {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                  }
                `}
                </style>
                <div
                  className='w-full max-w-[998px] mx-auto overflow-visible grid grid-cols-2 gap-x-2 gap-y-6
                    lg:flex lg:grid-cols-none lg:gap-x-0 lg:gap-y-0'>
                  { eventData.talents.map((item) => (
                    <div className='flex flex-col' key={item.id}>
                      <div style={{ backgroundImage: 'url(/images/person-1.jpeg)' }}
                        className='flex-none w-[176px] h-[176px] bg-cover group overflow-hidden relative rounded-full
                          lg:w-[416px] lg:h-[416px] lg:rounded-none'
                          onClick={() => openSpeakerModal(item.id)}>
                          <div className='translate-y-full -translate-x-full bg-black bg-opacity-[0.45] absolute top-0 right-0 bottom-0 left-0 lg:flex items-center justify-center
                            group-hover:translate-y-0 group-hover:translate-x-0 transition-all ease-in-out duration-300 hidden'>
                              <div className='text-white text-center space-y-[6px]'>
                                <h4 className='text-[22px] font-bold'>{item.firstname + ' ' + item.surname}</h4>
                                <p>{item.job_title}</p>
                                <p className='font-bold'>{item.work_place}</p>
                              </div>
                          </div>
                          <div 
                            onClick={() => openSpeakerModal(item.id)}
                            className='absolute bottom-8 right-6 bg-[#C4C4C4] hover:bg-green-400 hover:cursor-pointer text-white py-4 px-6 min-w-[220px] text-center rounded-full
                            hidden lg:block
                            '>
                              {item.person_talent_name}
                          </div>
                      </div>
                      <div className='text-gray-500 text-center block pt-4 text-lato
                        lg:hidden lg:pt-0'>
                        <h4 className='mb-1 font-black text-green-500 text-lg lg:text-[22px]'>{item.firstname + ' ' + item.surname}</h4>
                        <p className='mb-0 text-sm'>{item.job_title}</p>
                        <p className='font-bold text-sm'>{item.work_place}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='w-full max-w-[998px] mx-auto px-5 lg:px-0'>
                <div
                  className='mb-16'>
                  <h4
                    className='mb-6 font-bold leading-[27px] text-black'>
                    Content Tag
                  </h4>
                  <div className='flex space-x-3 w-full'>
                    { eventData.tags.map((item) => (
                      <span 
                        className='inline-flex items-center text-sm min-h-[30px] px-6 rounded-full text-gray-50'
                        style={{ backgroundColor: item.color }}
                        key={item.id}
                        >{item.name}</span>
                    ))}
                  </div>
                </div>
                <div
                  className='mb-16'
                   dangerouslySetInnerHTML={{
                    __html: eventData.detail
                  }} />
                <div
                  className='text-center mt-8 sr-only'>
                  <span
                    className='py-3 px-20 rounded-full border-2 bg-white border-gray-200 font-lato font-bold inline-flex mx-auto 
                      hover:bg-green-400 hover:border-green-400 hover:cursor-pointer hover:text-white
                      transition-all duration-300 ease-in-out'>
                    View All
                  </span>
                </div>

                {/* content not ready */}
                <div
                  className='mb-16 sr-only'>
                  <h4
                    className='mb-6 font-bold leading-[27px] text-black'>
                    What you’ll learn
                  </h4>
                  <ul
                    className='columns-2 space-y-4'>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <Icon.Check className='w-5 h-5 mt-[2px]' />
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <Icon.Check className='w-5 h-5 mt-[2px]' />
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <Icon.Check className='w-5 h-5 mt-[2px]' />
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <Icon.Check className='w-5 h-5 mt-[2px]' />
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <Icon.Check className='w-5 h-5 mt-[2px]' />
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <Icon.Check className='w-5 h-5 mt-[2px]' />
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <Icon.Check className='w-5 h-5 mt-[2px]' />
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <Icon.Check className='w-5 h-5 mt-[2px]' />
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              { eventData.contents.length >= 1
                ?
                <>
                  <div className='w-full max-w-[998px] mx-auto'>
                    <h4
                      className='mb-6 font-bold leading-[27px] text-black'>
                      Event Schedule
                    </h4>
                  </div>

                  <table className='w-full text-sm leading-[16.8px] schedule-table mb-16'>
                    <style jsx>{`
                      .schedule-table tr.border_t {
                        background-image: linear-gradient(to right, #e8e8e8 70%, rgba(255, 255, 255, 0) 0%);
                        background-position: top;
                        background-size: 30px 2px;
                        background-repeat: repeat-x;
                      }

                      .schedule-table_nested tr td {
                        padding: 20px 0;
                      }

                      .schedule-table_nested.break tr td {
                        padding: 10px 0;
                      }
                    `}
                    </style>
                    <tbody className='text-gray-600 tracking-[0.02em]'>
                      { eventData.contents[0].schedules.map((item) => (
                        // border_t
                        <tr className='' key={item.id}>
                          <td className='w-full'>
                            <table className='w-full max-w-[998px] mx-auto schedule-table_nested'>
                              <tbody>
                                <tr>
                                  <td valign='top'>
                                    <span>10.00 am</span>
                                  </td>
                                  <td valign='top' width={'40%'}>
                                    <div className='flex flex-col'>
                                      <p className='text-base font-bold leading-[24px] '>YFood Trends Talk</p>
                                      <span className='text-sm'>Tagline Lorem Ipsum </span>
                                    </div>
                                  </td>
                                  <td valign='top' align='center' className='text-base'>
                                    <span className='mt-[6px] block'>2hrs 10mins</span>
                                  </td>
                                  <td valign='top' align='right' className='text-base'>
                                    <div className='flex items-center justify-end'>
                                      <span className='mr-4'>Oval Space, East London</span>
                                      <div className='flex items-center justify-end -space-x-3'>
                                        <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                        <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                        <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )) }

                      {/* coffe break */}
                      <tr className='bg-[#e8e8e8] text-[#c4c4c4] sr-only'>
                        <td className='w-full'>
                          <table className='w-full max-w-[998px] mx-auto schedule-table_nested break'>
                            <tbody>
                              <tr>
                                <td valign='center' width={'52%'}>
                                  <span>12.00 am</span>
                                </td>
                                <td valign='center' align='left' className='text-base font-extrabold'>
                                  <span>Coffee Break</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
                : null
              }

              <div className='w-full max-w-[998px] mx-auto sr-only'>
                <h4
                  className='mb-6 font-bold leading-[27px] text-black'>
                  What you’ll learn
                </h4>
                <p className='text-gray-900 font-bold tracking-[0.04em] text-base mb-8'>5 Modules • 25 Sessions • 15h 52m </p>
              </div>

              <div
                className='mb-16 -space-y-[2px] sr-only'>
                <Accordion content="this is content 1" title="Module 1" subtitle="B-Corp - What is all the hype about?" >
                  
                <table className='w-full text-sm leading-[16.8px] schedule-table'>
                    <style jsx>{`
                      .schedule-table tr.border_t {
                        background-image: linear-gradient(to right, #e8e8e8 70%, rgba(255, 255, 255, 0) 0%);
                        background-position: top;
                        background-size: 30px 2px;
                        background-repeat: repeat-x;
                      }

                      .schedule-table_nested tr td {
                        padding: 20px 0;
                      }

                      .schedule-table_nested.break tr td {
                        padding: 10px 0;
                      }
                    `}
                    </style>
                    <tbody className='text-gray-600 tracking-[0.02em]'>
                      <tr>
                        <td className='w-full'>
                          <table className='w-full max-w-[998px] mx-auto schedule-table_nested'>
                            <tbody>
                              <tr>
                                <td valign='top'>
                                  <span>10.00 am</span>
                                </td>
                                <td valign='top' width={'40%'}>
                                  <div className='flex flex-col'>
                                    <p className='text-base font-bold leading-[24px] '>YFood Trends Talk</p>
                                    <span className='text-sm'>Tagline Lorem Ipsum </span>
                                  </div>
                                </td>
                                <td valign='top' align='center' className='text-base'>
                                  <span className='mt-[6px] block'>2hrs 10mins</span>
                                </td>
                                <td valign='top' align='right' className='text-base'>
                                  <div className='flex items-center justify-end'>
                                    <span className='mr-4'>Oval Space, East London</span>
                                    <div className='flex items-center justify-end -space-x-3'>
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className='border_t'>
                        <td className='w-full'>
                          <table className='w-full max-w-[998px] mx-auto schedule-table_nested'>
                            <tbody>
                              <tr>
                                <td valign='top'>
                                  <span>11.00 am</span>
                                </td>
                                <td valign='top' width={'40%'}>
                                  <div className='flex flex-col'>
                                    <p className='text-base font-bold leading-[24px] '>YFood Trends Talk</p>
                                    <span className='text-sm'>Tagline Lorem Ipsum </span>
                                  </div>
                                </td>
                                <td valign='top' align='center' className='text-base'>
                                  <span className='mt-[6px] block'>2hrs 10mins</span>
                                </td>
                                <td valign='top' align='right' className='text-base'>
                                  <div className='flex items-center justify-end'>
                                    <span className='mr-4'>Oval Space, East London</span>
                                    <div className='flex items-center justify-end -space-x-3'>
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className='bg-[#e8e8e8] text-[#c4c4c4]'>
                        <td className='w-full'>
                          <table className='w-full max-w-[998px] mx-auto schedule-table_nested break'>
                            <tbody>
                              <tr>
                                <td valign='center' width={'52%'}>
                                  <span>12.00 am</span>
                                </td>
                                <td valign='center' align='left' className='text-base font-extrabold'>
                                  <span>Coffee Break</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td className='w-full'>
                          <table className='w-full max-w-[998px] mx-auto schedule-table_nested'>
                            <tbody>
                              <tr>
                                <td valign='top'>
                                  <span>01.00 pm</span>
                                </td>
                                <td valign='top' width={'40%'}>
                                  <div className='flex flex-col'>
                                    <p className='text-base font-bold leading-[24px] '>YFood Trends Talk</p>
                                    <span className='text-sm'>Tagline Lorem Ipsum </span>
                                  </div>
                                </td>
                                <td valign='top' align='center' className='text-base'>
                                  <span className='mt-[6px] block'>2hrs 10mins</span>
                                </td>
                                <td valign='top' align='right' className='text-base'>
                                  <div className='flex items-center justify-end'>
                                    <span className='mr-4'>Oval Space, East London</span>
                                    <div className='flex items-center justify-end -space-x-3'>
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className='bg-[#e8e8e8] text-[#c4c4c4]'>
                        <td className='w-full'>
                          <table className='w-full max-w-[998px] mx-auto schedule-table_nested break'>
                            <tbody>
                              <tr>
                                <td valign='center' width={'52%'}>
                                  <span>02.00 pm</span>
                                </td>
                                <td valign='center' align='left' className='text-base font-extrabold'>
                                  <span>Lunch Break</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td className='w-full'>
                          <table className='w-full max-w-[998px] mx-auto schedule-table_nested'>
                            <tbody>
                              <tr>
                                <td valign='top'>
                                  <span>03.00 pm</span>
                                </td>
                                <td valign='top' width={'40%'}>
                                  <div className='flex flex-col'>
                                    <p className='text-base font-bold leading-[24px] '>YFood Trends Talk</p>
                                    <span className='text-sm'>Tagline Lorem Ipsum </span>
                                  </div>
                                </td>
                                <td valign='top' align='center' className='text-base'>
                                  <span className='mt-[6px] block'>2hrs 10mins</span>
                                </td>
                                <td valign='top' align='right' className='text-base'>
                                  <div className='flex items-center justify-end'>
                                    <span className='mr-4'>Oval Space, East London</span>
                                    <div className='flex items-center justify-end -space-x-3'>
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                      <Image className='w-9 h-9 rounded-full object-cover object-top border-2 border-white' src="/images/person-1.jpeg" alt="" />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Accordion>
                <Accordion content="this is content 2" title="Module 2" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
                  <div className='w-full max-w-[998px] mx-auto '>
                    this is content 2 
                  </div>
                </Accordion>
                <Accordion content="this is content 3" title="Module 3" subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
                  <div className='w-full max-w-[998px] mx-auto '>
                    this is content 3
                  </div>
                </Accordion>
                <div
                  className='text-center mt-6 hidden'>
                  <span
                    className='py-[14px] px-20 rounded-md border-2 bg-white border-green-400 text-green-400 font-lato font-bold block
                      hover:bg-green-400 hover:border-green-400 hover:cursor-pointer hover:text-white
                      transition-all duration-300 ease-in-out'>
                    32 more sections
                  </span>
                </div>
              </div>

              {/* content not ready */}
              <div className='w-full max-w-[998px] mx-auto sr-only'>
                <div
                  className='mb-16'>
                  <h4
                    className='mb-6 font-bold leading-[27px] text-black'>
                    This Course Includes
                  </h4>
                  <div
                    className='grid grid-cols-2 space-y-4'>
                      <div className='col-span-1 space-y-4'>
                        <div className='flex items-center space-x-2'>
                          <Icon.PlayCircle className='w-5 h-5 text-gray-800' />
                          <span>31 total hours of live workshop sessions</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Icon.FileText className='w-5 h-5 text-gray-800' />
                          <span>4 articles</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Icon.Book className='w-5 h-5 text-gray-800' />
                          <span>Certificate of completion</span>
                        </div>
                      </div>
                      <div className='col-span-1 space-y-4'>
                        <div className='flex items-center space-x-2'>
                          <Icon.PlayCircle className='w-5 h-5 text-gray-800' />
                          <span>10 sessions</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Icon.FileText className='w-5 h-5 text-gray-800' />
                          <span>4 articles</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <Icon.Book className='w-5 h-5 text-gray-800' />
                          <span>Certificate of completion</span>
                        </div>
                      </div>
                  </div>
                </div>
                <div
                  className='mb-16'>
                  <h4
                    className='mb-6 font-bold leading-[27px] text-black'>
                    Course Prerequisite
                  </h4>
                  <ul
                    className='columns-2 space-y-4'>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <span className='w-2 h-2 bg-gray-900 rounded-full m-[6px]'></span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <span className='w-2 h-2 bg-gray-900 rounded-full m-[6px]'></span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <span className='w-2 h-2 bg-gray-900 rounded-full m-[6px]'></span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <span className='w-2 h-2 bg-gray-900 rounded-full m-[6px]'></span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <span className='w-2 h-2 bg-gray-900 rounded-full m-[6px]'></span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <span className='w-2 h-2 bg-gray-900 rounded-full m-[6px]'></span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <span className='w-2 h-2 bg-gray-900 rounded-full m-[6px]'></span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                    <li>
                      <div
                        className='flex items-start space-x-2'>
                        <span className='w-2 h-2 bg-gray-900 rounded-full m-[6px]'></span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className='mb-16 p-10 tracking-widep-10 bg-[#EAEAEA] hidden'>
                  <h4
                    className='mb-6 font-bold leading-[27px] text-gray-400'>
                    Schedule
                  </h4>
                  <table className='w-full text-sm leading-[16.8px] schedule-table'>
                    <style jsx>{`
                      .schedule-table tr:not(:first-child) td {
                        padding-top: 24px;
                      }
                    `}
                    </style>
                    <tbody>
                      <tr>
                        <td>
                          <div className='text-base text-black font-bold leading-[24px]'>YFood Trends Talk</div>
                        </td>
                        <td align='left'>
                          <span>Short desc.</span>
                        </td>
                        <td align='left'>
                          <div className='flex items-center space-x-2'>
                            <Image className='w-8 h-8 rounded-full object-cover object-top' src="/images/person-1.jpeg" alt="" />
                            <span>John Doe</span>
                          </div>
                        </td>
                        <td align='left'>
                          <span>YFood</span>
                        </td>
                        <td align='left'>
                          <span>CTO</span>
                        </td>
                        <td align='center'>
                          <span>14.00 am</span>
                        </td>
                        <td align='center'>
                          <span>2hrs 20mins</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className='text-base text-black font-bold leading-[24px]'>YFood Trends Talk</div>
                        </td>
                        <td align='left'>
                          <span>Short desc.</span>
                        </td>
                        <td align='left'>
                          <div className='flex items-center space-x-2'>
                            <Image className='w-8 h-8 rounded-full object-cover object-top' src="/images/person-1.jpeg" alt="" />
                            <span>John Doe</span>
                          </div>
                        </td>
                        <td align='left'>
                          <span>YFood</span>
                        </td>
                        <td align='left'>
                          <span>CTO</span>
                        </td>
                        <td align='center'>
                          <span>14.00 am</span>
                        </td>
                        <td align='center'>
                          <span>2hrs 20mins</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className='text-base text-black font-bold leading-[24px]'>YFood Trends Talk</div>
                        </td>
                        <td align='left'>
                          <span>Short desc.</span>
                        </td>
                        <td align='left'>
                          <div className='flex items-center space-x-2'>
                            <Image className='w-8 h-8 rounded-full object-cover object-top' src="/images/person-1.jpeg" alt="" />
                            <span>John Doe</span>
                          </div>
                        </td>
                        <td align='left'>
                          <span>YFood</span>
                        </td>
                        <td align='left'>
                          <span>CTO</span>
                        </td>
                        <td align='center'>
                          <span>14.00 am</span>
                        </td>
                        <td align='center'>
                          <span>2hrs 20mins</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div
                className='w-full max-w-[998px] mx-auto px-5 lg:px-0'>
                <h4
                  className='mb-6 font-bold leading-[27px] text-black'>
                  Event Partners
                </h4>
              </div>
              <div className='overflow-auto no-scrollbar px-5 lg:px-0'>
                <style jsx> {`
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }

                  .no-scrollbar {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                  }
                `}
                </style>
                <div
                  className='w-full max-w-[998px] mx-auto overflow-visible'>
                  <div className='grid grid-cols-4 gap-4 text-center space-x-0 lg:flex lg:gap-0 lg:space-x-6 w-full'>
                    { eventData.partners.map((item) => (
                      <div 
                        className='flex-none w-[78px] h-[78px] lg:w-[140px] lg:h-[140px] bg-contain bg-center bg-no-repeat rounded-full grayscale-0 lg:grayscale hover:grayscale-0 transition-all duration-300 ease-in-linear' style={{ backgroundImage: 'url(/images/icons/coca-cola.png)' }}
                        key={item.id}
                        ></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </> : null }
    </Layout>
  );
}

export default EventDetails