import * as Icon from 'react-feather'
import Image from 'next/image'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function EventCard (props) {
  const data = props
  

  return (
    <Link
      className='font-lato text-gray-600 hover:text-green-500 hover:cursor-pointer transition-all duration-200 ease-in-out'
      href={ data.href } passHref><>
      <div
        className='mb-4 relative min-h-[240px] lg:min-h-[322px]'>
        <Image 
          className='rounded-lg w-full max-w-[370px] h-[240px] lg:h-[322px] object-cover lg:object-fill'
          src={ data.image }
          alt={ data.title } />
        <span
          className={classNames(
            data.date_color == 'light' ? 'text-white' : 'text-gray-900',
            'absolute bottom-[14px] left-4 right-4 text-center text-lg tracking-wide font-extrabold p-2 backdrop-blur-[10px] bg-white bg-opacity-20 rounded-lg hover:text-white hover:bg-green-400 transition-all duration-300 ease-in-out')}>
            { data.date }
        </span>
      </div>
      <div
        className='tracking-wide min-h-[214px] lg:min-h-[230px] relative'>
        <h4
          className='mb-4 text-[22px] leading-[30.8px] font-extrabold'>
            { data.title }
        </h4>
        <p
          className='text-base leading-[22.4px] text-gray-600'>
            { data.description }
        </p>
        <div 
          className='absolute bottom-0 left-0 right-0 text-gray-400 text-sm leading-[16.8px]'>
            <div 
              className='flex items-center mb-2'>
              <Icon.Clock
                className='text-gray-400 mr-2' size={16} strokeWidth={3} /> 
              { data.duration }
            </div>
            {
              data.event ?
                <div
                  className='flex items-center'>
                  <Icon.Video
                    className='text-gray-400 mr-2' size={16} strokeWidth={3} /> 
                  { data.event }
                </div>
                : null
            }
            {
              data.location ?
                <div
                  className='flex items-center'>
                  <Icon.MapPin
                    className='text-gray-400 mr-2' size={16} strokeWidth={3} /> 
                  { data.location }
                </div>
                : null
            }
        </div>
      </div>
      </></Link>
  )
}

export default EventCard