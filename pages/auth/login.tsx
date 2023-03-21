import { GetServerSideProps } from 'next'
import { useState } from "react";
import { signIn, useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import GoogleBtn from '../../components/google-btn'

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false
    })

    if (res?.error) {
      setError(res.error);
    } else {
      setError('');
      router.push('/dashboard');
    }
  }

  return (
    <>
      <div className="flex flex-wrap px-4 -mx-3 sm:px-6 xl:px-12">
        <div className="my-20"><h2 className="text-lg font-semibold text-gray-900">Sign in to your account</h2><p className="mt-2 text-sm text-gray-700">Don’t have an account?<a className="font-medium text-blue-600 hover:underline" href="/auth/register">Sign up</a> for a free trial.</p></div>
        <div className="px-1 ml-auto flex-0">
          <a className="inline-block w-full px-6 py-3 mb-4 text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all ease-in bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:-translate-y-px active:-translate-y-px active:hover:bg-transparent active:hover:text-gray-200 active:bg-gray-200 active:shadow-xs active:hover:shadow-none leading-pro tracking-tight-rem bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
            <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(3.000000, 3.000000)" fillRule="nonzero">
                  <circle fill="#3C5A9A" cx="29.5091719" cy="29.4927506" r="29.4882047"></circle>
                  <path d="M39.0974944,9.05587273 L32.5651312,9.05587273 C28.6886088,9.05587273 24.3768224,10.6862851 24.3768224,16.3054653 C24.395747,18.2634019 24.3768224,20.1385313 24.3768224,22.2488655 L19.8922122,22.2488655 L19.8922122,29.3852113 L24.5156022,29.3852113 L24.5156022,49.9295284 L33.0113092,49.9295284 L33.0113092,29.2496356 L38.6187742,29.2496356 L39.1261316,22.2288395 L32.8649196,22.2288395 C32.8649196,22.2288395 32.8789377,19.1056932 32.8649196,18.1987181 C32.8649196,15.9781412 35.1755132,16.1053059 35.3144932,16.1053059 C36.4140178,16.1053059 38.5518876,16.1085101 39.1006986,16.1053059 L39.1006986,9.05587273 L39.0974944,9.05587273 L39.0974944,9.05587273 Z" fill="#FFFFFF"></path>
                </g>
              </g>
            </svg>
          </a>
        </div>
        <div className="px-1 flex-0">
          <a className="inline-block w-full px-6 py-3 mb-4 text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all ease-in bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:-translate-y-px active:-translate-y-px active:hover:bg-transparent active:hover:text-gray-200 active:bg-gray-200 active:shadow-xs active:hover:shadow-none leading-pro tracking-tight-rem bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
            <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(7.000000, 0.564551)" fill="#000000" fillRule="nonzero">
                  <path d="M40.9233048,32.8428307 C41.0078713,42.0741676 48.9124247,45.146088 49,45.1851909 C48.9331634,45.4017274 47.7369821,49.5628653 44.835501,53.8610269 C42.3271952,57.5771105 39.7241148,61.2793611 35.6233362,61.356042 C31.5939073,61.431307 30.2982233,58.9340578 25.6914424,58.9340578 C21.0860585,58.9340578 19.6464932,61.27947 15.8321878,61.4314159 C11.8738936,61.5833617 8.85958554,57.4131833 6.33064852,53.7107148 C1.16284874,46.1373849 -2.78641926,32.3103122 2.51645059,22.9768066 C5.15080028,18.3417501 9.85858819,15.4066355 14.9684701,15.3313705 C18.8554146,15.2562145 22.5241194,17.9820905 24.9003639,17.9820905 C27.275104,17.9820905 31.733383,14.7039812 36.4203248,15.1854154 C38.3824403,15.2681959 43.8902255,15.9888223 47.4267616,21.2362369 C47.1417927,21.4153043 40.8549638,25.1251794 40.9233048,32.8428307 M33.3504628,10.1750144 C35.4519466,7.59650964 36.8663676,4.00699306 36.4804992,0.435448578 C33.4513624,0.558856931 29.7884601,2.48154382 27.6157341,5.05863265 C25.6685547,7.34076135 23.9632549,10.9934525 24.4233742,14.4943068 C27.7996959,14.7590956 31.2488715,12.7551531 33.3504628,10.1750144"></path>
                </g>
              </g>
            </svg>
          </a>
        </div>
        <div className="px-1 mr-auto flex-0">
          <GoogleBtn />
        </div>
        <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
          <p className="inline mb-2 px-4 text-slate-400 bg-white z-2 text-sm leading-normal font-semibold before:bg-gradient-to-r before:from-transparent before:via-neutral-500/40 before:to-neutral-500/40 before:right-2 before:-ml-1/2 before:content-[''] before:inline-block before:w-3/10 before:h-px before:relative before:align-middle after:left-2 after:-mr-1/2 after:bg-gradient-to-r after:from-neutral-500/40 after:via-neutral-500/40 after:to-transparent after:content-[''] after:inline-block after:w-3/10 after:h-px after:relative after:align-middle">or</p>
        </div>
      </div>
      <section className="flex-auto py-6 text-center">
        <form onSubmit={handleSubmit} className="form text-left">
          <div className="mb-4">
            <input
              type="email"
              value={email}
              className="text-sm placeholder:text-gray-500 focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
              placeholder="Email"
              aria-label="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              className="text-sm placeholder:text-gray-500 focus:shadow-primary-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
              placeholder="Password"
              aria-label="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-block w-full px-5 py-2.5 mt-6 mb-2 text-sm font-bold text-center text-white align-middle transition-all ease-in bg-transparent border-0 rounded-lg shadow-md cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-xs leading-normal tracking-tight-rem bg-150 bg-x-25 bg-gradient-to-tl from-zinc-800 to-zinc-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white">
              Log in
            </button>
          </div>
          {error && <div>{error}</div>}
        </form>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}