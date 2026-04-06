import rawEventData from '../data/events.json'

const EVENT_IMAGES = {
    'CSE-01': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1400&auto=format&fit=crop',
    'CSE-02': 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop',
    'CSE-03': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop',
    'CSE-04': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop',
    'ETC-01': 'https://plus.unsplash.com/premium_photo-1736892868682-1c7e9c3e743c?q=80&w=1400&auto=format&fit=crop',
    'ETC-02': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400&auto=format&fit=crop',
    'ETC-03': 'https://images.unsplash.com/photo-1586256053828-a36b572ab01d?q=80&w=1400&auto=format&fit=crop',
    'AIML-01': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1400&auto=format&fit=crop',
    'AIML-02': 'https://images.unsplash.com/photo-1748680324748-196e14852bb9?q=80&w=1400&auto=format&fit=crop',
    'AIML-03': 'https://images.unsplash.com/photo-1616565441366-34a5fe33fe42?q=80&w=1400&auto=format&fit=crop',
    'CIV-01': 'https://images.unsplash.com/photo-1587582423116-ec07293f0395?q=80&w=1400&auto=format&fit=crop',
    'CIV-02': 'https://plus.unsplash.com/premium_photo-1682724032935-1d51a298c402?q=80&w=1400&auto=format&fit=crop',
    'CIV-03': 'https://images.unsplash.com/photo-1744627049721-73c27008ad28?q=80&w=1400&auto=format&fit=crop',
    'CIV-04': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1400&auto=format&fit=crop',
    'ARCH-01': 'https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=1400&auto=format&fit=crop',
    'ARCH-02': 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1400&auto=format&fit=crop',
    'CHEM-01': 'https://plus.unsplash.com/premium_photo-1676666379090-e0fc81f41e7e?q=80&w=1400&auto=format&fit=crop',
    'CHEM-02': 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?q=80&w=1400&auto=format&fit=crop',
    'CHEM-03': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop',
    'ECELL-01': 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1400&auto=format&fit=crop',
    'CENTRAL-01': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1400&auto=format&fit=crop',
    'CENTRAL-02': 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1400&auto=format&fit=crop',
    'CENTRAL-03': 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=1400&auto=format&fit=crop',
    'DS-01': 'https://images.unsplash.com/photo-1647320293733-92affa4fa39c?q=80&w=1400&auto=format&fit=crop',
    'DS-02': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop',
    'DS-03': 'https://images.unsplash.com/photo-1558008258-7ff8888b42b0?q=80&w=1400&auto=format&fit=crop',
    'MECH-01': 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?q=80&w=1400&auto=format&fit=crop',
    'MECH-02': 'https://images.unsplash.com/photo-1711199694531-e982a79ea381?q=80&w=1400&auto=format&fit=crop',
    'MECH-03': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1400&auto=format&fit=crop',
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop'

const DEPARTMENT_FILTER_ORDER = ['CSE', 'AIML', 'DS', 'MECHANICAL', 'CIVIL', 'ARCHITECTURE', 'CHEMICAL', 'ENTC']
const DATE_FORMATTER = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
})

function normalizeDepartmentName(name) {
    return String(name || '')
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
}

function getDepartmentCode(departmentName) {
    const normalized = normalizeDepartmentName(departmentName)

    if (normalized.includes('data science') || normalized.includes(' ds')) {
        return 'DS'
    }
    if (normalized.includes('artificial intelligence') || normalized.includes('machine learning') || normalized.includes('aiml')) {
        return 'AIML'
    }
    if (normalized.includes('computer science')) return 'CSE'
    if (normalized.includes('mechanical')) return 'MECHANICAL'
    if (normalized.includes('civil')) return 'CIVIL'
    if (normalized.includes('architecture')) return 'ARCHITECTURE'
    if (normalized.includes('chemical')) return 'CHEMICAL'
    if (normalized.includes('electronics') && (normalized.includes('telecommunication') || normalized.includes('entc'))) {
        return 'ENTC'
    }
    if (normalized.includes('ecell') || normalized.includes('entrepreneur')) return 'ECELL'

    return String(departmentName || 'GENERAL').trim().toUpperCase()
}

function formatDate(isoDate) {
    if (!isoDate) return 'Date TBA'
    const date = new Date(`${isoDate}T00:00:00`)
    if (Number.isNaN(date.getTime())) return isoDate

    return DATE_FORMATTER.format(date)
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
        const departmentCode = getDepartmentCode(departmentName)
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
                departmentCode,
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
                isHot: Boolean(event.is_hot),
            }
        })
    })
}

function normalizeLegacyData(source) {
    if (!Array.isArray(source)) return []
    return source.map((event) => ({
        ...event,
        departmentCode: event.departmentCode || getDepartmentCode(event.department),
        isHot: Boolean(event.isHot || event.is_hot),
    }))
}

export const events = Array.isArray(rawEventData)
    ? normalizeLegacyData(rawEventData)
    : normalizeDepartmentData(rawEventData)

const EVENT_BY_ID = new Map(events.map((event) => [event.id.toLowerCase(), event]))

const availableDepartmentCodes = [...new Set(events.map((event) => event.departmentCode || getDepartmentCode(event.department)))]

const orderedDepartmentCodes = [
    ...DEPARTMENT_FILTER_ORDER.filter((code) => availableDepartmentCodes.includes(code)),
    ...availableDepartmentCodes.filter((code) => !DEPARTMENT_FILTER_ORDER.includes(code)),
].filter(code => code !== 'ECELL' && code !== 'CENTRAL')

export const departmentFilters = ['All', ...orderedDepartmentCodes]

export function getEventById(eventId) {
    if (!eventId) return null
    const target = String(eventId).toLowerCase()
    return EVENT_BY_ID.get(target) || null
}
