import { useEffect, useRef } from 'react'

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function PixelSnow({
    color = '#ffffff',
    flakeSize = 0.01,
    minFlakeSize = 1.5,
    pixelResolution = 450,
    speed = 0.3,
    depthFade = 5,
    farPlane = 20,
    brightness = 1,
    gamma = 0.4545,
    density = 0.3,
    variant = 'snowflake',
    direction = 90,
}) {
    const canvasRef = useRef(null)
    const rafRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        const ctx = canvas.getContext('2d')
        if (!ctx) return undefined

        let width = 0
        let height = 0
        let flakes = []

        const toRadians = (deg) => (deg * Math.PI) / 180
        const velocityAngle = toRadians(direction)
        const vxBase = Math.cos(velocityAngle) * speed
        const vyBase = Math.sin(velocityAngle) * speed

        const resize = () => {
            const rect = canvas.getBoundingClientRect()
            width = Math.max(1, rect.width)
            height = Math.max(1, rect.height)
            canvas.width = Math.floor(width)
            canvas.height = Math.floor(height)
            const flakeCount = Math.floor((width * height * density) / 7000)
            flakes = Array.from({ length: flakeCount }, () => createFlake())
        }

        const createFlake = () => {
            const depth = Math.random() * farPlane + 1
            const size = clamp(minFlakeSize + flakeSize * 60 * (1 / depth), 1, 6)
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                depth,
                size,
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = color
            flakes.forEach((flake) => {
                const fade = clamp(1 - flake.depth / depthFade, 0.2, 1)
                const alpha = clamp(brightness * fade, 0.2, 1)
                ctx.globalAlpha = Math.pow(alpha, gamma)
                ctx.beginPath()
                ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2)
                ctx.fill()
            })
            ctx.globalAlpha = 1
        }

        const update = () => {
            const drift = variant === 'snowflake' ? 0.4 : 0.2
            flakes.forEach((flake) => {
                const depthFactor = 1 / flake.depth
                flake.x += (vxBase + drift * depthFactor) * 10
                flake.y += (vyBase + 1.2 * depthFactor) * 10

                if (flake.x > width + 10 || flake.x < -10 || flake.y > height + 10) {
                    flake.x = Math.random() * width
                    flake.y = -10
                    flake.depth = Math.random() * farPlane + 1
                }
            })
        }

        const tick = () => {
            update()
            draw()
            rafRef.current = window.requestAnimationFrame(tick)
        }

        resize()
        window.addEventListener('resize', resize)
        tick()

        return () => {
            window.removeEventListener('resize', resize)
            if (rafRef.current) {
                window.cancelAnimationFrame(rafRef.current)
            }
        }
    }, [
        color,
        flakeSize,
        minFlakeSize,
        pixelResolution,
        speed,
        depthFade,
        farPlane,
        brightness,
        gamma,
        density,
        variant,
        direction,
    ])

    return <canvas ref={canvasRef} className="pixel-snow" data-resolution={pixelResolution} />
}

export default PixelSnow
