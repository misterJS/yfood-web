import * as Icon from 'react-feather'
import { Fragment, useState, useRef } from 'react'
import { Listbox, Dialog, Transition } from '@headlessui/react'

const category = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Event' },
  { id: 3, name: 'Speaker' },
  { id: 4, name: 'Company' },
  { id: 5, name: 'Venue' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function EventSearch (props) {
  // props
  const data = props
  const changeKeywordValue = data.changeKeywordValue

  // state
  const [selected, setSelected] = useState(category[0])
  const [overlay, setOverlay] = useState(false)
  const selectionRef = useRef(null)

  const getSearchBarValue = async (value) => {
    const data = {
      keyword: value
    }
    await changeKeywordValue(data)
  }

  const changeLayout = async () => {
    let pos = document.getElementById('changePosition')
    let pad = document.getElementById('changePaddingTop')
    pos.classList.remove('absolute')
    pad.classList.remove('pt-[156px]')
  }

  return (
    <div className=''>
      <div className='flex shadow-sm rounded-full border border-gray-200 p-[1px] h-[60px] font-lato'>
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Dialog as='div' className='fixed z-[12] inset-0 overflow-y-auto' onClose={setOverlay} initialFocus={selectionRef}>
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
              <div className='relative h-full' onClick={() => (setOverlay , changeLayout())}>
                <Listbox.Button ref={selectionRef} className='bg-gray-200 relative rounded-l-full rounded-r-none lg:rounded-full pl-5 pr-10 lg:pl-10 sm:w-[108px] lg:w-[200px] py-4 text-left cursor-default hover:cursor-pointer focus:outline-none focus:ring-0 focus:border-transparent lg:text-base sm:text-sm'>
                  <span className='block truncate text-gray-500 tracking-[0.04em]'>{selected.name}</span>
                  <span className='absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none'>
                    <Icon.ChevronDown className='h-5 w-5 text-gray-500' aria-hidden='true' />
                  </span>
                </Listbox.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                      <Listbox.Options className='absolute mt-1 w-full max-w-[200px] bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm z-[13]'>
                        {category.map((cat) => (
                          <Listbox.Option
                            key={cat.id}
                            className={({ active }) =>
                              classNames(
                                active ? 'text-green-500' : 'text-gray-900',
                                'cursor-pointer select-none relative py-2 pl-3 pr-9'
                              )
                            }
                            value={cat}
                          >
                            {({ selected }) => (
                              <>
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                  {cat.name}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                  </Transition>
              </div>
            </>
          )}
        </Listbox>
        <input
          onChange={ (e) => getSearchBarValue(e.target.value) }
          type='text'
          name='keyword'
          id='keyword'
          className='placeholder:text-gray-500 focus:ring-0 focus:outline-0 focus:outline-transparent focus:border-transparent flex-1 block w-full rounded-none rounded-r-full sm:text-sm border-transparent tracking-[0.04em]'
          placeholder='Search here'
        />
      </div>
      { props.children }
    </div>
  )
}

export default EventSearch