import { Outlet } from "react-router-dom"
import Header from './Header'
import Sidebar from './Sidebar'
import Nav from './Nav'
import Footer from "./Footer"

export default function Layout() {
  return (
    <div id="page">
      <Header />
      <div id="inner">
        <Sidebar />
        <div id="main">
          <Nav />
          <main id="content">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}