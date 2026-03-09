"use client"

import { motion } from "framer-motion"
import { Monitor, Code2, Database, Cloud, MessageCircle, User, PenTool, Globe, Lightbulb } from "lucide-react"

export default function SkillsSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 50 } }
    }

    const skillCategories = [
        {
            title: "Web Technologies",
            icon: <Monitor className="text-[#00f3ff]" />,
            skills: ["HTML", "CSS"]
        },
        {
            title: "Programming",
            icon: <Code2 className="text-[#9d00ff]" />,
            skills: ["Python", "JavaScript"]
        },
        {
            title: "Database",
            icon: <Database className="text-[#00f3ff]" />,
            skills: ["SQL"]
        },
        {
            title: "Tools & Cloud",
            icon: <Cloud className="text-[#9d00ff]" />,
            skills: ["VS Code", "GitHub", "AWS", "Google Cloud"]
        },
        {
            title: "Other",
            icon: <PenTool className="text-[#00f3ff]" />,
            skills: ["Basic UI/UX Design"]
        }
    ]

    const softSkills = [
        { name: "Communication", icon: <MessageCircle /> },
        { name: "Leadership", icon: <User /> },
        { name: "Creativity", icon: <Lightbulb /> },
        { name: "Problem Solving", icon: <PenTool /> }
    ]

    return (
        <section id="skills" className="py-20 px-6 min-h-screen relative flex flex-col items-center">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f3ff]/10 blur-[150px] rounded-full z-0 pointer-events-none"></div>

            <div className="max-w-6xl w-full z-10 relative">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center neon-text"
                >
                    Technical Arsenal
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
                >
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className="glass p-6 rounded-2xl flex flex-col gap-4 hover:border-[#00f3ff] transition-colors duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-white/5">{cat.icon}</div>
                                <h3 className="text-xl font-semibold text-white">{cat.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill, si) => (
                                    <span key={si} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Soft Skills Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-bold mb-8 text-center md:text-left text-gray-200">Soft Skills</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {softSkills.map((sk, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, borderColor: "rgba(157,0,255,0.8)" }}
                                    className="glass p-4 rounded-xl flex items-center justify-center gap-3 border border-white/5 hover:shadow-[0_0_15px_rgba(157,0,255,0.3)] transition-all"
                                >
                                    <span className="text-[#9d00ff]">{sk.icon}</span>
                                    <span className="font-medium">{sk.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Interests and Languages */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-8"
                    >
                        <div>
                            <h3 className="text-3xl font-bold mb-6 text-center md:text-left text-gray-200">Miscellaneous</h3>
                            <div className="flex flex-wrap gap-4">
                                <div className="glass p-6 rounded-xl flex-1 border border-white/5 hover:border-[#00f3ff] transition-all">
                                    <h4 className="text-[#00f3ff] font-semibold mb-3 flex items-center gap-2">
                                        <Globe size={18} /> Interests
                                    </h4>
                                    <ul className="list-disc list-inside text-gray-300">
                                        <li>Attending Bootcamps</li>
                                        <li>Travelling</li>
                                    </ul>
                                </div>
                                <div className="glass p-6 rounded-xl flex-1 border border-white/5 hover:border-[#9d00ff] transition-all">
                                    <h4 className="text-[#9d00ff] font-semibold mb-3 flex items-center gap-2">
                                        <MessageCircle size={18} /> Languages
                                    </h4>
                                    <ul className="list-disc list-inside text-gray-300">
                                        <li>English</li>
                                        <li>Hindi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
