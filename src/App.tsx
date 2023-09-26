import Animated from "./components/Animated"
import githublogo from "./assets/github-mark-white.svg"
import Textarea from 'react-textarea-autosize'
import { useState, useEffect } from 'react'
import { pixelate, unpixelate } from 'pixel-crypt'
import anime from "animejs"

export default function App() {
  // 1 Generator page, 2 How it Works page
  const [page, setPage] = useState<number>(1)

  // 1 Encode, 2 Decode
  const [generatorPage, setGeneratorPage] = useState<number>(1)

  // 1 Overview, 2 Technical Explanation
  const [overviewPage, setOverviewPage] = useState<number>(1)


  const [clicked, setClicked] = useState(false)

  const [navOpen, setNavOpen] = useState(false)

  const [inputs, setInputs] = useState({
    generatorString: "",
    generatorPixel: "",
    generatorSeed: ""
  })

  const [generatorResult, setGeneratorResult] = useState("")

  useEffect(() => {
    if (generatorPage === 1) {
      if (inputs.generatorString.length > 5 && inputs.generatorSeed.length > 5) {
        setGeneratorResult(() => pixelate(inputs.generatorString, inputs.generatorSeed)?.pixel as string || '')
      } else {
        setGeneratorResult("")
      }
    } else {
      if (inputs.generatorPixel.length > 5 && inputs.generatorSeed.length > 5) {
        setGeneratorResult(() => unpixelate(inputs.generatorPixel, inputs.generatorSeed)?.result || '')
      } else {
        setGeneratorResult("")
      }
    }
  }, [inputs, generatorPage])

  const handleChange: (target: "generatorString" | "generatorPixel" | "generatorSeed", val: string) => void = (target, val) => {
    setInputs({
      ...inputs,
      [target]: val
    })
  }

  const pageAnimateOutOptions: anime.AnimeParams = {
    translateX: [0, 20],
    duration: 300,
    opacity: ["100%", "0%"],
    easing: "easeInOutQuad",
    delay: anime.stagger("50ms"),

  }

  const pageAnimateInOptions: anime.AnimeParams = {
    translateX: [-20, 0],
    duration: 300,
    easing: "easeInOutQuad",
    delay: anime.stagger("50ms"),
    opacity: ["0%", "100%"],
  }

  const togglePageChange: (number: number) => void = (number) => {
    if (number !== page) {
      if (number === 1) {
        // switch to generator page
        anime({
          targets: ".page2-elem",
          ...pageAnimateOutOptions,
          complete: () => {
            setPage(() => 1)
            anime({
              targets: ".page1-elem",
              ...pageAnimateInOptions
            })
          }
        })

      } else if (number === 2) {
        // switch to how it works page

        anime({
          targets: ".page1-elem",
          ...pageAnimateOutOptions,
          complete: () => {
            setPage(() => 2)
            anime({
              targets: ".page2-elem",
              ...pageAnimateInOptions,
            })
          }
        })
      }
    }
  }

  return <div className="w-[100vw] max-w-[100vw] h-[100vh] max-h-[100vh] bg-gradient-to-b from-zinc-800 to-zinc-900 text-zinc-200 overflow-hidden bg-opacity-80 relative">
    <div className="w-full p-4 bg-zinc-900 shadow-xl flex flex-row items-center justify-center relative z-20">
      <div className={`-z-10 absolute left-0 flex flex-col p-5 bg-zinc-900 transition-all md:hidden ${navOpen ? 'top-[100%] opacity-100 ' : "top-[50%] opacity-0"}`}>
        <Animated
          animations={["hover-grow"]}
          animeKey="navigation2"
          className={`text-lg cursor-pointer mb-5 ${page === 2 ? 'font-light' : 'font-semibold'}`}
          onClick={() => togglePageChange(1)}
        >
          Generator
        </Animated>
        <Animated
          animations={["hover-grow"]}
          animeKey="navigation1"
          className={`text-lg cursor-pointer ${page === 1 ? 'font-light' : 'font-semibold'}`}
          onClick={() => togglePageChange(2)}
        >
          How it Works
        </Animated>
      </div>

      <div className={`absolute left-5 hidden md:flex flex-row items-center transition`}>
        <Animated
          animations={["hover-grow"]}
          animeKey="navigation2"
          className={`text-lg cursor-pointer mr-5 ${page === 2 ? 'font-light' : 'font-semibold'}`}
          onClick={() => togglePageChange(1)}
        >
          Generator
        </Animated>
        <Animated
          animations={["hover-grow"]}
          animeKey="navigation1"
          className={`text-lg cursor-pointer ${page === 1 ? 'font-light' : 'font-semibold'}`}
          onClick={() => togglePageChange(2)}
        >
          How it Works
        </Animated>
      </div>

      <Animated
        animations={["bounce"]}
        animeKey="navbutton"
        className="cursor-pointer p-4 absolute left-0 md:hidden"
        onClick={() => setNavOpen(!navOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </Animated>

      <Animated
        animations={["hover-grow"]}
        animeKey="logo"
      >
        <div className="font-mono text-2xl md:text-3xl font-bold cursor-pointer">
          <span className="bg-gradient-to-b from-cyan-400 to-indigo-500 bg-clip-text text-transparent hover:shadow">pixel</span>
          <span className="text-zinc-600">-</span>
          <span className="bg-gradient-to-b from-amber-300 to-orange-500 bg-clip-text text-transparent">crypt</span>
        </div>
      </Animated>
    </div>

    <div className={`h-full max-h-full w-full p-3 md:p-5`}>

      <div className={`w-full max-h-full flex flex-col items-center justify-center ${page === 1 ? 'block' : 'hidden'}`}>

        <div className="flex flex-row page1-elem">
          <div
            className={`border-b-4 p-3 transition flex flex-row items-center hover:border-b-amber-500 hover:text-amber-500 cursor-pointer ${generatorPage === 1 ? "border-b-zinc-200" : "border-b-zinc-500 text-zinc-500"}`}
            onClick={() => setGeneratorPage(1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            Encrypt
          </div>
          <div
            className={`border-b-4 p-3 transition flex flex-row items-center hover:border-b-blue-500 hover:text-blue-500 cursor-pointer ${generatorPage === 2 ? "border-b-zinc-200" : "border-b-zinc-500 text-zinc-500"}`}
            onClick={() => setGeneratorPage(2)}
          >
            Decrypt
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-3">
              <path fillRule="evenodd" d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1.5V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {generatorPage === 1 ? <Textarea
          className="page1-elem w-full max-w-[40rem] m-5 resize-none rounded-lg p-3 md:p-4 md:text-lg ring-0 focus:ring-0 focus:outline-none bg-zinc-700 border-2 border-zinc-800 hover:border-blue-500 focus:border-blue-500 hover:shadow-[0_0_65px_0_rgba(77,156,238,0.3)] focus:shadow-[0_0_65px_0_rgba(77,156,238,0.3)] transition-colors"
          placeholder="Enter Text..."
          value={inputs.generatorString}
          onChange={e => handleChange("generatorString", e.target.value)}
          spellCheck={false}
          maxLength={500}
          minRows={3}
          maxRows={5}
        /> : <Textarea
          className="page1-elem w-full max-w-[40rem] m-5 resize-none rounded-lg p-3 md:p-4 md:text-lg ring-0 focus:ring-0 focus:outline-none bg-zinc-700 border-2 border-zinc-800 hover:border-blue-500 focus:border-blue-500 hover:shadow-[0_0_65px_0_rgba(77,156,238,0.3)] focus:shadow-[0_0_65px_0_rgba(77,156,238,0.3)] transition-colors"
          placeholder="Enter Pixel..."
          value={inputs.generatorPixel}
          onChange={e => handleChange("generatorPixel", e.target.value)}
          spellCheck={false}
          maxLength={500}
          minRows={3}
          maxRows={5}
        />}

        <div
          className="page1-elem w-full max-w-[40rem] md:mb-5 rounded-lg p-3 md:p-4 md:text-lg bg-zinc-700 border-2 border-zinc-800 flex flex-row items-center justify-between hover:border-amber-400 focus-within:border-amber-400 hover:shadow-[0_0_65px_0_rgba(252,172,51,0.3)] focus-within:shadow-[0_0_65px_0_rgba(252,172,51,0.3)] transition-colors"
        >
          <input
            type="text"
            className="ring-0 focus:ring-0 focus:outline-none bg-transparent w-full h-full"
            placeholder="Key..."
            value={inputs.generatorSeed}
            maxLength={25}
            onChange={e => handleChange("generatorSeed", e.target.value)}
            spellCheck={false}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z" clipRule="evenodd" />
          </svg>
        </div>

        {generatorResult !== "" ? <div
          className="page1-elem relative group cursor-pointer w-full max-w-[40rem] m-5 rounded-lg p-[2px] md:text-lg bg-zinc-200 shadow-[0_0_65px_0_rgba(255,255,255,0.3)] hover:bg-gradient-to-br from-cyan-400 to-indigo-500 hover:shadow-[0_0_65px_0_rgba(77,156,238,0.3)] transition-colors"
          onClick={() => {
            setClicked(() => true)
            navigator.clipboard.writeText(generatorResult)
          }}
          onMouseLeave={() => setClicked(() => false)}
        >
          <div className="p-4 pr-16 bg-zinc-900 rounded-lg max-w-full break-words max-h-[6rem] overflow-y-auto">
            {generatorResult}
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 absolute top-3 right-3 text-zinc-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>

          <div className="absolute left-[50%] top-16 -translate-x-[50%] -translate-y-[130%] p-3 rounded-xl bg-zinc-900 hidden opacity-0 group-hover:block group-hover:opacity-100 group-hover:top-0 transition-all">
            {!clicked ? "Click to copy!" : "Copied!"}
            <div className="absolute left-[50%] bottom-0 -translate-x-[50%] translate-y-[100%] border-transparent border-8 border-t-zinc-900" />
          </div>
        </div> : <div
          className="page1-elem relative w-full max-w-[40rem] m-5 rounded-lg p-[2px] text-lg bg-zinc-500 shadow-[0_0_65px_0_rgba(255,255,255,0.1)] hover:bg-zinc-200 hover:shadow-[0_0_65px_0_rgba(255,255,255,0.3)] transition-colors"
        >
          <div className="p-6 bg-zinc-900 rounded-lg" />
        </div>}

      </div>

      <div className={`w-full max-h-full flex flex-col items-center justify-center ${page === 2 ? 'block' : 'hidden'}`}>

        <div className="flex flex-row page2-elem">
          <div
            className={`border-b-4 p-3 transition flex flex-row items-center hover:border-b-amber-500 hover:text-amber-500 cursor-pointer ${overviewPage === 1 ? "border-b-zinc-200" : "border-b-zinc-500 text-zinc-500"}`}
            onClick={() => setOverviewPage(1)}
          >
            Overview
          </div>
          <div
            className={`border-b-4 p-3 transition flex flex-row items-center hover:border-b-blue-500 hover:text-blue-500 cursor-pointer ${overviewPage === 2 ? "border-b-zinc-200" : "border-b-zinc-500 text-zinc-500"}`}
            onClick={() => setOverviewPage(2)}
          >
            Technical Explanation
          </div>
        </div>

        {overviewPage === 1 ? <div className="w-full max-w-[45rem] my-5 p-5 overflow-y-auto max-h-[70vh]">
          &nbsp;&nbsp;Pixel-crypt is an encryption package for encoding strings. (It even works with emojis and other special characters! 😜)
          You provide it an alphanumeric "key", and it generates an encoded string of numbers and letters.
          You can store this "Pixel" and decrypt it later using that handy key you used before!
          <div className="bg-amber-200 text-zinc-800 flex flex-row w-full p-3 my-8 items-center rounded-xl text-sm font-light">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0 mr-3">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Note! Pixel-crypt is not guaranteed to be secure as it has not been extensively tested for security. Do not use for important sensitive data, instead use UUIDs or Node's crypto library.
          </div>
          <div className="text-lg font-semibold">Possible Uses:</div>
          <ul className="list-disc ml-8 mb-5">
            <li>End-to-end message encryption</li>
            <li>Securing passwords or other secret data</li>
            <li>Encoding private notes on your personal device</li>
          </ul>

          <a href="https://github.com/JayPixl/pixel-crypt#documentation" className="underline hover:no-underline">
            Check out the <span className="font-mono">pixel-crypt</span> docs here!
          </a>

        </div> : <div className="w-full max-w-[45rem] my-5 p-5 overflow-y-auto max-h-[70vh]">
          &nbsp;&nbsp;The key you enter into the algorithm is turned into a string of numbers, and procedurally modified against itself to create a unique seed.
          This seed contains the instructions for the algorithm to mash up the string you input.
          Because the seed is unique and repeatable, the instructions can be used backwards to unhash an encrypted string.
          <a href="https://github.com/JayPixl/pixel-crypt#documentation" className="underline hover:no-underline">
            Check out the <span className="font-mono">pixel-crypt</span> docs here!
          </a>
        </div>}
      </div>
    </div>

    <div className="absolute bottom-0 right-0 p-2">
      <a href="https://github.com/JayPixl/pixel-crypt">
        <Animated
          animations={["hover-grow"]}
          animeKey="githublogo"
          className="rounded-full p-[5px] bg-zinc-900"
        >
          <img src={githublogo} className="h-10 w-10" alt="GitHub" />
        </Animated>
      </a>
    </div>

    <div className="absolute bottom-0 left-3 p-2">
      <a href="https://github.com/JayPixl/pixel-crypt-demo">
        <Animated
          animations={["hover-grow"]}
          animeKey="viewsource"
          className="rounded-full p-[5px] bg-zinc-900 flex flex-row items-center"
        >
          <div className="font-mono mr-2">View Page Source</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </Animated>
      </a>
    </div>
  </div>
}