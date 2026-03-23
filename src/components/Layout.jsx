import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/#about' },
    { label: 'Events', to: '/#events' },
]

function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="app">
            <div className="combined-video-bg" aria-hidden="true">
                <video className="combined-video" autoPlay loop muted playsInline>
                    <source src="/11892851-hd_1280_720_24fps.mp4" type="video/mp4" />
                </video>
            </div>
            <header className="site-header">
                <div className="container header-inner">
                    <div className="brand">
                        <span className="brand-mark">TECHNOTSAV'26</span>
                    </div>
                    <nav className={`nav${isMenuOpen ? ' is-open' : ''}`} id="site-menu">
                        <div className="nav-links">
                            {NAV_LINKS.map((link) => (
                                <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                    <div className="header-actions">
                        <button
                            className="nav-toggle"
                            type="button"
                            aria-expanded={isMenuOpen}
                            aria-controls="site-menu"
                            onClick={() => setIsMenuOpen((open) => !open)}
                        >
                            <span className="sr-only">Toggle menu</span>
                            <span className="nav-toggle-bar" />
                            <span className="nav-toggle-bar" />
                            <span className="nav-toggle-bar" />
                        </button>
                    </div>
                </div>
            </header>

            <Outlet />

            <footer className="site-footer">
                <div className="container footer-inner">
                    <div className="footer-brand">
                        <span className="footer-kicker">Tech Fest 2026</span>
                        <div className="footer-title">TECHNOTSAV'26</div>
                        <p className="footer-subtitle">
                            D Y Patil College of Engineering and Technology, Kolhapur.
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
                        <span className="footer-label">Contact</span>
                        <div className="footer-meta">
                            <span>techfest@dypcoet.ac.in</span>
                            <span>+91 231 000 0000</span>
                        </div>
                        <div className="footer-socials">
                            <span>Instagram</span>
                            <span>LinkedIn</span>
                            <span>Facebook</span>
                        </div>
                    </div>
                </div>
                <div className="container footer-bottom">
                    <span>© 2026 Technotsav. All rights reserved.</span>
                    <span>Built for makers and innovators.</span>
                </div>
            </footer>
        </div>
    )
}

export default Layout
