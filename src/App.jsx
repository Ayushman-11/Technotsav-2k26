import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import EventDetail from './pages/EventDetail.jsx'
import './App.css'

function ScrollHandler() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location.pathname, location.hash])

  return null
}

function NotFound() {
  return (
    <section className="page-notfound">
      <div className="container">
        <h1>Page Not Found</h1>
        <p>Return to the launch deck and choose another mission.</p>
        <a className="btn primary" href="/">
          Back to Home
        </a>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
