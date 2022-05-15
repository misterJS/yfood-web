import * as Icon from 'react-feather'
import { Fragment, useState, useRef, useEffect } from 'react'
import { Popover, Dialog, Transition } from '@headlessui/react'

const filter = [
  { 
    id: 1,
    active: false,
    name: 'event type',
    child: [
      { id: 1, selected: false, slug: 'virtual', name: 'virtual' },
      { id: 2, selected: false, slug: 'active',  name: 'active' },
      { id: 3, selected: false, slug: 'learn',  name: 'learn' },
      { id: 4, selected: false, slug: 'insight',  name: 'insight' }
    ]
  },
  {
    id: 2,
    active: false,
    name: 'membership type',
    child: [
      { id: 1, selected: false, slug: 'all-status',  name: 'all status' },
      { id: 2, selected: false, slug: 'active',  name: 'active' },
      { id: 3, selected: false, slug: 'new-member',  name: 'new member' }
    ]
  },
  {
    id: 3,
    active: false,
    name: 'theme',
    child: [
      { id: 1, selected: false, slug: 'connect-now',  name: 'connect now' },
      { id: 2, selected: false, slug: 'summer-school',  name: 'summer school' },
      { id: 3, selected: false, slug: 'revive-me',  name: 'revive me' },
      { id: 4, selected: false, slug: 'empower',  name: 'empower' },
      { id: 5, selected: false, slug: 'feed-everyone',  name: 'feed everyone' }
    ]
  },
  {
    id: 4,
    active: false,
    name: 'upcoming',
    child: [
      { id: 1, selected: false, slug: 'all-events',  name: 'all events' },
      { id: 2, selected: false, slug: 'upcoming',  name: 'upcoming' },
      { id: 3, selected: false, slug: 'past',  name: 'past' },
      { id: 4, selected: false, slug: 'this-week',  name: 'this week' },
      { id: 5, selected: false, slug: 'this-month',  name: 'this month' },
      { id: 6, selected: false, slug: 'this-year',  name: 'this year' }
    ]
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function EventFilter (props) {
  const data = props
  const [filterData, setFilterData] = useState([])
  const [overlay, setOverlay] = useState(false)
  const selectionRef = useRef(null)

  const closeFilter = (e) => {
    e.preventDefault()
  }

  const changeLayout = () => {
    let pos = document.getElementById('changePosition')
    let pad = document.getElementById('changePaddingTop')
    pos.classList.add('absolute')
    pad.classList.add('pt-[156px]')
  }

  useEffect(()=>{
    const fetchData = async () => {
      setFilterData(filter)
    }
    fetchData()
  }, [])

  return (
    <div 
      className='px-0 lg:px-10 py-3 font-lato tracking-[0.04em] mt-6 flex z-10 overflow-auto'>
      <label className='text-base text-gray-600 items-center hidden lg:inline-flex mr-10'>
        <Icon.Filter className='w-5 h-5 mr-2' />
        <span
          className='font-medium whitespace-nowrap'>Filter by</span>
      </label>
      <div className='flex space-x-4 lg:space-x-10'>
        { filterData.map((row) => (
          <Popover key={row.id}>
            {
              ({ open }) => (
                <>
                  <Dialog as='div' className='fixed z-[1] inset-0 overflow-y-auto' onClose={setOverlay} initialFocus={selectionRef}>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-60 transition-opacity z-10' />
                    </Transition.Child>
                  </Dialog>
                  <Popover.Button 
                    className={ classNames(
                      open ? 'text-gray-600 font-bold' : 'text-gray-600 lg:text-gray-400',
                      'uppercase hover:text-gray-600 hover:font-bold hover:cursor-pointer inline-flex items-center'
                    ) }
                    ref={selectionRef}
                    onClick={changeLayout()}>
                    <span className='whitespace-nowrap text-sm lg:text-base'>
                      {row.name}
                    </span>
                    <Icon.ChevronDown className='w-5 h-5 ml-2 lg:ml-3 text-gray-400' />
                  </Popover.Button>

                  {
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='opacity-0 translate-y-1'
                      enterTo='opacity-100 translate-y-0'
                      leave='transition ease-in duration-150'
                      leaveFrom='opacity-100 translate-y-0'
                      leaveTo='opacity-0 translate-y-1'>
                      <Popover.Panel className='px-10 py-5 z-[9] w-full bg-white pointer-events-auto overflow-hidden absolute left-0 flex justify-between'>
                        <div 
                        className='flex items-center space-x-6 font-lato text-gray-600'>
                          { row.child.map((child) => (
                            <div
                              key={child.id}
                              className={ classNames(
                                child.selected ? 'border-transparent bg-green-400 text-white font-bold' :'border-gray-200 bg-white hover:cursor-pointer',
                                'border-2 px-8 py-2 capitalize rounded-full hover:border-transparent hover:bg-green-400 hover:text-white hover:font-bold whitespace-nowrap text-sm lg:text-base float-left'
                              ) }>
                              { child.name }
                            </div>
                          )) }
                        </div>
                        <span
                          className='w-8 h-8 rounded-full bg-black inline-flex items-center justify-center hover:cursor-pointer'
                          onClick={ () => { closeFilter } }>
                          <Icon.X className='w-5 h-5 text-white' strokeWidth={3} />
                        </span>
                      </Popover.Panel>
                    </Transition>
                  }
                </>
              )
            }
          </Popover>
        ))}
      </div>
      <div
        className='uppercase text-gray-400 hover:text-gray-600 hover:font-bold hover:cursor-pointer inline-flex items-center ml-4 lg:ml-10'>
        <Icon.RefreshCcw className='w-4 h-4 lg:w-5 lg:h-5 mr-3 text-gray-600' />
        <span
          className='whitespace-nowrap'>RESET FILTERS</span>
      </div>
    </div>
  )
}

export default EventFilter