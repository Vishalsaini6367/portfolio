"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Code2 } from "lucide-react"

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleNavClick = (href: string) => {
        setIsOpen(false)
        // Smooth scroll
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]" : "py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="p-2 glass rounded-lg group-hover:border-[#00f3ff] transition-colors">
                            <Code2 size={20} className="text-[#00f3ff]" />
                        </div>
                        <span className="font-bold text-white tracking-tight hidden sm:block">
                            Vishal<span className="text-[#00f3ff]">.</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-gray-400 hover:text-white hover:text-shadow-[0_0_8px_rgba(0,243,255,0.8)] transition-all duration-200 text-sm font-medium tracking-wide"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="/Vishal_Resume.pdf"
                            download
                            className="ml-2 px-4 py-2 rounded-lg border border-[#00f3ff]/50 text-[#00f3ff] text-sm font-semibold hover:bg-[#00f3ff]/10 hover:border-[#00f3ff] transition-all"
                        >
                            Resume
                        </a>
                    </nav>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 glass rounded-lg text-white hover:border-[#00f3ff] transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0a0a0a] border-l border-white/10 flex flex-col md:hidden"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-white/10">
                                <span className="font-bold text-white text-lg tracking-tight">
                                    Vishal<span className="text-[#00f3ff]">.</span>
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 glass rounded-lg text-white"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex flex-col p-6 gap-2 flex-1">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.3 }}
                                        onClick={() => handleNavClick(link.href)}
                                        className="px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-3 font-medium text-lg"
                                    >
                                        <span className="text-[#00f3ff] font-mono text-sm">{String(i + 1).padStart(2, "0")}.</span>
                                        {link.label}
                                    </motion.a>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                                    className="mt-6"
                                >
                                    <a
                                        href="/Vishal_Resume.pdf"
                                        download
                                        className="block w-full text-center px-4 py-3 rounded-xl border border-[#00f3ff]/50 text-[#00f3ff] font-semibold hover:bg-[#00f3ff]/10 transition-all"
                                    >
                                        Download Resume
                                    </a>
                                </motion.div>
                            </nav>

                            <div className="p-6 border-t border-white/5">
                                <p className="text-gray-600 text-xs text-center">© 2025 Vishal Saini</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
