import Head from 'next/head'
import LayoutAuth from '../components/layout-auth'
import LoginForm from '../components/form/login-form'

function LoginPage() {
  return (
     <LayoutAuth>
      <Head>
        <title>YFood Hub | Login</title>
      </Head>
       <LoginForm></LoginForm>
     </LayoutAuth>
  )
}

export default LoginPage