import GoogleLogin from 'react-google-login'

function RegisterForm() {
    const handleLogin = async googleData => {
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
            <h2 className="mt-10 text-[28px] leading-[34px] text-gray-900 text-fjalla">Let’s Join,</h2>
            <div className="mt-4">
                <p className="text-base text-green-800 text-lato">Please register with your Mobile phone number or with your email address.</p>
                <div className="mt-[46px]">
                    <form action="#" method="POST">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm text-gray-500">Phone Number/Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    placeholder="input phone number or email address"
                                    required
                                    className="mt-2 appearance-none block w-full px-5 py-4 rounded-2xl placeholder-gray-400 bg-gray-100 text-sm focus-visible:outline-green-400 outline-1"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm text-gray-500">Create Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="input password"
                                    required
                                    className="mt-2 appearance-none block w-full px-5 py-4 rounded-2xl placeholder-gray-400 bg-gray-100 text-sm focus-visible:outline-green-400 outline-1"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm text-gray-500">Confirm Password</label>
                                <input
                                    id="confirm-password"
                                    name="confirm_password"
                                    type="password"
                                    autoComplete="confirm-password"
                                    placeholder="input confirm password"
                                    required
                                    className="mt-2 appearance-none block w-full px-5 py-4 rounded-2xl placeholder-gray-400 bg-gray-100 text-sm focus-visible:outline-green-400 outline-1"
                                />
                            </div>
                        </div>
                        <button type="submit" className="mt-6 w-full flex justify-center p-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-gray-50 bg-green-400 hover:bg-green-500 transition-all duration-300 ease-in-out max-h-[52px]">
                            Register
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
                    buttonText="Register with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    );
}

export default RegisterForm