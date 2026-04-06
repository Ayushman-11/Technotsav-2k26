import { useState } from 'react'

const HOME_URL = `${import.meta.env.BASE_URL}#home`

function UpArrowIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
        </svg>
    )
}

export default function FlyerFab() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <a
            href={HOME_URL}
            className={`flyer-fab${isHovered ? ' flyer-fab--hovered' : ''}`}
            aria-label="Back to home"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
        >
            {/* Glow rings */}
            <span className="flyer-fab__ring flyer-fab__ring--1" aria-hidden="true" />
            <span className="flyer-fab__ring flyer-fab__ring--2" aria-hidden="true" />

            {/* Pill label that slides in on hover */}
            <span className="flyer-fab__label" aria-hidden="true">
                Back to Home
            </span>

            {/* Icon */}
            <span className="flyer-fab__icon">
                <UpArrowIcon />
            </span>
        </a>
    )
}
