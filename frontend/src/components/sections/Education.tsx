"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Calendar, TrendingUp } from "lucide-react"

export default function EducationSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    })

    // Animate the line drawing down
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

    const educationList = [
        {
            institution: "Suresh Gyan Vihar University",
            degree: "B.Tech Computer Science Engineering",
            year: "2023 – 2027",
            score: "ongoing"
        },
        {
            institution: "Sunhill Public School",
            degree: "12th Grade",
            year: "Completed",
            score: "75%"
        },
        {
            institution: "Bright Boy Public Sr. Sec. School",
            degree: "10th Grade",
            year: "Completed",
            score: "93%"
        }
    ]

    return (
        <section id="education" className="min-h-[80vh] py-24 px-6 relative" ref={containerRef}>
            <div className="max-w-4xl mx-auto relative">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-tight"
                >
                    My Journey
                </motion.h2>

                <div className="relative pl-8 md:pl-0">
                    {/* Animated timeline line */}
                    <motion.div
                        style={{ scaleY }}
                        className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00f3ff] via-[#9d00ff] to-transparent origin-top md:-translate-x-[1px]"
                    ></motion.div>

                    <div className="flex flex-col gap-12 md:gap-20 relative z-10 w-full">
                        {educationList.map((item, index) => {
                            const isEven = index % 2 === 0
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                                    className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="hidden md:block w-[45%]"></div>

                                    <div className="absolute left-[-33px] md:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#00f3ff] md:-translate-x-1/2 z-20 shadow-[0_0_10px_#00f3ff]"></div>

                                    <div className={`w-full md:w-[45%] glass p-6 rounded-2xl border ${isEven ? 'border-[#00f3ff]/30 hover:border-[#00f3ff]' : 'border-[#9d00ff]/30 hover:border-[#9d00ff]'} transition-colors duration-300 group`}>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 mb-2 text-gray-400 font-mono text-sm">
                                                <Calendar size={14} className={isEven ? "text-[#00f3ff]" : "text-[#9d00ff]"} /> {item.year}
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-shadow-md transition-all">
                                                {item.institution}
                                            </h3>
                                            <p className="text-[#00f3ff]/90 text-sm md:text-base flex justify-start items-center gap-2 font-medium">
                                                <GraduationCap size={16} /> {item.degree}
                                            </p>
                                            <p className="text-gray-400 mt-2 font-light flex justify-start items-center gap-2">
                                                <TrendingUp size={16} className={isEven ? "text-[#00f3ff]" : "text-[#9d00ff]"} /> Score: {item.score}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
