import type { NextPage } from 'next'

const Error: NextPage = () => {
  return (
    <div className="pb-0 pt-0 h-full min-h-screen items-start p-0 relative overflow-hidden flex bg-cover bg-center bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-basic.jpg')]">
      <div className="container">
        <div className="flex flex-wrap justify-center mt-48 -mx-3 lg:mt-48 md:mt-56">
          <div className="w-full max-w-full px-6 mx-auto shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl lg:pb-4 dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="text-center border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6">
                <h5>Oops!</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
