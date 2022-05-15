import Navbar from './navbar'
import Footer from './footer'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { useRouter } from 'next/router'

const tabs = [
  { name: 'Login', href:'/login'},
  { name: 'Register', href:'/register'},
]

function Auth({ children }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const authPath = router.pathname == '/login' || router.pathname == '/register'

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  setTimeout(() => {
    setOpen(true)
  }, 200);

  return (
      <div className='bg-gray-100'>
        <Navbar></Navbar>
        <div>

        </div>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-h-full flex items-start transition-all duration-300 ease-in-out'>
          <div className={'flex-1 flex flex-col justify-center py-20 px-4 sm:px-6 lg:flex-none lg:px-10 xl:px-0 xl:pr-5'}>
            <div className='bg-gray-50 rounded-2xl px-10 py-6 shadow-lg x-auto w-full lg:w-[470px]'>
              {
                authPath ? 
                <div>
                  <div className='sm:hidden'>
                    <label htmlFor='tabs' className='sr-only'>
                      Select a tab
                    </label>
                    {/* Use an 'onChange' listener to redirect the user to the selected tab URL. */}
                    <select
                      id='tabs'
                      name='tabs'
                      className='block w-full focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md'
                      defaultValue={tabs.find((tab) => router.pathname == tab.href).name}
                    >
                      {tabs.map((tab) => (
                        <option key={tab.href}>{tab.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className='hidden sm:block'>
                    <nav className='-mb-px flex w-full justify-around' aria-label='Tabs'>
                      {tabs.map((tab) => (
                        <Link
                          href={tab.href}
                          key={tab.href}
                          className={classNames(
                            router.pathname == tab.href
                              ? 'border-green-400 text-green-400 font-bold'
                              : 'border-transparent text-gray-600 hover:text-green-500 hover:border-green-400 hover:font-bold',
                            'w-1/2 py-3 px-1 text-center border-b-2 text-base cursor-pointer transition-all duration-300 ease-in-out'
                          )}
                          aria-current={router.pathname == tab.href ? 'page' : undefined}
                        >
                          {tab.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div> : null
              }
              <div className={authPath ? 'min-h-[525px]' : 'min-h-[200px]'}>
                <Transition.Root show={open} as='div'>
                  <Transition.Child
                      as='div'
                      enter='ease-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in duration-200'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                  >
                    {children}
                  </Transition.Child>
                </Transition.Root>
              </div>
            </div>
          </div>
          <div className='hidden lg:flex relative w-0 flex-col flex-1 items-start xl:pl-5 xl:py-20'>
            <div className='py-10'>
              <Image
                className='w-full max-w-[370px]'
                src='/images/login-banner.png'
                alt=''
              />
              <div className='mt-8'>
                <h1 className='text-[40px] text-fjalla text-green-400'>YFOOD HUB COMMUNITY</h1>
                <span className='h-1 w-[120px] bg-gray-200 block my-6' style={{content: ''}}></span>
                <p className='text-lg text-lato text-gray-400 font-light'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
  )
}

export default Auth