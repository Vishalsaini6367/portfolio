"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Github, Folder } from "lucide-react"

export default function ProjectsSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const [projects, setProjects] = useState<any[]>([
        {
            id: 1,
            title: "Histo Search",
            description: "A web-based historical search engine built using the Wikipedia API that provides historical information with 360° virtual tours, bookmarking functionality, and integrated security monitoring.",
            tags: ["Wikipedia API", "Security", "Web"],
            github_url: "https://github.com/Vishalsaini6367",
            live_url: "#"
        },
        {
            id: 2,
            title: "Cloud Based Intrusion Detection System",
            description: "A machine learning powered intrusion detection system deployed on cloud infrastructure to monitor network traffic and detect cyber threats in real-time.",
            tags: ["Machine Learning", "Cloud", "Security"],
            github_url: "https://github.com/Vishalsaini6367",
            live_url: "#"
        },
        {
            id: 3,
            title: "Lab Guard Pro",
            description: "An intelligent lab inventory monitoring system that automatically sends email alerts when stock levels fall below a predefined threshold.",
            tags: ["Inventory", "Automation", "Email API"],
            github_url: "https://github.com/Vishalsaini6367",
            live_url: "#"
        },
        {
            id: 4,
            title: "Movie Recommendation System",
            description: "A recommendation engine that suggests movies to users based on preferences, ratings, and viewing patterns using data analysis techniques.",
            tags: ["Data Analysis", "Recommendation", "Python"],
            github_url: "https://github.com/Vishalsaini6367",
            live_url: "#"
        }
    ])

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const mapped = data.map((d: any, i: number) => ({
                        ...d,
                        tags: projects[i] ? projects[i].tags : ['React', 'Node']
                    }))
                    setProjects(mapped)
                }
            })
            .catch((err) => console.log('Using static projects data...', err))
    }, [])

    return (
        <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 min-h-screen relative" ref={containerRef}>
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-12 sm:mb-20 flex items-center gap-4"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight neon-text">
                        Featured Projects
                    </h2>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-[#00f3ff] to-transparent max-w-xs hidden sm:block"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                    {projects.map((project, index) => {
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.8,
                                    type: "spring",
                                    bounce: 0.3,
                                    delay: index * 0.1
                                }}
                                whileHover={{
                                    y: -6,
                                    boxShadow: "0 20px 40px -20px rgba(0, 243, 255, 0.3)"
                                }}
                                className="group relative glass p-6 sm:p-8 rounded-3xl flex flex-col gap-5 overflow-hidden cursor-pointer"
                                onClick={() => {
                                    if (project.live_url && project.live_url !== "#") {
                                        window.open(project.live_url, "_blank", "noreferrer");
                                    }
                                }}
                            >
                                {/* Gradient hover bg */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#00f3ff]/10 to-[#9d00ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                                {/* Top row: icon + links */}
                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="p-3 bg-white/5 rounded-2xl w-max drop-shadow-md">
                                        <Folder size={28} className="text-[#00f3ff]" />
                                    </div>
                                    {/* Always visible on mobile, hover-reveal on desktop */}
                                    <div className="flex gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                        <a
                                            href={project.github_url || "#"}
                                            target="_blank"
                                            rel="noreferrer"
                                            title="View Source on GitHub"
                                            onClick={(e) => e.stopPropagation()}
                                            className="hover:text-[#00f3ff] transition-colors p-2 glass rounded-full"
                                        >
                                            <Github size={22} />
                                        </a>
                                        {project.live_url && project.live_url !== "#" && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                title="View Live Demo"
                                                onClick={(e) => e.stopPropagation()}
                                                className="hover:text-[#9d00ff] transition-colors p-2 glass rounded-full"
                                            >
                                                <ExternalLink size={22} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col gap-3">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00f3ff] transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {project.tags?.map((tag: string, tagIndex: number) => (
                                            <span key={tagIndex} className="text-xs font-mono text-[#9d00ff] bg-[#9d00ff]/10 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Corner accents */}
                                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#00f3ff] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tr-3xl translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#9d00ff] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-bl-3xl -translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
