import { Outlet } from "react-router-dom"
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Nav from './components/Nav'
import Footer from "./components/Footer"

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