/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

function Modal({ show, onClose, size, footer, children, title, image, }) {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen lg:pt-4 lg:px-4 lg:pb-20 text-center sm:block p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" onClick={() => onClose(false)} />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={ classNames(
              (title && image) ? '' : 'sm:pt-14',
              image ? '!p-0' : 'sm:p-8',
              size ? size : 'sm:max-w-lg',
              "font-lato relative inline-block align-bottom bg-white lg:rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full"
            ) }>
              <div className="hidden sm:block absolute top-0 right-0 pt-8 pr-8">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-300 hover:text-gray-500 focus:outline-none focus:ring-0"
                  onClick={() => onClose(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {
                image ?
                <div className="sm:flex sm:items-start w-full">
                  <div className='w-full h-[340px] lg:w-[420px] lg:h-[688px] bg-cover bg-top lg:bg-center bg-no-repeat' style={{ backgroundImage: image }} />
                  <div className="w-fill lg:w-[604px] h-full text-left p-5 lg:p-[60px]">
                    <div className="mt-0 lg:mt-2">
                      {children}
                    </div>
                  </div>
                </div> :
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      {children}
                    </div>
                  </div>
                </div>
                
              }
              {
                footer ?
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => onClose(false)}
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-0 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => onClose(false)}
                  >
                    Cancel
                  </button>
                </div> : null
              }
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal