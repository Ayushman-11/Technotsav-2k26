import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import FlyerFab from './FlyerFab.jsx'

const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/#about' },
    { label: 'Events', to: '/#events' },
]

const COLLEGE_LOGO_SRC = `${import.meta.env.BASE_URL}dypcet.png`
const BACKGROUND_VIDEO_SRC = `${import.meta.env.BASE_URL}13442856_1920_1080_60fps.mp4`

function canUseBackgroundVideo() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.matchMedia('(min-width: 961px)').matches
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const saveData = Boolean(connection?.saveData)
    const effectiveType = String(connection?.effectiveType || '').toLowerCase()
    const lowBandwidth = effectiveType.includes('2g') || effectiveType.includes('3g')

    return isDesktop && !prefersReducedMotion && !saveData && !lowBandwidth
}

function Layout() {
    const location = useLocation()
    const [isHeaderHidden, setIsHeaderHidden] = useState(false)
    const [shouldRenderBackgroundVideo, setShouldRenderBackgroundVideo] = useState(false)
    const lastScrollYRef = useRef(0)

    useEffect(() => {
        const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth

        const handleScroll = () => {
            const isMobile = getViewportWidth() <= 760
            const keepHeaderVisible = location.pathname === '/'

            if (keepHeaderVisible) {
                setIsHeaderHidden(false)
                lastScrollYRef.current = window.scrollY
                return
            }

            if (!isMobile) {
                setIsHeaderHidden(false)
                lastScrollYRef.current = window.scrollY
                return
            }

            const currentScrollY = window.scrollY
            const lastScrollY = lastScrollYRef.current
            const scrollingDown = currentScrollY > lastScrollY + 8
            const scrollingUp = currentScrollY < lastScrollY - 8

            if (currentScrollY <= 24 || scrollingUp) {
                setIsHeaderHidden(false)
            } else if (scrollingDown && currentScrollY > 64) {
                setIsHeaderHidden(true)
            }

            lastScrollYRef.current = currentScrollY
        }

        const handleResize = () => {
            if (getViewportWidth() > 760) {
                setIsHeaderHidden(false)
            }
        }

        lastScrollYRef.current = window.scrollY
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [location.pathname])

    useEffect(() => {
        const updateBackgroundVideoPreference = () => {
            setShouldRenderBackgroundVideo(canUseBackgroundVideo())
        }

        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

        updateBackgroundVideoPreference()
        window.addEventListener('resize', updateBackgroundVideoPreference)
        connection?.addEventListener?.('change', updateBackgroundVideoPreference)

        return () => {
            window.removeEventListener('resize', updateBackgroundVideoPreference)
            connection?.removeEventListener?.('change', updateBackgroundVideoPreference)
        }
    }, [])

    return (
        <div className="app">
            <div className="combined-video-bg" aria-hidden="true">
                {shouldRenderBackgroundVideo ? (
                    <video className="combined-video" autoPlay loop muted playsInline preload="metadata">
                        <source src={BACKGROUND_VIDEO_SRC} type="video/mp4" />
                    </video>
                ) : null}
            </div>
            <header className={`site-header${isHeaderHidden ? ' is-hidden-mobile' : ''}`}>
                <div className="container header-inner">
                    <div className="brand brand--college">
                        <img
                            src={COLLEGE_LOGO_SRC}
                            alt="D Y Patil College of Engineering and Technology"
                            className="college-logo"
                            loading="eager"
                        />
                    </div>
                    <div className="header-event-name" aria-label="Event name">
                        TECHNOTSAV 2K26
                    </div>
                </div>
            </header>

            <Outlet />

            <footer className="site-footer">
                <div className="container footer-inner">
                    <div className="footer-brand">
                        <div className="footer-title">TECHNOTSAV 2K26</div>
                        <p className="footer-subtitle">
                            D. Y. Patil College Of Engineering &amp; Technology, Kasaba Bawada,
                            Kolhapur, Maharashtra 416006, India
                        </p>
                    </div>
                    <div className="footer-column">
                        <span className="footer-label">Navigate</span>
                        <div className="footer-links">
                            {NAV_LINKS.map((link) => (
                                <Link key={link.to} to={link.to}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="footer-column">
                        <span className="footer-label">Location</span>
                        <div className="footer-map-wrap" aria-label="DY Patil College of Engineering and Technology location map">
                            <iframe
                                className="footer-map"
                                title="DY Patil College of Engineering and Technology, Kolhapur"
                                src="https://www.google.com/maps?q=DY+Patil+College+of+Engineering+and+Technology+Kasaba+Bawada+Kolhapur&output=embed"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </footer>
            <FlyerFab />
            <Analytics />
        </div>
    )
}

export default Layout
