import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="pb-0 pt-0 h-full min-h-screen items-start p-0 relative overflow-hidden flex bg-cover bg-center bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-basic.jpg')]">
      <div className="container">
        index
      </div>
    </div>
  )
}

export default Home
