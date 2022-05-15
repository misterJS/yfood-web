import Head from 'next/head'
import Layout from '../components/layout'

function Home() {
  return (
    <Layout>
        <Head>
          <title>YFood Hub</title>
        </Head>
        <div className='bg-slate-300 p-4 text-slate-700'>
          <p className='capitalize'>
            body
          </p>
        </div>
          {/* <Image src='/images/yfood-logo.svg' alt='Vercel Logo' width={72} height={16} /> */}
    </Layout>
  );
}

export default Home