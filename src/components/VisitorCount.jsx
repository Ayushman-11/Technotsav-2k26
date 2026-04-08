import { useEffect, useMemo, useState } from 'react'
import { track } from '@vercel/analytics'

const COUNTER_API_BASE = 'https://api.countapi.xyz'
const COUNTER_NAMESPACE = 'technotsav-2k26'
const COUNTER_KEY = 'launch-deck-visitors'
const SESSION_KEY = 'technotsav_visitor_count_recorded'
const LOCAL_FALLBACK_KEY = 'technotsav_local_visitor_count'

function getSafeStorageItem(storage, key) {
    try {
        return storage.getItem(key)
    } catch {
        return null
    }
}

function setSafeStorageItem(storage, key, value) {
    try {
        storage.setItem(key, value)
    } catch {
        // Ignore write failures in private browsing or restricted environments.
    }
}

function toNumber(value) {
    const parsed = Number(value)
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

function VisitorCount() {
    const [count, setCount] = useState(0)
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        let isCancelled = false

        const loadVisitorCount = async () => {
            const hasSessionVisit =
                getSafeStorageItem(window.sessionStorage, SESSION_KEY) === '1'
            const endpoint = hasSessionVisit ? 'get' : 'hit'

            try {
                const response = await fetch(
                    `${COUNTER_API_BASE}/${endpoint}/${COUNTER_NAMESPACE}/${COUNTER_KEY}`,
                )

                if (!response.ok) {
                    throw new Error(`Visitor counter request failed (${response.status})`)
                }

                const payload = await response.json()
                const visitorCount = toNumber(payload?.value)

                if (!hasSessionVisit) {
                    setSafeStorageItem(window.sessionStorage, SESSION_KEY, '1')
                }

                if (!isCancelled) {
                    setCount(visitorCount)
                    setStatus('live')
                }

                track('visitor_counter_loaded', {
                    source: hasSessionVisit ? 'existing-session' : 'new-session',
                    totalVisitors: visitorCount,
                    mode: 'live',
                })
                return
            } catch {
                const cachedCount = toNumber(
                    getSafeStorageItem(window.localStorage, LOCAL_FALLBACK_KEY),
                )
                const fallbackCount = hasSessionVisit ? Math.max(cachedCount, 1) : cachedCount + 1

                if (!hasSessionVisit) {
                    setSafeStorageItem(window.sessionStorage, SESSION_KEY, '1')
                }

                setSafeStorageItem(window.localStorage, LOCAL_FALLBACK_KEY, String(fallbackCount))

                if (!isCancelled) {
                    setCount(fallbackCount)
                    setStatus('estimated')
                }

                track('visitor_counter_loaded', {
                    source: hasSessionVisit ? 'existing-session' : 'new-session',
                    totalVisitors: fallbackCount,
                    mode: 'estimated',
                })
            }
        }

        loadVisitorCount()

        return () => {
            isCancelled = true
        }
    }, [])

    const formattedCount = useMemo(
        () => new Intl.NumberFormat('en-IN').format(count),
        [count],
    )

    return (
        <aside className="visitor-counter" aria-label="Visitor count">
            <div className="visitor-counter-head">
                <span className="visitor-counter-label">Visitor Radar</span>
                <span
                    className={`visitor-counter-badge ${status === 'live' ? 'is-live' : 'is-estimated'
                        }`}
                >
                    {status === 'loading' ? 'Loading' : status === 'live' ? 'Live' : 'Estimated'}
                </span>
            </div>

            <p className="visitor-counter-number">{formattedCount}</p>
            <p className="visitor-counter-copy">Visitors have entered Technotsav 2K26.</p>

            <div className="visitor-counter-footnote">
                <span className="visitor-counter-pulse" aria-hidden="true" />
                <span>Tracked with Vercel Analytics</span>
            </div>
        </aside>
    )
}

export default VisitorCount
