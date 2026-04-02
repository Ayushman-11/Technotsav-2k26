import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getEventById } from '../lib/events.js'

function formatTimeRange(schedule) {
    if (!schedule?.start_time && !schedule?.end_time) return 'Time TBA'
    if (schedule?.start_time && schedule?.end_time) return `${schedule.start_time} - ${schedule.end_time}`
    return schedule?.start_time || schedule?.end_time
}

function formatMode(modes) {
    if (!Array.isArray(modes) || modes.length === 0) return 'As per event rules'
    return modes.map((mode) => mode.charAt(0).toUpperCase() + mode.slice(1)).join(', ')
}

function formatTeamSize(teamSize) {
    if (!teamSize || typeof teamSize.min !== 'number' || typeof teamSize.max !== 'number') {
        return 'As per event rules'
    }
    if (teamSize.min === teamSize.max) {
        return `${teamSize.min} member${teamSize.min > 1 ? 's' : ''}`
    }
    return `${teamSize.min}-${teamSize.max} members`
}

function formatFee(amount) {
    if (typeof amount !== 'number') return 'Not specified'
    return `INR ${amount.toLocaleString('en-IN')}`
}

function formatPrizeValue(prize) {
    if (typeof prize.amount === 'number') {
        return `INR ${prize.amount.toLocaleString('en-IN')}`
    }
    return prize.reward || 'Prize details to be announced'
}

function getPrizeStanding(position, index) {
    const normalized = String(position || '').toLowerCase()
    if (normalized.includes('1st') || normalized.includes('first')) {
        return { tone: 'gold', label: 'Winner' }
    }
    if (normalized.includes('2nd') || normalized.includes('second')) {
        return { tone: 'silver', label: 'Runner-up' }
    }
    if (normalized.includes('3rd') || normalized.includes('third')) {
        return { tone: 'bronze', label: 'Second Runner-up' }
    }
    if (normalized.includes('top')) {
        return { tone: 'elite', label: 'Top Standings' }
    }

    const fallback = ['gold', 'silver', 'bronze'][index] || 'elite'
    return { tone: fallback, label: 'Standing' }
}

function normalizeRounds(rounds) {
    if (!Array.isArray(rounds)) return []

    return rounds.map((round, index) => {
        if (typeof round === 'string') {
            return {
                key: `${round}-${index}`,
                title: round,
                subtitle: 'Challenge Segment',
                description: `This round focuses on ${round.toLowerCase()}.`,
                steps: [],
            }
        }

        const steps = Array.isArray(round?.steps) ? round.steps : []
        const subtitle = typeof round?.subtitle === 'string' && round.subtitle.trim().length > 0
            ? round.subtitle
            : steps.length > 0
                ? `${steps.length} step${steps.length > 1 ? 's' : ''}`
                : 'Round Overview'
        const description = typeof round?.description === 'string' && round.description.trim().length > 0
            ? round.description
            : `This round focuses on ${round?.name || `Round ${index + 1}`} and its evaluation flow.`

        return {
            key: `${round?.name || 'round'}-${index}`,
            title: round?.name || `Round ${index + 1}`,
            subtitle,
            description,
            steps,
        }
    })
}

