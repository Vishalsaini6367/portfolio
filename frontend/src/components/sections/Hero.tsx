"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { motion } from "framer-motion"
import { ArrowDown, MapPin, Download, FolderGit2, Mail } from "lucide-react"

// Floating random particles inside Three.js
function Particles({ count = 100 }) {
    const mesh = useRef<THREE.InstancedMesh>(null)

    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            if (mesh.current) {
                mesh.current.setMatrixAt(i, dummy.matrix)
            }
        })
        if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#00f3ff" wireframe opacity={0.3} transparent />
        </instancedMesh>
    )
}

export default function HeroSection() {
    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVars = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 50 }
        }
    }

    // Typewriter effect approach
    const subtitle = "Computer Science Engineering Student | Developer"

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#9d00ff" />
                    <Particles count={200} />
                </Canvas>
            </div>

            {/* Hero Content */}
            <motion.div
                variants={containerVars}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl"
            >
                <motion.div variants={itemVars} className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 glass">
                    <MapPin size={14} className="text-[#00f3ff]" />
                    <span className="text-sm text-gray-300">Jaipur, Rajasthan</span>
                </motion.div>

                <motion.h1
                    variants={itemVars}
                    className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 neon-text"
                >
                    Vishal Saini
                </motion.h1>

                <motion.div variants={itemVars} className="h-8 md:h-12 mb-8">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                        className="overflow-hidden whitespace-nowrap border-r-2 border-[#00f3ff] pr-1"
                        style={{ display: "inline-block" }}
                    >
                        <p className="text-lg md:text-3xl text-gray-400 font-light">
                            {subtitle}
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div variants={itemVars} className="flex flex-wrap gap-4 justify-center mt-4">
                    <a href="#projects" className="interactive group relative px-6 py-3 rounded-md overflow-hidden bg-white text-black font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                            <FolderGit2 size={18} /> View Projects
                        </span>
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#00f3ff] to-[#9d00ff] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
                    </a>

                    <a href="/Vishal_Resume.pdf" download className="interactive group px-6 py-3 rounded-md border border-white/20 glass text-white font-semibold flex items-center gap-2 hover:border-[#00f3ff] hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all hover:-translate-y-1">
                        <Download size={18} /> Download Resume
                    </a>

                    <a href="#contact" className="interactive group px-6 py-3 rounded-md border border-white/20 glass text-white font-semibold flex items-center gap-2 hover:border-[#9d00ff] hover:shadow-[0_0_15px_rgba(157,0,255,0.5)] transition-all hover:-translate-y-1">
                        <Mail size={18} /> Contact Me
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <ArrowDown size={32} />
            </motion.div>
        </div>
    )
}
