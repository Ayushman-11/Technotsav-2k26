import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { events, departmentFilters } from '../lib/events.js'
import SectionHead from '../components/SectionHead.jsx'
import EventCard from '../components/EventCard.jsx'
import PixelSnow from '../components/PixelSnow.jsx'
import DecryptedText from '../components/DecryptedText.jsx'

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
        phase: '14 April · Day 01',
        title: 'Launch Window + Competitive Tracks',
        detail:
            'Check-in, inaugural keynote, and department-led competitions light up the runway with rapid-fire challenges.',
        highlights: ['Inaugural keynote', 'Department contests', 'Opening briefings'],
    },
    {
        phase: '15 April · Day 02',
        title: 'Workshops, Showcases + Awards',
        detail:
            'Hands-on workshops, project demos, and judging panels guide the final showcases and closing ceremonies.',
        highlights: ['Hands-on labs', 'Project expo', 'Awards + closing'],
    },
    {
        phase: '16 April · Post-Event',
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

function Home() {
    const [activeDepartment, setActiveDepartment] = useState('All')
    const [countdown, setCountdown] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    })
    const filteredEvents = events.filter((event) =>
        activeDepartment === 'All' ? true : event.department === activeDepartment,
    )

    useEffect(() => {
        const target = new Date('2026-04-14T10:00:00+05:30')

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

    return (
        <main>
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
                        <span className="eyebrow">Aerospace Editorial Vol. 01</span>
                        <h1 className="hero-title-stack">
                            <DecryptedText
                                text={`Enter the
Next Dimension
Of Innovation`}
                                speed={40}
                                maxIterations={12}
                                sequential
                                revealDirection="start"
                                animateOn="view"
                                parentClassName="hero-title"
                                className="decrypt-text"
                                encryptedClassName="decrypt-text decrypt-text--scramble"
                            />
                        </h1>
                        <DecryptedText
                            text="A technical frontier where human curiosity meets mathematical precision. Join the collective push toward the stars."
                            speed={30}
                            maxIterations={10}
                            animateOn="view"
                            parentClassName="hero-description"
                            className="decrypt-text"
                            encryptedClassName="decrypt-text decrypt-text--scramble"
                        />
                        <div className="hero-actions">
                            <div className="hero-countdown">
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
                        title="Upcoming Events"
                        description="Filter by department and explore the full technical roster."
                    />
                    <div className="dept-filter" role="tablist" aria-label="Filter events by department">
                        {departmentFilters.map((dept) => (
                            <button
                                key={dept}
                                type="button"
                                role="tab"
                                aria-selected={activeDepartment === dept}
                                className={`dept-filter-btn${activeDepartment === dept ? ' is-active' : ''}`}
                                onClick={() => setActiveDepartment(dept)}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                    <div className="event-scroll" aria-label="Upcoming events">
                        <div className="event-scroll-track">
                            {filteredEvents.map((event) => (
                                <div key={event.id}>
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats">
                <div className="container stats-grid">
                    <div>
                        <span className="meta-label">Altitude</span>
                        <h3>408 KM</h3>
                    </div>
                    <div>
                        <span className="meta-label">Velocity</span>
                        <h3>27.6K KM/H</h3>
                    </div>
                    <div>
                        <span className="meta-label">Personnel</span>
                        <h3>12,400+</h3>
                    </div>
                    <div>
                        <span className="meta-label">Launch Success</span>
                        <h3>99.8%</h3>
                    </div>
                </div>
            </section>

            <section className="roadmap" id="schedule">
                <span id="about" className="anchor-target" />
                <div className="container roadmap-grid">
                    <div className="roadmap-intro">
                        <span className="eyebrow">About Technotsav</span>
                        <h2>
                            A two-day tech fest built for <span className="accent">makers</span>
                        </h2>
                        <div className="roadmap-copy">
                            <p>
                                Technotsav'26 brings together students, mentors, and industry voices to
                                explore, build, and compete across core engineering domains.
                            </p>
                            <p>
                                Over two packed days, the festival blends hands-on challenges, keynote
                                sessions, and showcase tracks that celebrate engineering creativity and
                                real-world problem solving.
                            </p>
                            <p>
                                Each department curates its own event lineup while a central coordination
                                team aligns workshops, judging, and on-campus showcases for a seamless
                                experience from opening brief to final awards.
                            </p>
                        </div>
                    </div>
                    <motion.div
                        className="timeline"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {ROADMAP.map((item, index) => (
                            <motion.article
                                key={item.phase}
                                className="timeline-card"
                                variants={fadeUp}
                            >
                                <div className="timeline-marker" aria-hidden="true">
                                    <span className="timeline-dot" />
                                </div>
                                <div className="timeline-body">
                                    <span className="phase">{item.phase}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.detail}</p>
                                    <div className="timeline-highlights">
                                        {item.highlights.map((point) => (
                                            <span key={point}>{point}</span>
                                        ))}
                                    </div>
                                </div>
                                <span className="timeline-index">0{index + 1}</span>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>
        </main>
    )
}

export default Home
