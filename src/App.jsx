import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import EventDetail from './pages/EventDetail.jsx'
import './App.css'

const BOOT_LOADER_MIN_DURATION_MS = 1400
const BOOT_LOADER_FALLBACK_TIMEOUT_MS = 5000

function getInitialOfflineState() {
  if (typeof navigator === 'undefined') {
    return false
  }

  return !navigator.onLine
}

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
  const [isBootLoading, setIsBootLoading] = useState(true)
  const [isOffline, setIsOffline] = useState(getInitialOfflineState)

  useEffect(() => {
    const startedAt = Date.now()
    let hasResolved = false

    if (!isBootLoading) {
      return undefined
    }

    const resolveBootLoading = () => {
      if (hasResolved) {
        return
      }

      hasResolved = true
      const elapsed = Date.now() - startedAt
      const waitForMinimum = Math.max(0, BOOT_LOADER_MIN_DURATION_MS - elapsed)

      window.setTimeout(() => {
        setIsBootLoading(false)
      }, waitForMinimum)
    }

    if (document.readyState === 'complete') {
      resolveBootLoading()
      return undefined
    }

    const fallbackTimer = window.setTimeout(resolveBootLoading, BOOT_LOADER_FALLBACK_TIMEOUT_MS)
    window.addEventListener('load', resolveBootLoading, { once: true })

    return () => {
      window.clearTimeout(fallbackTimer)
      window.removeEventListener('load', resolveBootLoading)
    }
  }, [isBootLoading])

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const showLoader = isBootLoading || isOffline

  useEffect(() => {
    document.body.classList.toggle('is-loading-overlay', showLoader)

    return () => {
      document.body.classList.remove('is-loading-overlay')
    }
  }, [showLoader])

  return (
    <BrowserRouter>
      <div
        className={`site-loader${showLoader ? ' is-visible' : ''}`}
        role="status"
        aria-live="polite"
        aria-hidden={!showLoader}
      >
        <div className="site-loader-content">
          <img
            src={`${import.meta.env.BASE_URL}dyp_logo.png`}
            alt="DYP Loader Emblem"
            className="site-loader-logo"
            loading="eager"
          />
        </div>
      </div>
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
