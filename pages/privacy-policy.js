import Head from 'next/head'
import Layout from '../components/layout'

function PrivacyPolicyPage() {
  return (
    <Layout>
        <Head>
          <title>YFood Hub</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='bg-slate-300 p-4 text-slate-700'>
          <p className='capitalize'>
            privacy policy
          </p>
        </div>
    </Layout>
  );
}

export default PrivacyPolicyPage