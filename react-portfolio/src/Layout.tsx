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
          <div id="content">
            <main>
              <h1>Layout Preview</h1>
              <p>Router is temporarily disabled so you can inspect the layout.</p>
            </main>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2025 My Portfolio</p>
      </footer>
    </div>
  )
}