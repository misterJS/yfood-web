import { useState } from 'react'

function ForgotPasswordForm(props) {
  // props
  const changeFormData = props.changeFormData

	// state
	const [isLoading, setLoading] = useState(false)
	const [username, setUsername] = useState('')
  const [validation, setValidation] = useState({})

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const requestCode = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(`/api/auth/posts/get-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request: username
      })
    })

    try {
      const data = res.json()
      const response = await data

      setTimeout(() => {
        setLoading(false)
        if (!response.is_success) {
          if (response.data != '') {
            setValidation(response.data)
          } else {
            setValidation({
              not_found: [response.message]
            })
          }
        } else {
          setValidation({})
  
          const data = {
            step: 2,
            username: username
          }
          changeFormData(data)
        }
      }, 1300)

    } catch (error) {
      setValidation(error.response.data)
      setTimeout(() => {
        setLoading(false)
      }, 1300)
    }
  }

  return (
    <div className='py-20'>
      <h2 className='text-[28px] leading-[34px] text-gray-900 text-fjalla text-center'>Forgot Your Passcode?</h2>
      <div className='mt-4'>
        <p className='text-base leading-[19px] text-green-800 text-lato text-center'>Don’t worry, let us know your email or phone number that you used to register.</p>
        <div className='mt-[46px]'>
          <form onSubmit={ requestCode }>
            <div className='space-y-6'>
              <div className='space-y-2'>
                <label htmlFor='email' className='block text-sm leading-[17px] text-gray-500'>Phone Number/Email</label>
                <input
                  onChange={ (e) => setUsername(e.target.value) }
                  defaultValue={ username }
                  autoFocus
                  id='username'
                  name='username'
                  type='text'
                  autoComplete='off'
                  placeholder='input phone number or email address'
                  required
                  className={ classNames(validation.request || validation.not_found
                    ? 'border border-red-400'
                    : 'border border-transparent',
                    'mt-2 appearance-none block w-full px-5 py-4 rounded-2xl placeholder-gray-400 bg-gray-100 text-sm focus-visible:outline-green-400 outline-1') }
                />
                {
                  validation.request &&
                    <span className='text-xs font-normal text-red-400'>
                      { validation.request }
                    </span>
                }
                {
                  validation.not_found &&
                    <span className='text-xs font-normal text-red-400'>
                      { validation.not_found }
                    </span>
                }
              </div>
            </div>
            <button type='submit' disabled={ !username || isLoading } className='mt-12 w-full flex justify-center p-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-gray-50 disabled:text-gray-400 bg-green-400 hover:bg-green-500 disabled:bg-gray-200 transition-all duration-300 ease-in-out max-h-[52px]'>
              {
                isLoading ?
                <>
                  <div>
                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                  </div>
                  Processing...
                </> :
                <>Next</>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordForm