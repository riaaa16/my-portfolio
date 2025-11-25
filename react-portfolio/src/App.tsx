import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { Home, Projects, Blog, Contact } from './Routes'
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )}

export default App
