import { useState } from 'react'

const FLYER_URL = `${import.meta.env.BASE_URL}flyer.pdf`

function DownloadIcon() {
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    )
}

export default function FlyerFab() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <a
            href={FLYER_URL}
            download="Technotsav26-Flyer.pdf"
            className={`flyer-fab${isHovered ? ' flyer-fab--hovered' : ''}`}
            aria-label="Download Technotsav'26 Flyer"
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
                Download Flyer
            </span>

            {/* Icon */}
            <span className="flyer-fab__icon">
                <DownloadIcon />
            </span>
        </a>
    )
}
