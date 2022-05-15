import Link from 'next/link'
import { useState } from 'react'
import GoogleLogin from 'react-google-login'
import InputPassword from '../input-password'

function LoginForm() {
  // state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validation, setValidation] = useState({})

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/auth/posts/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request: username,
        password: password,
      }),
    })

    try {
      const data = res.json()
      const response = await data

      if (!response.is_success) {
        if (response.data != "") {
          setValidation(response.data)
        } else {
          setValidation({
            err: [response.message]
          })
        }
      } else {
        setValidation({})
      }
    } catch (error) {
      setValidation(error.response.data)
      // setTimeout(() => {
      //   setLoading(false)
      // }, 1300)
      
    }
  }

  const handleLoginGoogle = async googleData => {
    const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
        }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
  }

  return (
    <div>
      <h2 className="mt-10 text-[28px] leading-[34px] text-gray-900 text-fjalla">Hi There,</h2>
      <div className="mt-4">
        <p className="text-base leading-[19px] text-green-800 text-lato">Please Login with your Mobile phone number or with your email address.</p>
        <div className="mt-[46px]">
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm leading-[17px] text-gray-500">Phone Number/Email</label>
                <input
                  onChange={ (e) => setUsername(e.target.value) }
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  placeholder="input phone number or email address"
                  required
                  className={ classNames(validation.request || validation.err
                    ? 'border border-red-400'
                    : 'border border-transparent',
                    'mt-2 appearance-none block w-full px-5 py-4 rounded-2xl placeholder-gray-400 bg-gray-100 text-sm focus-visible:outline-green-400 outline-1'
                    ) }
                />
                {
                  validation.request ?
                    <span className="text-xs font-normal text-red-400 text-center mt-2">
                      { validation.request }
                    </span> : ''
                }
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm leading-[17px] text-gray-500">Password</label>
                <InputPassword 
                  onChange={ (e) => setPassword(e.target.value) }
                  id="password"
                  name="password"
                  placeholder="input password"
                  required
                  className={ classNames(validation.password || validation.err
                    ? 'border border-red-400'
                    : 'border border-transparent') }
                />
                {
                  validation.password ?
                    <span className="text-xs font-normal text-red-400 text-center mt-2">
                      { validation.password }
                    </span> : ''
                }
                {
                  validation.err ?
                    <span className="text-xs font-normal text-red-400 text-center mt-2">
                      { validation.err }
                    </span> : ''
                }
              </div>
            </div>
            <div className="text-xs mt-2">
                <Link href="/forgot-passcode" className="text-green-500 hover:text-green-600" passHref>
                Forgot Password?
                </Link>
            </div>
            <button type="submit" className="mt-6 w-full flex justify-center p-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-gray-50 bg-green-400 hover:bg-green-500 transition-all duration-300 ease-in-out max-h-[52px]">
                Log in
            </button>
          </form>
        </div>
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-600">Or</span>
          </div>
        </div>
        <GoogleLogin
            className="mt-6 google-button hover:!bg-green-400 hover:border-green-400 hover:!text-white transition-all duration-300 ease-in-out max-h-[52px]"
            clientId={process.env.GOOGLE_ID}
            responseType="code"
            buttonText="Connect with Google"
            onSuccess={handleLoginGoogle}
            onFailure={handleLoginGoogle}
            cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
}

export default LoginForm