"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 })
    const [clicked, setClicked] = useState(false)
    const [linkHovered, setLinkHovered] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
        // Hide cursor on touch/mobile devices
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches)
    }, [])

    useEffect(() => {
        if (isTouchDevice) return

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseDown = () => setClicked(true)
        const handleMouseUp = () => setClicked(false)

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".interactive")
            ) {
                setLinkHovered(true)
            } else {
                setLinkHovered(false)
            }
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)
        document.addEventListener("mouseover", handleMouseOver)

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("mouseover", handleMouseOver)
        }
    }, [isTouchDevice])

    // Don't render on touch/mobile screens
    if (isTouchDevice) return null

    return (
        <>
            {/* Outer Glow Custom Cursor */}
            <motion.div
                className="fixed top-0 left-0 z-50 pointer-events-none rounded-full"
                animate={{
                    x: position.x - (linkHovered ? 24 : 16),
                    y: position.y - (linkHovered ? 24 : 16),
                    scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
                    opacity: position.x === -100 ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
                style={{
                    width: linkHovered ? 48 : 32,
                    height: linkHovered ? 48 : 32,
                    border: "2px solid var(--color-neon-blue)",
                    boxShadow: "0 0 10px var(--color-neon-blue), inset 0 0 10px var(--color-neon-blue)",
                    backgroundColor: linkHovered ? "rgba(0, 243, 255, 0.1)" : "transparent",
                }}
            />
            {/* Essential center dot */}
            <motion.div
                className="fixed top-0 left-0 z-50 bg-white pointer-events-none rounded-full"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    opacity: position.x === -100 ? 0 : 1,
                    scale: linkHovered ? 0 : 1,
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
                style={{
                    width: 8,
                    height: 8,
                    boxShadow: "0 0 10px #fff",
                }}
            />
        </>
    )
}
