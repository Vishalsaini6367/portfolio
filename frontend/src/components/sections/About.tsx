"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

    return (
        <section id="about" className="relative min-h-screen flex items-center justify-center py-20 px-6" ref={containerRef}>
            <motion.div style={{ y, opacity }} className="max-w-4xl text-center glass p-10 md:p-16 rounded-3xl border border-white/10 relative overflow-hidden">
                {/* Glow behind the text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#9d00ff]/30 blur-[100px] rounded-full z-0 pointer-events-none"></div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold mb-8 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
                >
                    About Me
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light relative z-10"
                >
                    I am <span className="text-white font-semibold neon-text">Vishal Saini</span>, a B.Tech Computer Science student at
                    Suresh Gyan Vihar University. I enjoy building innovative web applications, exploring cloud computing, and developing intelligent systems using modern technologies.
                    My goal is to continuously learn and create impactful digital solutions.
                </motion.p>
            </motion.div>
        </section>
    )
}
