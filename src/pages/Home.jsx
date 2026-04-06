import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { events, departmentFilters } from '../lib/events.js'
import SectionHead from '../components/SectionHead.jsx'
import EventCard from '../components/EventCard.jsx'
import PixelSnow from '../components/PixelSnow.jsx'

const ROADMAP = [
    {
        phase: '01 April · Pre-Launch',
        title: 'Registration Opens',
        detail:
            'Registration portal goes live with early-bird entries and team formation support.',
        highlights: ['Early-bird entries', 'Team formation', 'Guidelines live'],
    },
    {
        phase: '10 April · Pre-Launch',
        title: 'Registration Closes',
        detail:
            'Final submission window closes for entries and workshop sign-ups.',
        highlights: ['Final submissions', 'Workshop sign-ups', 'Roster lock'],
    },
    {
        phase: '15 April · Day 01',
        title: 'Launch Window + Competitive Tracks',
        detail:
            'Check-in, inaugural keynote, and department-led competitions light up the runway with rapid-fire challenges.',
        highlights: ['Inaugural keynote', 'Department contests', 'Opening briefings'],
    },
    {
        phase: '16 April · Day 02',
        title: 'Workshops, Showcases + Awards',
        detail:
            'Hands-on workshops, project demos, and judging panels guide the final showcases and closing ceremonies.',
        highlights: ['Hands-on labs', 'Project expo', 'Awards + closing'],
    },
    {
        phase: '17 April · Post-Event',
        title: 'Results + Declarations',
        detail:
            'Final results and certificates are published with winning team announcements.',
        highlights: ['Winner list', 'Certificates', 'Next steps'],
    },
]

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
}

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const TECHO_HIGHLIGHTS_FILTER = 'TECHO-HIGHLIGHTS'
const FLYER_URL = `${import.meta.env.BASE_URL}flyer.pdf`

function isHotEvent(event) {
    return Boolean(event?.isHot)
}

function shouldOpenEventsFromNavigation() {
    const sessionFlag = sessionStorage.getItem('technotsav_open_events') === '1'
    const urlFlag = new URLSearchParams(window.location.search).get('openEvents') === '1'

    return sessionFlag || urlFlag
}

