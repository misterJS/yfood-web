import { useState } from 'react'
import { useRouter } from 'next/router'
import InputPassword from '../input-password'

function ForgotPasswordForm(props) {
  // props
  const username = props.username

	// state
	const [isLoading, setLoading] = useState(false)
	const [newpassword, setNewPassword] = useState('')
	const [confirmpassword, setConfirmPassword] = useState('')
  const [validation, setValidation] = useState({})
  const router = useRouter()

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const resetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (newpassword !== confirmpassword) {
      setValidation({
        diff: ['new password and confirm password must be the same']
      })
      setTimeout(() => {
        setLoading(false)
      }, 1300)
    } else {
      setValidation({})

      const res = await fetch(`/api/auth/posts/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request: username,
          password: newpassword,
          password_confirmation: confirmpassword
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
            router.push('/account/login')        
          }
        }, 1300)
      } catch (error) {
        setValidation(error.response.data)
        setTimeout(() => {
          setLoading(false)
        }, 1300)
      }
    }
  }

  return (
    <div className='py-20'>
      <h2 className='text-[28px] leading-[34px] text-gray-900 text-fjalla'>Create New Password</h2>
      <div className='mt-4'>
        <p className='text-base leading-[24px] text-green-800 text-lato'>You can set a new password here</p>
        <div className='mt-[46px]'>
          <form onSubmit={ resetPassword }>
            <div className='space-y-6'>
              <div className='space-y-2'>
                <label htmlFor='newpassword' className='block text-sm leading-[17px] text-gray-500'>Create New Password</label>
                <InputPassword 
                  onChange={ (e) => setNewPassword(e.target.value) }
                  autoFocus
                  id='newpassword'
                  name='newpassword'
                  placeholder='input new password'
                  required
                  className={ classNames(validation.diff
                    ? 'border border-red-400'
                    : 'border border-transparent') }
                />
                {
                  validation.diff ?
                    <span className='text-xs font-normal text-red-400 text-center mt-2'>
                      { validation.diff }
                    </span> : ''
                }
              </div>
              <div className='space-y-2'>
                <label htmlFor='confirmpassword' className='block text-sm leading-[17px] text-gray-500'>Confirm New Password</label>
                <InputPassword 
                  onChange={ (e) => setConfirmPassword(e.target.value) }
                  id='confirmpassword'
                  name='confirmpassword'
                  placeholder='input confirm new password'
                  required
                  className={ classNames(validation.diff
                    ? 'border border-red-400'
                    : 'border border-transparent') }
                />
                {
                  validation.diff ?
                    <span className='text-xs font-normal text-red-400 text-center mt-2'>
                      { validation.diff }
                    </span> : ''
                }
              </div>
            </div>
            <button type='submit' disabled={ !newpassword || !confirmpassword || isLoading } className='mt-12 w-full flex justify-center p-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-gray-50 disabled:text-gray-400 bg-green-400 hover:bg-green-500 disabled:bg-gray-200 transition-all duration-300 ease-in-out max-h-[52px]'>
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