function EventDetail() {
    const { eventId } = useParams()
    const event = useMemo(() => getEventById(eventId), [eventId])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [eventId])

    if (!event) {
        return (
            <main className="page-notfound">
                <div className="container">
                    <h1>Event Not Found</h1>
                    <p>The requested event could not be located in the current CSE catalog.</p>
                    <Link className="btn primary" to="/">
                        Back to Home
                    </Link>
                </div>
            </main>
        )
    }

    const rounds = useMemo(() => normalizeRounds(event.rounds), [event.rounds])
    const prizes = Array.isArray(event.prizes) ? event.prizes : []
    const contacts = Array.isArray(event.contacts) ? event.contacts : []
    const benefits = Array.isArray(event.benefits) ? event.benefits : []
    const details = event.details || {}
    const whoCanParticipate = Array.isArray(details.who_can_participate) ? details.who_can_participate : []
    const eventTimeline = Array.isArray(details.event_timeline) ? details.event_timeline : []
    const rulesAndRegulations = Array.isArray(details.rules_and_regulations) ? details.rules_and_regulations : []
    const additionalInformation = Array.isArray(details.additional_information) ? details.additional_information : []
    const participation = event.participation || {}
    const hasTeamParticipation = Array.isArray(participation.mode)
        ? participation.mode.some((mode) => String(mode).toLowerCase() === 'team')
        : false
    const schedule = event.schedule || {}
    const hasRegistrationLink = Boolean(event.registrationInfo?.link)
    const heroAboutParagraphs = [details.primary_overview, details.what_is].filter(
        (item) => typeof item === 'string' && item.trim().length > 0,
    )
    if (heroAboutParagraphs.length === 0) {
        heroAboutParagraphs.push(event.description || event.summary)
    }

    return (
        <main className="event-detail-page">
            <section className="event-detail-hero">
                <div className="event-detail-hero-bg" style={{ backgroundImage: `url(${event.image})` }} aria-hidden="true" />
                <div className="event-detail-hero-overlay" aria-hidden="true" />
                <div className="container event-detail-hero-content">
                    <Link to="/#events" className="event-back">
                        Back to Events
                    </Link>
                    <div className="event-detail-headline">
                        <div className="event-detail-badges">
                            <span className="event-badge">{event.department}</span>
                            <span className="event-badge">{event.eventId || event.id}</span>
                            <span className="event-badge">{(event.type || 'event').toUpperCase()}</span>
                        </div>
                        <h1 className="event-title">{event.eventName || event.title}</h1>
                        <div className="event-detail-hero-about-flow">
                            <p className="meta-label">About Event</p>
                            {heroAboutParagraphs.map((paragraph) => (
                                <p key={paragraph} className="event-detail-hero-about">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="event-detail-content">
                <div className="container event-detail-layout">
                    <div className="event-detail-main">
                        <article className="event-detail-panel">
                            <h2>Schedule</h2>
                            <div className="event-overview-grid">
                                <div>
                                    <span className="meta-label">Festival Day</span>
                                    <strong>{schedule.day || 'TBA'}</strong>
                                </div>
                                <div>
                                    <span className="meta-label">Date</span>
                                    <strong>{event.date}</strong>
                                </div>
                                <div>
                                    <span className="meta-label">Time</span>
                                    <strong>{formatTimeRange(schedule)}</strong>
                                </div>
                                <div>
                                    <span className="meta-label">Venue</span>
                                    <strong>{event.venue || 'Venue TBA'}</strong>
                                </div>
                            </div>
                        </article>

                        <article className="event-detail-panel">
                            <h2>Participation</h2>
                            <div className="event-overview-grid">
                                <div>
                                    <span className="meta-label">Eligibility</span>
                                    <strong>{participation.eligibility || 'As per event rules'}</strong>
                                </div>
                                <div>
                                    <span className="meta-label">Mode</span>
                                    <strong>{formatMode(participation.mode)}</strong>
                                </div>
                                <div>
                                    <span className="meta-label">Team Size</span>
                                    <strong>{formatTeamSize(participation.team_size)}</strong>
                                </div>
                                <div>
                                    <span className="meta-label">Individual Fee</span>
                                    <strong>{formatFee(event.fees?.individual)}</strong>
                                </div>
                                {hasTeamParticipation && (
                                    <div>
                                        <span className="meta-label">Team Fee</span>
                                        <strong>{formatFee(event.fees?.team)}</strong>
                                    </div>
                                )}
                            </div>
                        </article>

                        {whoCanParticipate.length > 0 && (
                            <article className="event-detail-panel">
                                <h2>Who Can Participate</h2>
                                <ul className="event-detail-list">
                                    {whoCanParticipate.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                        )}

                        <article className="event-detail-panel">
                            <h2>Rounds</h2>
                            <div className="event-round-list">
                                {rounds.map((round, index) => (
                                    <section key={round.key} className="event-round-card">
                                        <header className="event-round-card-top">
                                            <span className="event-round-card-number">Round {index + 1}</span>
                                            <span className="event-round-card-meta">
                                                {round.steps.length > 0
                                                    ? `${round.steps.length} Step${round.steps.length > 1 ? 's' : ''}`
                                                    : 'Overview'}
                                            </span>
                                        </header>
                                        <h3 className="event-round-card-title">{round.title}</h3>
                                        {round.subtitle && (
                                            <p className="event-round-card-subtitle">{round.subtitle}</p>
                                        )}
                                        <p className="event-round-card-description">{round.description}</p>
                                        {round.steps.length > 0 ? (
                                            <ol className="event-round-card-steps">
                                                {round.steps.map((step, stepIndex) => (
                                                    <li key={step}>
                                                        <span className="event-round-card-step-index">{stepIndex + 1}</span>
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        ) : (
                                            <p className="event-round-card-empty">Detailed round flow will be shared during briefing.</p>
                                        )}
                                    </section>
                                ))}
                            </div>
                        </article>

                        <article className="event-detail-panel">
                            <h2>Prizes</h2>
                            <div className="event-prize-board">
                                {prizes.map((prize, index) => {
                                    const standing = getPrizeStanding(prize.position, index)
                                    return (
                                        <article
                                            key={`${prize.position}-${prize.amount || prize.reward}`}
                                            className={`event-prize-card event-prize-card--${standing.tone}`}
                                        >
                                            <header className="event-prize-head">
                                                <span className="event-prize-rank">{prize.position || `Rank ${index + 1}`}</span>
                                                <span className="event-prize-standing">{standing.label}</span>
                                            </header>
                                            <p className="event-prize-value">{formatPrizeValue(prize)}</p>
                                            <div className="event-prize-foot">
                                                <span>+ Certificate</span>
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        </article>

                        {eventTimeline.length > 0 && (
                            <article className="event-detail-panel">
                                <h2>Event Timeline</h2>
                                <ul className="event-detail-list">
                                    {eventTimeline.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                        )}

                        {rulesAndRegulations.length > 0 && (
                            <article className="event-detail-panel">
                                <h2>Rules and Regulations</h2>
                                <div className="event-rule-sections">
                                    {rulesAndRegulations.map((section) => (
                                        <section key={section.title} className="event-rule-section">
                                            <h3>{section.title}</h3>
                                            {Array.isArray(section.points) && section.points.length > 0 && (
                                                <ul className="event-detail-list">
                                                    {section.points.map((point) => (
                                                        <li key={point}>{point}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </section>
                                    ))}
                                </div>
                            </article>
                        )}

                        {details.team_structure && (
                            <article className="event-detail-panel">
                                <h2>Team Structure</h2>
                                <p className="event-long-copy">{details.team_structure}</p>
                            </article>
                        )}

                        {benefits.length > 0 && (
                            <article className="event-detail-panel">
                                <h2>Benefits</h2>
                                <div className="event-benefit-list">
                                    {benefits.map((benefit) => (
                                        <span key={benefit}>{benefit}</span>
                                    ))}
                                </div>
                            </article>
                        )}

                        {additionalInformation.length > 0 && (
                            <article className="event-detail-panel">
                                <h2>Additional Information</h2>
                                <ul className="event-detail-list">
                                    {additionalInformation.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </article>
                        )}
                    </div>

                    <aside className="event-detail-side">
                        <article className="event-detail-panel">
                            <h2>Registration</h2>
                            <div className="event-side-block">
                                <p>
                                    <span className="meta-label">Registration Link</span>
                                    {hasRegistrationLink ? 'Open form and complete registration before the event date.' : 'Registration link will be announced soon.'}
                                </p>
                                {hasRegistrationLink && (
                                    <a className="btn ghost" href={event.registrationInfo.link} target="_blank" rel="noreferrer">
                                        Open Registration Form
                                    </a>
                                )}
                                <button type="button" className="btn ghost no-print" onClick={() => window.print()}>
                                    Print Brochure
                                </button>
                            </div>
                        </article>

                        <article className="event-detail-panel">
                            <h2>Contacts</h2>
                            <div className="event-contact-list">
                                {contacts.map((contact) => (
                                    <div key={`${contact.name}-${contact.phone}`} className="event-contact-item">
                                        <strong>{contact.name}</strong>
                                        <a href={`tel:${String(contact.phone || '').replace(/\s+/g, '')}`}>{contact.phone}</a>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </aside>
                </div>
            </section>
        </main>
    )
}

export default EventDetail