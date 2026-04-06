import { motion } from 'framer-motion'

const MotionDiv = motion.div

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
}

function SectionHead({ eyebrow, title, description }) {
    return (
        <MotionDiv
            className="section-head"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
        >
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{description}</p>
        </MotionDiv>
    )
}

export default SectionHead
