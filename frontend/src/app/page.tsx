"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HeroSection from "@/components/sections/Hero"
import AboutSection from "@/components/sections/About"
import SkillsSection from "@/components/sections/Skills"
import ProjectsSection from "@/components/sections/Projects"
import EducationSection from "@/components/sections/Education"
import ContactSection from "@/components/sections/Contact"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate page loader
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="bg-black text-white relative flex flex-col min-h-screen">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360, borderRadius: ["20%", "50%", "20%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-[#00f3ff] border-t-transparent border-b-[#9d00ff]"
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar globally on top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] z-50 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.1 }}
      />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />

      <footer className="py-8 text-center text-gray-600 border-t border-white/5">
        <p>© {new Date().getFullYear()} Vishal Saini. Built with Next.js & Framer Motion.</p>
      </footer>
    </main>
  )
}
