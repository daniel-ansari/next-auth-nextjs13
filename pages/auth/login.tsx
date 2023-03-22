import { GetServerSideProps } from 'next'
import { useState } from "react";
import { signIn, useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import FacebookBtn from '../../components/facebook-btn'
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
          <FacebookBtn />
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