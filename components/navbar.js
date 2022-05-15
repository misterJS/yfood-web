/* This example requires Tailwind CSS v2.0+ */
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

const navigation = [
  { name: 'home', href: 'https://yfood.com/', subitems: [] },
  { name: 'events', href: '/events', subitems: [] },
  // { name: 'venture studio', href: '#', subitems: [] },
  // { name: 'dropdown 1', href: '#', subitems: [
  //   {
  //     name: 'Help Center',
  //     description: 'Get all of your questions answered in our forums or contact support.',
  //     href: '#',
  //   },
  //   { name: 'Guides', description: 'Learn how to maximize our platform to get the most out of it.', href: '#' },
  //   { name: 'Events', description: 'See what meet-ups and other events we might be planning near you.', href: '#' },
  //   { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#' },
  // ] },
  // { name: 'dropdown 2', href: '#', subitems: [
  //   {
  //     name: 'Help Center',
  //     description: 'Get all of your questions answered in our forums or contact support.',
  //     href: '#',
  //   },
  //   { name: 'Guides', description: 'Learn how to maximize our platform to get the most out of it.', href: '#' },
  //   { name: 'Events', description: 'See what meet-ups and other events we might be planning near you.', href: '#' },
  //   { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#' },
  // ] },
  // { name: 'memberships', href: '#', subitems: [] },
  // { name: 'news & blog', href: '#', subitems: [] },
  // { name: 'about us', href: '#', subitems: [] }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar () {
  return (
    <header className='bg-white shadow-lg z-10 sticky top-0 '>
      <nav className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-2' aria-label='Top'>
        <div className='w-full py-6 flex items-center justify-between lg:border-none'>
          <Link href='https://yfood.com/' passHref><>
            <span className='sr-only'>Yfood</span>
            <Image
              className='h-10 w-auto'
              src='/images/yfood-logo.svg'
              height={'40px'}
              width={'100%'}
              alt='' />
          </></Link>
          <div className='flex items-center'>
            <div className='hidden space-x-4 lg:flex items-center'>
              {navigation.map((link) => (
                  <Popover className='relative' key={link.name}>
                  {({ open }) => (
                    <>
                      { link.subitems.length < 1 ?
                        <Link href={link.href} className='text-sm hover:text-base transition-all duration-300 ease-in-out uppercase text-gray-500 hover:text-green-400' passHref>
                        {link.name}
                        </Link> :
                        <Popover.Button
                          className={classNames(
                            open ? 'text-green-400' : 'text-gray-500',
                            'group inline-flex items-center text-sm hover:text-base transition-all duration-300 ease-in-out focus:outline-none focus:ring-0 !shadow-none !border-none !border-0'
                          )}
                        >
                          <span className='text-sm hover:text-base transition-all duration-300 ease-in-out uppercase text-gray-500 hover:text-green-400'>{link.name}</span>
                        </Popover.Button>
                      }
                      {
                        link.subitems.length < 1 ?
                          null :
                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0 translate-y-1'
                            enterTo='opacity-100 translate-y-0'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100 translate-y-0'
                            leaveTo='opacity-0 translate-y-1'
                          >
                            <Popover.Panel className='absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0'>
                              <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                                <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                                  {link.subitems.map((resource) => (
                                    <Link
                                      key={resource.name}
                                      href={resource.href}
                                      className='-m-3 p-3 block rounded-md hover:bg-gray-50'
                                      passHref
                                    ><>
                                      <p className='text-base font-medium text-gray-900'>{resource.name}</p>
                                      <p className='mt-1 text-sm text-gray-500'>{resource.description}</p>
                                    </></Link>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                      }

                    </>
                  )}
                </Popover>
              ))}
            </div>
          </div>
          <div className='hidden lg:block space-x-2 sr-only'>
            <Link href='/login' className='inline-block bg-white py-2 px-4 border border-green-400 rounded-md text-base font-bold text-green-400' passHref>Login</Link>
            <Link href='/register' className='inline-block bg-green-400 py-2 px-4 border border-transparent rounded-md text-base font-bold text-white hover:bg-green-500' passHref>Join Us</Link>
          </div>
        </div>
        <div className='py-4 flex-wrap justify-center space-x-6 hidden'>
          {navigation.map((link) => (
            <Link key={link.name} href={link.href} className='text-base font-medium text-white' passHref>
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar