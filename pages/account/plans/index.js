import Head from 'next/head'
import Layout from '../../../components/layout'

function LoginPage() {
  return (
     <Layout>
      <Head>
        <title>YFood Hub | Account profile</title>
      </Head>
        <div className='bg-slate-300 p-4 text-slate-700'>
          <div className='w-full max-w-5xl mx-auto pt-10 pb-28'>
              <div 
                className='relative uppercase text-fjalla text-[28px] leading-[34px] tracking-[0.04em] pb-4 mb-8 before_border'
                >
                  <style jsx> {`
                    .before_border:before {
                      content: '';
                      position: absolute;
                      height: 4px;
                      width: 72px;
                      background-color: #cbd5e1;
                      bottom: 0;
                      left: 0;
                    }
                  `}

                  </style>
                  build a startup active plan
              </div>
          </div>
        </div>
     </Layout>
  )
}

export default LoginPage