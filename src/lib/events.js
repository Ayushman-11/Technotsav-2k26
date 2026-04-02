import rawEventData from '../data/events.json'

const EVENT_IMAGES = {
    'CSE-01': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1400&auto=format&fit=crop',
    'CSE-02': 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop',
    'CSE-03': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop',
    'CSE-04': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop',
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop'

function formatDate(isoDate) {
    if (!isoDate) return 'Date TBA'
    const date = new Date(`${isoDate}T00:00:00`)
    if (Number.isNaN(date.getTime())) return isoDate

    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date)
}

function formatTopPrize(prizes) {
    if (!Array.isArray(prizes) || prizes.length === 0) return 'Prize TBA'

    const first = prizes[0]
    if (typeof first.amount === 'number') {
        return `INR ${first.amount.toLocaleString('en-IN')}`
    }

    return first.reward || 'Prize TBA'
}

function formatTeamSize(participation) {
    const min = participation?.team_size?.min
    const max = participation?.team_size?.max
    if (typeof min !== 'number' || typeof max !== 'number') return 'As per rules'
    if (min === max) return `${min} member${min > 1 ? 's' : ''}`
    return `${min}-${max} members`
}

function normalizeDepartmentData(source) {
    const departments = source?.departments || []

    return departments.flatMap((department) => {
        const departmentName = department.department_name || 'General'
        const events = Array.isArray(department.events) ? department.events : []

        return events.map((event) => {
            const normalizedId = (event.event_id || event.event_name || '').toLowerCase().replace(/\s+/g, '-')
            const scheduleDate = event.schedule?.date
            const startTime = event.schedule?.start_time
            const endTime = event.schedule?.end_time
            const timeline = (event.rounds || []).map((round, index) => {
                if (typeof round === 'string') {
                    return {
                        phase: `Round ${String(index + 1).padStart(2, '0')}`,
                        title: round,
                        detail: 'Details will be shared during event briefing.',
                        time: startTime || 'TBA',
                    }
                }

                const steps = Array.isArray(round.steps) ? round.steps.join(' -> ') : 'Detailed flow will be announced.'

                return {
                    phase: `Round ${String(index + 1).padStart(2, '0')}`,
                    title: round.name || `Round ${index + 1}`,
                    detail: steps,
                    time: startTime || 'TBA',
                }
            })

            return {
                id: normalizedId,
                title: event.event_name,
                summary: event.description,
                date: formatDate(scheduleDate),
                prize: formatTopPrize(event.prizes),
                department: departmentName,
                image: event.image || EVENT_IMAGES[event.event_id] || DEFAULT_IMAGE,
                location: event.venue || 'Venue TBA',
                teamSize: formatTeamSize(event.participation),
                duration: startTime && endTime ? `${startTime} - ${endTime}` : 'TBA',
                difficulty: (event.type || 'event').toUpperCase(),
                about: event.description,
                timeline,
                contact: Array.isArray(event.contact) ? event.contact[0] : null,
                registration: {
                    fee: typeof event.fees?.individual === 'number' ? `INR ${event.fees.individual}` : 'TBA',
                    deadline: formatDate(scheduleDate),
                    formUrl: event.registration?.link || '#',
                },
                eventId: event.event_id,
                eventName: event.event_name,
                description: event.description,
                type: event.type,
                schedule: event.schedule,
                venue: event.venue,
                participation: event.participation,
                fees: event.fees,
                registrationInfo: event.registration,
                prizes: event.prizes,
                rounds: event.rounds,
                contacts: event.contact,
                benefits: event.benefits,
                details: event.details || null,
            }
        })
    })
}

function normalizeLegacyData(source) {
    if (!Array.isArray(source)) return []
    return source
}

export const events = Array.isArray(rawEventData)
    ? normalizeLegacyData(rawEventData)
    : normalizeDepartmentData(rawEventData)

export const departmentFilters = ['All', ...new Set(events.map((event) => event.department))]

export function getEventById(eventId) {
    if (!eventId) return null
    const target = String(eventId).toLowerCase()
    return events.find((event) => event.id.toLowerCase() === target) || null
}
