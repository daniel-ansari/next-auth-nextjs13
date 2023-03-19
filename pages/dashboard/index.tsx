import { useRouter } from "next/router"
import { useSession, signOut } from "next-auth/react"
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push("/auth/login");
    }
  }, [session, status]);

  return (
    <div className="pb-0 pt-0 h-full min-h-screen items-start p-0 relative overflow-hidden flex bg-cover bg-center">
      <div className="container">
        <div className="flex flex-wrap justify-center mt-48 -mx-3 lg:mt-48 md:mt-56">
          <div className="w-full max-w-full px-6 mx-auto shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl lg:pb-4 dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              {session && <div className="text-center border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6">
                <h5>Dashboard</h5>
                <h1>Welcome, {session.user && session.user.name}!</h1>
                <p>Your email is {session.user && session.user.email}.</p>
                <img src={session.user && session.user.image} />

                <button onClick={() => signOut()}>Sign out</button>

              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
