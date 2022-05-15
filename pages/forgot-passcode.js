import { useState } from 'react'
import Head from 'next/head'
import LayoutAuth from '../components/layout-auth'
import CheckUsernameForm from '../components/form/check-username-form'
import CheckCodeForm from '../components/form/check-code-form'
import ResetPasswordForm from '../components/form/reset-password-form'

function ForgotPasswordPage() {
	const [username, setUsername] = useState('')
	const [step, setStep] = useState(1)

  const changeFormData = (val) => {
    setStep(val.step)
    setUsername(val.username)
  }

  return (
  <LayoutAuth>
    <Head>
      <title>YFood Hub | Forgot Password</title>
    </Head>
    {
      step == 1 && (
        <CheckUsernameForm
          step={ step }
          changeFormData={ changeFormData }
        />
      )
    }
    {
      step == 2 && (
        <CheckCodeForm
          step={ step }
          username={ username }
          changeFormData={ changeFormData }
        />
      )
    }
    {
      step == 3 && (
        <ResetPasswordForm 
          username={ username }
        />
      )
    }
  </LayoutAuth>
  )
}

export default ForgotPasswordPage