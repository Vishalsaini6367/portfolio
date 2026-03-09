"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function AboutSection() {
    return (
        <section id="about" className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full text-center glass p-8 sm:p-12 md:p-16 rounded-3xl border border-white/10 relative overflow-hidden"
            >
                {/* Glow behind the text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-[#9d00ff]/30 blur-[100px] rounded-full z-0 pointer-events-none"></div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
                >
                    About Me
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-base sm:text-lg md:text-2xl text-gray-300 leading-relaxed font-light relative z-10"
                >
                    I am <span className="text-white font-semibold neon-text">Vishal Saini</span>, a B.Tech Computer Science student at
                    Suresh Gyan Vihar University. I enjoy building innovative web applications, exploring cloud computing, and developing intelligent systems using modern technologies.
                    My goal is to continuously learn and create impactful digital solutions.
                </motion.p>

                {/* Decorative bottom line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-8 sm:mt-10 h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff]/50 to-transparent relative z-10 origin-center"
                />
            </motion.div>
        </section>
    )
}
