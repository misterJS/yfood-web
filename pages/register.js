import Head from 'next/head'
import LayoutAuth from '../components/layout-auth'
import RegisterForm from '../components/form/register-form'

function RegisterPage() {
  return (
     <LayoutAuth>
      <Head>
        <title>YFood Hub | Register</title>
      </Head>
       <RegisterForm></RegisterForm>
     </LayoutAuth>
  )
}

export default RegisterPage