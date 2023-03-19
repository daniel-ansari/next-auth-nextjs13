import React from "react";
import Navbar from './navbar'
import Footer from './footer'

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="mt-0 transition-all duration-200 ease-in-out">{children}</main>
      <Footer />
    </>
  )
}