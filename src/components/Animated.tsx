import anime from "animejs"
import { useEffect } from "react"
//import { useState } from 'react'

interface props {
    children: React.ReactNode
    className?: string
    animations: Animation["type"][]
    animeKey: string
    triggerHover?: (val: boolean) => any
    onClick?: () => any
}

interface Animation {
    type: "hover-grow" | "bounce"
}

export default function Animated({ children, animations, animeKey, className = '', triggerHover = () => { }, onClick = () => { } }: props) {

    const hoverAnimation: (type: "in" | "out") => void = (type) => {
        triggerHover(type === "in")
        if (animations.filter(type => ["hover-grow"].includes(type)).length !== 0) {
            type === "in" ? anime({
                targets: `.${animeKey}`,
                scale: 1.1,
            }) : anime({
                targets: `.${animeKey}`,
                scale: 1,
            })
        }

    }

    useEffect(() => {
        if (animations.filter(type => ["bounce"].includes(type)).length !== 0) {
            anime({
                targets: `.${animeKey}`,
                keyframes: [
                    { translateY: "0px" },
                    { translateY: "2px", duration: 200 },
                    { translateY: "0px", duration: 500 },
                ],
                easing: "easeOutElastic(2, .9)",
                delay: 2000,
                loop: true,
            })
        }
    }, [])

    return <div
        className={`${animeKey} ${className}`}
        onMouseEnter={() => hoverAnimation("in")}
        onMouseLeave={() => hoverAnimation("out")}
        onClick={onClick}
    >
        {children}
    </div>
}