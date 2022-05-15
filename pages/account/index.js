import Head from 'next/head'
import Layout from '../../components/layout'

function LoginPage() {
  return (
     <Layout>
      <Head>
        <title>YFood Hub | Account profile</title>
      </Head>
        <div className='bg-slate-300 p-4 text-slate-700'>
          <p className='capitalize py-20'>
            profile
          </p>
        </div>
     </Layout>
  )
}

export default LoginPage