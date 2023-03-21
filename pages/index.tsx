import type { NextPage } from 'next'
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/router"
// import { useEffect } from "react";

const Home: NextPage = () => {
  // const { data: session } = useSession()
  // const router = useRouter()

  // useEffect(() => {
  // if (session) {
  //   router.push("/dashboard");
  // }
  // }, [session, router]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
        Authentication in
        <span className="relative whitespace-nowrap text-blue-600">
          <span className="relative"> Next.js 13</span></span>.
      </h1>git
      <p className='mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </div>
  )
}

export default Home
