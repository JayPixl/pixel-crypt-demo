import anime from "animejs"
import { useEffect, useState } from 'react'
import Animated from "./Animated"

interface props {

}

export default function PixelateButton({ }: props) {
    const [on, setOn] = useState(false)

    const particles = "000000000000".split("")
    const particleAnimation = anime({
        targets: ".particle",
        translateX: () => anime.random(-200, 200),
        translateY: () => anime.random(-25, 25),
        scale: () => anime.random(1, 1.1),
        opacity: [60, 0],
        easing: "linear",
        delay: anime.stagger(100),
        duration: 300,
        autoplay: false
    })

    useEffect(() => {
        console.log("trigger")
        if (on) {
            particleAnimation.play()
        } else {
            particleAnimation.pause()
            particleAnimation.restart()
        }
    }, [on])

    return <Animated
        animations={["hover-grow"]}
        animeKey="pixelate-button"
        className="relative"
        triggerHover={(val) => setOn(val)}
    >
        <button className="p-3 py-3 px-4 bg-gradient-to-br from-sky-400 to-violet-800 font-bold text-2xl">
            Pixelate
        </button>
        {particles.map((_, index) => <div
            key={`p${index}`}
            className={`particle absolute -z-10 top-[50%] right-[50%] h-3 w-3 bg-slate-200 ${on ? 'opacity-60' : "opacity-0"}`}
        />
        )}
    </Animated>
}