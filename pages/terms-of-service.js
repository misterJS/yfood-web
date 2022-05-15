import Head from 'next/head'
import Layout from '../components/layout'

function TermsOfServicePage() {
  return (
    <Layout>
        <Head>
          <title>YFood Hub</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='bg-slate-300 p-4 text-slate-700'>
          <p className='capitalize'>
            terms of services
          </p>
        </div>
    </Layout>
  );
}

export default TermsOfServicePage