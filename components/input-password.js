import { useState } from 'react'
import { EyeOffIcon, EyeIcon } from '@heroicons/react/outline'

function InputPassword(props) {
  const [showPassword, setShowPassword] = useState(false)

  const handleShow = async e => {
    e.preventDefault()

    setShowPassword(!showPassword)
  }

  return (
    <div className='mt-1 relative'>
      <input
        autoFocus={props.autoFocus}
        type={ showPassword ? 'text' : 'password'}
        autoComplete='off'
        onChange={ props.onChange }
        id={ props.id }
        name={ props.name }
        placeholder={ props.placeholder }
        className={ props.className + ' mt-2 appearance-none block w-full px-5 py-4 pr-10 rounded-2xl placeholder-gray-400 bg-gray-100 text-sm focus-visible:outline-green-400 outline-1'}
      />
      <div className='absolute top-0 right-0 bottom-0 pr-3 flex items-center' onClick={ handleShow }>
        {
          showPassword
          ? <EyeIcon className='h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer' aria-hidden='true' />
          : <EyeOffIcon className='h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer' aria-hidden='true' />
        }
      </div>
    </div>
  )
}

export default InputPassword