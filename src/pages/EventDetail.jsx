import { useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import events from '../data/events.json';

// --- Icons (Inline SVGs) ---
const IconArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
const IconDate = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>;
const IconLocation = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const IconClock = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
const IconTrophy = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>;
const IconWallet = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-5 7.96V19h-3a2 2 0 0 0 0-4h3v-2.04A8.04 8.04 0 0 1 19 7Z" /></svg>;
const IconExternalLink = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>;

// --- Animations ---
const fadeUpItem = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
const fadeStaggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

function EventDetail() {
    const { eventId } = useParams();
    const event = useMemo(() => events.find((item) => item.id === eventId), [eventId]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [eventId]);

    if (!event) {
        return (
            <main className="min-h-screen flex items-center justify-center p-6 bg-[#111417] font-['Inter']">
                <motion.div
                    initial="hidden" animate="visible" variants={fadeUpItem}
                    className="text-left bg-[#191c1f] p-10 rounded-sm max-w-lg w-full relative z-20"
                >
                    <h1 className="text-3xl font-bold mb-4 text-[#a4c9ff] font-['Space_Grotesk'] tracking-[-0.02em]">Telemetry Lost</h1>
                    <p className="text-[#c1c7d3] mb-8 text-sm leading-[1.6]">The requested mission parameters could not be retrieved from the main server. Please verify the transmission ID.</p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-[#a4c9ff] text-[#111417] px-5 py-2.5 rounded-sm font-['Space_Grotesk'] text-sm tracking-[0.1em] uppercase font-bold hover:bg-[#8ebbf8] transition-colors">
                        <IconArrowLeft />
                        Return to Home
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen selection:bg-[#a4c9ff] selection:text-[#00315d] font-['Manrope'] text-[#c1c7d3] relative z-10 bg-[#111417]">
            {/* HERO SECTION */}
            <div className="relative w-full overflow-hidden min-h-[55vh] flex flex-col justify-end pb-12 pt-32">
                <div className="absolute inset-0 z-0">
                    {/* 60% black overlay per docs */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111417] via-[#111417]/80 to-[#111417]/40 z-10" />
                    <div className="absolute inset-0 bg-black/60 z-10 mix-blend-multiply" />

                    {event.image ? (
                        <motion.img
                            initial={{ scale: 1.02, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.6 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            src={event.image} alt={event.title}
                            className="w-full h-full object-cover mix-blend-luminosity grayscale-[15%]"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#191c1f]" />
                    )}
                </div>

                <div className="container relative z-20 max-w-7xl mx-auto px-6 lg:px-12 mt-auto">
                    <Link to="/" className="inline-flex items-center gap-2 text-[#c1c7d3] hover:text-[#a4c9ff] transition-colors mb-6 uppercase tracking-[0.1em] text-xs font-['Space_Grotesk'] font-bold group w-fit">
                        <span className="p-1.5 transition-colors">
                            <IconArrowLeft />
                        </span>
                        Back to Home
                    </Link>

                    <motion.div
                        initial="hidden" animate="visible" variants={fadeStaggerContainer}
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeUpItem} className="flex flex-wrap items-center gap-3 mb-5">
                            <span className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#282a2e] text-[#a4c9ff] text-xs font-['Space_Grotesk'] uppercase tracking-[0.1em] font-semibold">
                                {event.department}
                            </span>
                            <span className="px-3 py-1.5 bg-[#282a2e] text-[#c1c7d3] text-xs font-['Space_Grotesk'] uppercase tracking-[0.1em] font-semibold">
                                {event.difficulty || "ALL-SPEC"}
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeUpItem} className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['Space_Grotesk'] tracking-[-0.02em] leading-tight">
                            {event.title}
                        </motion.h1>

                        <motion.p variants={fadeUpItem} className="text-sm text-[#c1c7d3] leading-[1.6] max-w-2xl mb-12">
                            {event.summary}
                        </motion.p>

                        <motion.div variants={fadeUpItem} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-[#c1c7d3] uppercase tracking-[0.1em] font-['Space_Grotesk'] font-bold">Access Fee</span>
                                <span className="text-sm font-bold text-white uppercase">{event.registration?.fee || "Free Entry"}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-[#c1c7d3] uppercase tracking-[0.1em] font-['Space_Grotesk'] font-bold">Team Composition</span>
                                <span className="text-sm font-bold text-white uppercase">{event.teamSize}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-[#c1c7d3] uppercase tracking-[0.1em] font-['Space_Grotesk'] font-bold">Venue</span>
                                <span className="text-sm font-bold text-white uppercase">{event.location}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-[#c1c7d3] uppercase tracking-[0.1em] font-['Space_Grotesk'] font-bold">Closing Date</span>
                                <span className="text-sm font-bold text-white uppercase">{event.registration?.deadline || event.date}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="bg-[#111417] w-full relative z-30 pt-16 lg:pt-24 pb-32">
                <div className="container max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT COLUMN: Deep Details */}
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeStaggerContainer}
                        className="lg:col-span-8 flex flex-col gap-12"
                    >
                        {/* Section shifts utilizing tier bg (The no-1px line rule) */}
                        <motion.section variants={fadeUpItem} className="bg-[#191c1f] p-8 lg:p-10 rounded-sm">
                            <h2 className="text-xs font-['Space_Grotesk'] font-bold text-[#a4c9ff] uppercase tracking-[0.1em] mb-4">Mission Briefing</h2>
                            <p className="text-sm text-[#c1c7d3] leading-[1.6] whitespace-pre-line">
                                {event.about}
                            </p>
                        </motion.section>

                        {event.rules && event.rules.length > 0 && (
                            <motion.section variants={fadeUpItem} className="bg-[#191c1f] p-8 lg:p-10 rounded-sm">
                                <h2 className="text-xs font-['Space_Grotesk'] font-bold text-[#a4c9ff] uppercase tracking-[0.1em] mb-8">Operational Directives</h2>
                                <div className="flex flex-col gap-8">
                                    {event.rules.map((rule, idx) => (
                                        <div key={idx} className="flex items-start gap-8 lg:gap-10">
                                            <span className="text-white text-sm font-['Space_Grotesk'] font-medium tracking-[0.15em] shrink-0 pt-[2px]">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                            <p className="text-[#c1c7d3] text-sm leading-[1.7]">
                                                {rule}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {event.timeline && event.timeline.length > 0 && (
                            <motion.section variants={fadeUpItem} className="bg-[#191c1f] p-8 lg:p-10 rounded-sm">
                                <h2 className="text-xs font-['Space_Grotesk'] font-bold text-[#a4c9ff] uppercase tracking-[0.1em] mb-8">Deployment Sequence</h2>
                                {/* Timeline gradient stroke as per specific design rule */}
                                <div className="relative pl-8">
                                    <div className="absolute top-2 left-0 bottom-2 w-[2px] bg-gradient-to-b from-[#a4c9ff] to-[#282a2e]" />
                                    <div className="flex flex-col gap-10">
                                        {event.timeline.map((item, idx) => (
                                            <div key={idx} className="relative">
                                                <div className="absolute -left-[37px] top-[0.35rem] w-3 h-3 bg-[#111417] border-[2px] border-[#a4c9ff] rounded-none" />

                                                <div className="flex flex-col gap-1.5">
                                                    <div className="flex items-center gap-3 text-xs font-bold tracking-[0.1em] uppercase text-[#c1c7d3] font-['Space_Grotesk']">
                                                        <span className="text-[#a4c9ff]">{item.phase}</span>
                                                        <span>—</span>
                                                        <span>{item.time}</span>
                                                    </div>
                                                    <h3 className="text-base font-bold text-white font-['Space_Grotesk'] mt-1 mb-1">{item.title}</h3>
                                                    <p className="text-sm text-[#c1c7d3] leading-[1.6]">{item.detail}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.section>
                        )}
                    </motion.div>

                    {/* RIGHT COLUMN: Sticky Dashboard */}
                    <motion.aside
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-4 lg:sticky lg:top-32 space-y-6"
                    >
                        {/* Primary Widget using Glass Rule */}
                        <div className="bg-white/[0.04] border border-white/[0.15] backdrop-blur-[20px] rounded-sm p-6 lg:p-8 shadow-[0_0_60px_rgba(164,201,255,0.04)]">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <p className="text-xs text-[#c1c7d3] uppercase tracking-[0.1em] font-['Space_Grotesk'] mb-1">Time Limit</p>
                                    <p className="text-base font-bold text-white flex items-center gap-2">
                                        <IconDate /> {event.registration?.deadline || event.date}
                                    </p>
                                </div>

                                <div className="bg-[#191c1f] p-4 rounded-sm grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-[#c1c7d3] uppercase tracking-[0.1em] font-['Space_Grotesk'] mb-1 flex items-center gap-1.5">
                                            <IconWallet /> Req.
                                        </p>
                                        <p className="text-sm font-bold text-white">{event.registration?.fee || event.prize}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#c1c7d3] uppercase tracking-[0.1em] font-['Space_Grotesk'] mb-1 flex items-center gap-1.5">
                                            <IconTrophy /> Yield
                                        </p>
                                        <p className="text-sm font-bold text-[#a4c9ff]">{event.prize}</p>
                                    </div>
                                </div>

                                <a
                                    href={event.registration?.formUrl || "#"}
                                    className="w-full flex items-center justify-center gap-2 bg-[#a4c9ff] !text-[#111417] py-3 rounded-sm font-bold text-sm hover:opacity-90 transition-opacity uppercase tracking-[0.1em] font-['Space_Grotesk'] mt-2"
                                >
                                    Initialize <IconExternalLink />
                                </a>
                            </div>
                        </div>

                        {/* Comms */}
                        {event.contact && (
                            <div className="bg-[#191c1f] rounded-sm p-6 lg:p-8">
                                <h3 className="text-xs text-[#a4c9ff] uppercase tracking-[0.1em] font-bold font-['Space_Grotesk'] mb-3">
                                    Transmission Relay
                                </h3>
                                <div className="flex flex-col">
                                    <p className="text-white font-bold text-sm mb-1">{event.contact.name}</p>
                                    <a href={`mailto:${event.contact.email}`} className="text-[#a4c9ff] text-sm hover:text-white transition-colors mb-1">{event.contact.email}</a>
                                    <a href={`tel:${event.contact.phone.replace(/\s+/g, '')}`} className="text-[#c1c7d3] text-sm hover:text-white transition-colors">{event.contact.phone}</a>
                                </div>
                            </div>
                        )}
                    </motion.aside>

                </div>
            </div>
        </main>
    );
}

export default EventDetail;