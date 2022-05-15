import { useEffect, useState } from 'react'

const styles = {
  input: 'bg-gray-200 w-full max-w-[60px] h-[60px] rounded-lg justify-self-center p-6 text-center font-semibold focus-visible:outline-green-400 outline-1'
}

function CheckCodeForm(props) {
  // props
  const changeFormData = props.changeFormData
  const username = props.username
  
	// state
	const [isLoading, setLoading] = useState(false)
	const [code1, setCode1] = useState('')
	const [code2, setCode2] = useState('')
	const [code3, setCode3] = useState('')
	const [code4, setCode4] = useState('')
  const [validation, setValidation] = useState({})
  const [timeleft, setTimeleft] = useState(60)
  const [state, setState] = useState({});

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

	const handleChange = e => {
		const { name } = e.target

		const [fieldName, fieldIndex] = name.split('-')
  
		const nextSibling = document.querySelector(
      `input[name=cd-${parseInt(fieldIndex, 10) + 1}]`
		)
  
		const prevSibling = document.querySelector(
      `input[name=cd-${parseInt(fieldIndex, 10) - 1}]`
		)

		if (nextSibling !== null && e.target.value) {
      nextSibling.focus()
		} else if (prevSibling !== null && !e.target.value) {
			prevSibling.focus()
		}
	}

  const checkCode = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(`/api/auth/posts/check-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        otp: code1 + code2 + code3 + code4,
        request: username,
        status: 'pwd',
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
              fail: [response.message]
            })
          }
        } else {
          setValidation({})

          const data = {
            step: 3,
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

  // request new code
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

    const data = res.json()
    const response = await data

    setTimeout(() => {
      setValidation({})
      setLoading(false)
      setTimeleft(60)
      downloadTimer()
    }, 500)
  }

  const downloadTimer = () => setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
    } else {
      setTimeleft(timeleft -= 1);
    }
  }, 1000);
  
  useEffect(()=>{
    downloadTimer()

    return () => {
      setState({})
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='py-20'>
      <h2 className='text-[28px] leading-[34px] text-gray-900 text-fjalla text-center'>We Have Just Sent You a Verification Code</h2>
      <div className='mt-4'>
        <p className='text-base leading-[24px] text-green-800 text-lato text-center font-bold'>Enter Your Email Verification Code</p>
        <p className='text-base leading-[24px] text-green-800 text-lato text-center mt-2'>We sent the verification code to {username}</p>
        <div className='mt-[46px]'>
          <form name='checkCode' onSubmit={ checkCode }>
            <div className=''>
              <div className='grid grid-cols-4 gap-4 w-full max-w-[300px] mx-auto'>
                <input className={ classNames(validation.fail
                    ? 'border border-red-400'
                    : 'border border-transparent',
                    styles.input) }
                    autoFocus
                    type='text'
                    name='cd-1'
                    maxLength={ 1 }
                    onChange={ e => { setCode1(e.target.value) ; handleChange(e) } }
                  />
                <input className={ classNames(validation.fail
                    ? 'border border-red-400'
                    : 'border border-transparent',
                    styles.input) }
                    type='text' 
                    name='cd-2' 
                    maxLength={ 1 } 
                    onChange={ e => { setCode2(e.target.value) ; handleChange(e) } }
                  />
                <input className={ classNames(validation.fail
                    ? 'border border-red-400'
                    : 'border border-transparent',
                    styles.input) }
                    type='text'
                    name='cd-3'
                    maxLength={ 1 }
                    onChange={ e => { setCode3(e.target.value) ; handleChange(e) } } 
                  />
                <input className={ classNames(validation.fail
                    ? 'border border-red-400'
                    : 'border border-transparent',
                    styles.input) }
                    type='text'
                    name='cd-4'
                    maxLength={ 1 }
                    onChange={ e => { setCode4(e.target.value) ; handleChange(e) } }
                  />
              </div>
              {
                  validation.fail &&
                    <p className='text-xs font-normal text-red-400 text-center mt-2'>
                      { validation.fail }
                    </p>
                }
            </div>
            <div className='mt-12'>
              <p className='text-green-400 text-lato text-center mb-2'>
                {
                  timeleft != 0 ?
                    <>
                    {'00 : ' + timeleft}
                    </>  :
                    <>
                      I did not receive the code,&nbsp;
                      <button onClick={ requestCode } className='cursor-pointer font-semibold hover:text-green-500 transition-all duration-300 ease-in-out'>
                        Resend Now
                      </button>
                    </>
                }
              </p>
              <button type='submit' disabled={ (!code1 || !code2 || !code3 || !code4 || isLoading) && validation != {} } className='w-full flex justify-center p-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-gray-50 disabled:text-gray-400 bg-green-400 hover:bg-green-500 disabled:bg-gray-200 transition-all duration-300 ease-in-out max-h-[52px]'>
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
                <>Verify</>
              }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CheckCodeForm