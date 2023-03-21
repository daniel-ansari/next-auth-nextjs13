import { signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  if (loading)
    return <>Loading...</>

  return (
    <header className="py-10">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a aria-label="Home" href="/#">
              Authentication in Next.js 13
            </a>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {!session && (<>
              <div className="hidden md:block">
                <a className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/auth/login">Sign in</a>
              </div>
              <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
                href="/auth/register">
                <span>Get started <span className="hidden lg:inline">today</span></span>
              </a>
            </>
            )}
            {session?.user && (
              <>
                {session.user.image && (
                  <div className="hidden md:block">
                    <span
                      style={{
                        borderRadius: "2rem",
                        float: "left",
                        height: "2.8rem",
                        width: "2.8rem",
                        backgroundColor: "white",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url('${session.user.image}')`
                      }}
                    />
                  </div>
                )}
                <div className="hidden md:block">
                  <div className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700">
                    <span>
                      <small>Signed in as</small>
                      <br />
                      <strong>{session.user.email ?? session.user.name}</strong>
                    </span>
                  </div>
                </div>
                <a
                  href={`/api/auth/signout`}
                  className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-600 text-white hover:text-slate-100 hover:bg-red-500 active:bg-red-800 active:text-red-100 focus-visible:outline-red-600"
                  onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  Sign out
                </a>
              </>
            )}
            <div className="-mr-1 md:hidden">
              <div data-headlessui-state="">
                <button className="relative z-10 flex h-8 w-8 items-center justify-center [&amp;:not(:focus-visible)]:focus:outline-none" aria-label="Toggle Navigation" type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:R3p6:">
                  <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" strokeWidth="2" strokeLinecap="round">
                    <path d="M0 1H14M0 7H14M0 13H14" className="origin-center transition"></path><path d="M2 2L12 12M12 2L2 12" className="origin-center transition scale-90 opacity-0">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div >
    </header >
  )
}