"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Mail, Linkedin, Loader2, ExternalLink } from "lucide-react"

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")

        try {
            const res = await fetch("http://localhost:5005/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                setStatus("success")
                setFormData({ name: "", email: "", message: "" })
                setTimeout(() => setStatus("idle"), 3000)
            } else {
                setStatus("error")
                setTimeout(() => setStatus("idle"), 3000)
            }
        } catch (error) {
            console.error(error)
            setStatus("error")
            setTimeout(() => setStatus("idle"), 3000)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <section id="contact" className="py-24 px-6 min-h-[80vh] flex items-center relative">
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">

                {/* Left Side Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 neon-text">Let's Connect</h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-md">
                        I'm currently looking for new opportunities and always open to discussing web development, AI, cloud computing, and more.
                    </p>

                    <div className="flex flex-col gap-6">
                        <a href="tel:6367839332" className="flex items-center gap-4 group p-4 border border-white/5 rounded-2xl w-max hover:border-[#00f3ff] transition-all duration-300">
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#00f3ff]/20 transition-colors">
                                <Phone className="text-[#00f3ff]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Phone</p>
                                <p className="text-white font-semibold">6367839332</p>
                            </div>
                        </a>

                        <a href="mailto:vsaini81724@gmail.com" className="flex items-center gap-4 group p-4 border border-white/5 rounded-2xl w-max hover:border-[#9d00ff] transition-all duration-300">
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#9d00ff]/20 transition-colors">
                                <Mail className="text-[#9d00ff]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Email</p>
                                <p className="text-white font-semibold">vsaini81724@gmail.com</p>
                            </div>
                        </a>

                        <a href="https://www.linkedin.com/in/vishal-saini-a0633a3a9" target="_blank" rel="noreferrer" className="flex items-center gap-4 group p-4 border border-white/5 rounded-2xl w-max hover:border-[#00f3ff] transition-all duration-300">
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#00f3ff]/20 transition-colors">
                                <Linkedin className="text-[#00f3ff]" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">LinkedIn</p>
                                <p className="text-white font-semibold flex items-center gap-1 hover:underline">vishal-saini-a0633a3a9 <ExternalLink size={12} /></p>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Right Side Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass p-8 md:p-12 rounded-3xl border border-white/10"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all text-white placeholder-gray-600"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all text-white placeholder-gray-600"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] transition-all text-white placeholder-gray-600 resize-none"
                                placeholder="How can we help each other?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="mt-4 interactive relative overflow-hidden group bg-transparent border border-[#00f3ff] text-[#00f3ff] rounded-xl px-6 py-4 font-semibold flex items-center justify-center gap-2 hover:text-black transition-colors duration-300"
                        >
                            <div className="absolute inset-0 w-full h-full bg-[#00f3ff] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></div>
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {status === "loading" ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Message</>}
                            </span>
                        </button>

                        {status === "success" && (
                            <p className="text-green-400 text-center mt-2 text-sm">Message sent successfully!</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-400 text-center mt-2 text-sm">Failed to send message. Please try again.</p>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    )
}
