import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionArticle = motion.article

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
}

function EventCard({ event }) {
    const handleViewDetailsClick = () => {
        sessionStorage.setItem('technotsav_open_events', '1')
    }

    return (
        <MotionArticle
            className="event-card"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
        >
            {event.image ? (
                <img
                    className="event-image"
                    src={event.image}
                    alt={`${event.title} event preview`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                />
            ) : (
                <div className="event-image event-image--empty" aria-hidden="true" />
            )}
            <div className="event-card-body">
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
                <div className="event-meta">
                    <span>{event.date}</span>
                    <span>{event.prize}</span>
                </div>
                <Link className="btn ghost" to={`/events/${event.id}`} onClick={handleViewDetailsClick}>
                    View Details
                </Link>
            </div>
        </MotionArticle>
    )
}

export default EventCard
