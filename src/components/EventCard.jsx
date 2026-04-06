import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionArticle = motion.article

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
}

function EventCard({ event }) {
    const imageStyle = event.image ? { backgroundImage: `url(${event.image})` } : undefined

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
            <div className="event-image" style={imageStyle} />
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