function Home() {
    const departmentCodeOptions = departmentFilters.filter((department) => department !== 'All')
    const departmentOptions = [...new Set([TECHO_HIGHLIGHTS_FILTER, ...departmentCodeOptions])]
    const [activeDepartment, setActiveDepartment] = useState(() => {
        const persistedDepartment = sessionStorage.getItem('technotsav_filter')
        if (persistedDepartment && persistedDepartment !== 'All') {
            return persistedDepartment
        }

        return departmentOptions[0] || TECHO_HIGHLIGHTS_FILTER
    })
    const [hasDepartmentSelection, setHasDepartmentSelection] = useState(
        () => shouldOpenEventsFromNavigation(),
    )

    useEffect(() => {
        sessionStorage.setItem('technotsav_filter', activeDepartment)
    }, [activeDepartment])

    useEffect(() => {
        if (sessionStorage.getItem('technotsav_open_events') === '1') {
            sessionStorage.removeItem('technotsav_open_events')
        }

        const params = new URLSearchParams(window.location.search)
        if (params.get('openEvents') === '1') {
            params.delete('openEvents')
            const query = params.toString()
            const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
            window.history.replaceState({}, '', nextUrl)
        }
    }, [])

    const filterOptions = departmentOptions
    const departmentCardOptions = departmentOptions
    const [countdown, setCountdown] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    })
    const filteredEvents = events.filter((event) =>
        activeDepartment === TECHO_HIGHLIGHTS_FILTER
            ? isHotEvent(event)
            : (event.departmentCode || event.department) === activeDepartment,
    )

    const activeDepartmentLabel =
        activeDepartment === TECHO_HIGHLIGHTS_FILTER
            ? 'TECHO Highlights'
            : activeDepartment
    const eventsSectionTitle = 'Choose Department To View Events'
    const eventsSectionDescription = !hasDepartmentSelection
        ? 'Select a department card below and click Explore More to load event cards.'
        : `You are viewing ${activeDepartmentLabel} (${filteredEvents.length} ${filteredEvents.length === 1 ? 'event' : 'events'}). Choose another department card to switch.`

    const scrollWithHeaderOffset = (target, spacingOffset = 16) => {
        if (!target) {
            return
        }

        const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 0
        const subheaderHeight = document.querySelector('.site-subheader')?.getBoundingClientRect().height || 0
        const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            subheaderHeight -
            spacingOffset

        window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth',
        })
    }

    const handleDepartmentSelect = (department, source = 'subheader') => {
        setActiveDepartment(department)
        setHasDepartmentSelection((current) => current || source === 'card')

        window.setTimeout(() => {
            const canShowEvents = hasDepartmentSelection || source === 'card'
            const selectedDepartmentLabel = document.querySelector('#events .events-selected-dept')
            const eventCards = document.querySelector('#events .event-scroll')
            const departmentPicker = document.querySelector('#events .dept-grid--picker')
            const eventsSection = document.getElementById('events')
            const scrollTarget = canShowEvents
                ? (selectedDepartmentLabel || eventCards || eventsSection)
                : (departmentPicker || eventsSection)
            scrollWithHeaderOffset(scrollTarget)
        }, 0)
    }

    const handleExploreEventsClick = () => {
        window.setTimeout(() => {
            const departmentPicker = document.querySelector('#events .dept-grid--picker')
            const eventsSection = document.getElementById('events')
            scrollWithHeaderOffset(departmentPicker || eventsSection, 12)
        }, 0)
    }

    useEffect(() => {
        const target = new Date('2026-04-15T10:00:00+05:30')

        const updateCountdown = () => {
            const now = new Date()
            const diff = Math.max(0, target.getTime() - now.getTime())
            const totalSeconds = Math.floor(diff / 1000)
            const days = Math.floor(totalSeconds / 86400)
            const hours = Math.floor((totalSeconds % 86400) / 3600)
            const minutes = Math.floor((totalSeconds % 3600) / 60)
            const seconds = totalSeconds % 60

            const pad = (value) => String(value).padStart(2, '0')

            setCountdown({
                days: pad(days),
                hours: pad(hours),
                minutes: pad(minutes),
                seconds: pad(seconds),
            })
        }

        updateCountdown()
        const timer = setInterval(updateCountdown, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        document.body.classList.add('has-filter-subheader-body')
        return () => {
            document.body.classList.remove('has-filter-subheader-body')
        }
    }, [])

    return (
        <main className="has-filter-subheader">
            <div className="site-subheader" aria-label="Department filters">
                <div className="container">
                    <div className="events-subheader">
                        <div className="events-subheader-inner">
                            <span className="events-subheader-label">Filter by Department</span>
                            <div
                                className="dept-filter"
                                role="tablist"
                                aria-label="Filter events by department"
                            >
                                {filterOptions.map((dept) => (
                                    <button
                                        key={dept}
                                        type="button"
                                        role="tab"
                                        aria-selected={activeDepartment === dept}
                                        className={`dept-filter-btn${dept === TECHO_HIGHLIGHTS_FILTER ? ' is-hot-filter' : ''}${activeDepartment === dept ? ' is-active' : ''}`}
                                        onClick={() => handleDepartmentSelect(dept, 'subheader')}
                                    >
                                        {dept}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="hero" id="home">
                <div className="hero-overlay" />
                <div className="container hero-grid hero-grid--editorial">
                    <motion.div
                        className="hero-copy hero-copy--editorial"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6 }}
                    >
                        <span className="hero-kicker">15th-16th April 2026 · DYPCET Kolhapur</span>
                        <h1 className="hero-main-title">
                            Technotsav <span>2026</span>
                        </h1>
                        <p className="hero-subtitle">Enter the Next Dimension Of Innovation</p>
                        <p className="hero-lead">
                            A two-day innovation festival packed with engineering competitions,
                            hands-on challenges, and showcase moments built for creators.
                        </p>

                        <div className="hero-actions">
                            <button
                                type="button"
                                className="btn primary hero-cta"
                                onClick={handleExploreEventsClick}
                            >
                                Explore Events
                            </button>
                            <a
                                href={FLYER_URL}
                                download="Technotsav26-Flyer.pdf"
                                className="btn ghost hero-cta-secondary"
                            >
                                Download Flyer
                            </a>
                        </div>

                        <div className="hero-countdown hero-countdown--hero">
                            <span className="meta-label">Launch in</span>
                            <div className="countdown-grid">
                                <div>
                                    <strong>{countdown.days}</strong>
                                    <span>Days</span>
                                </div>
                                <div>
                                    <strong>{countdown.hours}</strong>
                                    <span>Hrs</span>
                                </div>
                                <div>
                                    <strong>{countdown.minutes}</strong>
                                    <span>Mins</span>
                                </div>
                                <div>
                                    <strong>{countdown.seconds}</strong>
                                    <span>Secs</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>

            <section className="events" id="events">
                <PixelSnow
                    color="#ffffff"
                    flakeSize={0.01}
                    minFlakeSize={1.75}
                    pixelResolution={450}
                    speed={0.35}
                    depthFade={5}
                    farPlane={20}
                    brightness={1}
                    gamma={0.4545}
                    density={0.3}
                    variant="snowflake"
                    direction={100}
                />
                <div className="container events-content">
                    <SectionHead
                        eyebrow="Mission Catalog"
                        title={eventsSectionTitle}
                        description={eventsSectionDescription}
                    />
                    <div className="dept-grid dept-grid--picker" aria-label="Choose department">
                        {departmentCardOptions.map((department) => {
                            const isActive = activeDepartment === department
                            const departmentEvents =
                                department === TECHO_HIGHLIGHTS_FILTER
                                    ? events.filter((event) => isHotEvent(event))
                                    : events.filter(
                                        (event) => (event.departmentCode || event.department) === department,
                                    )
                            const eventCount = departmentEvents.length
                            const previewTitles = departmentEvents.slice(0, 4).map((event) => event.title)
                            const departmentLabel =
                                department === TECHO_HIGHLIGHTS_FILTER
                                    ? 'TECHO Highlights'
                                    : department

                            return (
                                <article
                                    key={department}
                                    className={`dept-card dept-card--pick${isActive ? ' is-active' : ''}`}
                                >
                                    <span
                                        className="dept-card-count"
                                        aria-label={`${eventCount} events available`}
                                        title={`${eventCount} events`}
                                    >
                                        {eventCount}
                                    </span>
                                    <div className="dept-card-head">
                                        <h3>{departmentLabel}</h3>
                                    </div>
                                    <div className="dept-card-divider" aria-hidden="true" />
                                    {previewTitles.length > 0 ? (
                                        <ol className="dept-card-list" aria-label={`${departmentLabel} event titles`}>
                                            {previewTitles.map((title) => (
                                                <li key={`${department}-${title}`}>{title}</li>
                                            ))}
                                        </ol>
                                    ) : (
                                        <p className="dept-card-list-empty">No events listed yet.</p>
                                    )}
                                    <button
                                        type="button"
                                        className="btn ghost dept-card-action"
                                        onClick={() => handleDepartmentSelect(department, 'card')}
                                    >
                                        Explore More
                                    </button>
                                </article>
                            )
                        })}
                    </div>
                    <div className="events-results" aria-live="polite">
                        {hasDepartmentSelection ? (
                            <div className="events-selected-dept" role="status" aria-label="Selected department">
                                <span>Selected department:</span>
                                <strong>{activeDepartmentLabel}</strong>
                            </div>
                        ) : null}
                        {!hasDepartmentSelection ? (
                            <div className="events-placeholder" role="status">
                                <h3>Choose a department card to view events</h3>
                                <p>The event list will appear here after you pick a department card.</p>
                            </div>
                        ) : filteredEvents.length > 0 ? (
                            <div
                                className="event-scroll"
                                aria-label={`${activeDepartmentLabel} events`}
                            >
                                <div className="event-scroll-track">
                                    {filteredEvents.map((event) => (
                                        <div key={event.id}>
                                            <EventCard event={event} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="events-empty" role="status">
                                <h3>No events found for {activeDepartmentLabel}</h3>
                                <p>Try switching to another department from the list above.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Home
