import { Outlet } from "react-router-dom"
import Header from './Header'
import Sidebar from './Sidebar'
import Nav from './Nav'

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

      <footer>
        <p>© 2025 My Portfolio</p>
      </footer>
    </div>
  )
}