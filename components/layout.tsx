import React from "react";
import Navbar from './navbar'
import Footer from './footer'
import { useRouter } from 'next/router';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/auth/login';
  const isRegisterPage = router.pathname === '/auth/register';

  if (isLoginPage || isRegisterPage) {
    return (
      <main className="relative flex min-h-full justify-center md:px-12 lg:px-0">
        <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            {children}
          </div>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <img alt="" src="https://salient.tailwindui.com/_next/static/media/background-auth.4bcf3f4b.jpg" width="1664" height="1866" decoding="async" data-nimg="1" className="absolute inset-0 h-full w-full object-cover" loading="lazy" style={{ color: 'transparent' }} />
        </div>
      </main>
    )
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}