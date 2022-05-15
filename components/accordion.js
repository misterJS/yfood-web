import { useState } from 'react'
import * as Icon from 'react-feather'

function Accordion(props) {
  const [isShowing, setIsShowing] = useState(false)

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const toggle = () => {
    setIsShowing(!isShowing)
  }
  
  return (
    <div
      className={ classNames(
        isShowing ? 'bg-green-200 border-b-white border-t-transparent' : 'bg-green-100 border-[#e8e8e8]',
        'w-full text-center border-2'
      ) }
    >
      <button
        className={ classNames(
          isShowing ? 'py-7' : 'py-7',
          'w-full max-w-[998px] mx-auto relative text-left border-none border-0 bg-transparent outline-hidden hover:cursor-pointer'
        ) }
        onClick={toggle}
        type='button'
      >
        <div className={ classNames(
          isShowing ? 'text font-bold' : '',
          'flex justify-between items-center'
        ) }>
          <div> 
            <span className={ classNames(
              isShowing ? 'text-[#4e7e43]' : 'text-gray-700'
            ) }>{ props.title }</span>
            <span className='inline-block ml-2'>{ '• ' + props.subtitle}</span>
          </div>
          { !isShowing ?
            <Icon.ChevronDown className='w-5 h-5 text-gray-700' /> :
            <Icon.ChevronUp className='w-5 h-5 text-gray-700' /> 
          }
        </div>
      </button>
      <div
        className={ classNames(
          isShowing ? 'block' : 'hidden',
          'bg-white text-left'
        ) }
      >
        <div
          // dangerouslySetInnerHTML={{
          //   __html: props.children
          // }}
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Accordion