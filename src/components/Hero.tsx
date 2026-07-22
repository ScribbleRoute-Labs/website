import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section id="hero" className="w-full py-12 flex flex-col items-center">
      {/* Brand Header */}
      <header className="w-full flex items-center justify-between py-6 border-b border-neutral-900 mb-12">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-gradient-to-tr from-neon-purple to-neon-pink flex items-center justify-center font-bold text-black text-xs tracking-tighter shadow-neon-purple">
            SR
          </div>
          <span className="font-extrabold tracking-tight text-white text-lg">
            ScribbleRoute <span className="text-neutral-500 font-normal">Labs</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/canvas"
            className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            Live Demo
          </Link>
          <a
            href="https://github.com/ScribbleRoute-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-850 bg-neutral-900/50 hover:bg-neutral-850 text-neutral-400 hover:text-white transition-all text-xs font-mono group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>Github</span>
            <ArrowRight className="w-3 h-3 text-neutral-600 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </header>

      {/* Pitch Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neon-teal shadow-neon-teal mb-6">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Local First • No Outbound Requests Until Asked</span>
      </div>

      {/* Hero Headline */}
      <div className="text-center max-w-2xl space-y-6 mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
          A toybox built <br />
          <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-teal bg-clip-text text-transparent">
            for toddlers.
          </span>
        </h1>
        <p className="text-text-muted text-base sm:text-lg max-w-lg mx-auto font-medium leading-relaxed">
          Agency without escape. Games that grow with your child and teach accidentally. Fun without addiction.
        </p>

        {/* Pitch Pillar Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-mono text-neutral-400">
          <span className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-850 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-neon-purple" /> Enough games to not get bored
          </span>
          <span className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-850 flex items-center gap-1.5">
            <HeartHandshake className="w-3 h-3 text-neon-pink" /> Volume max locked to parents
          </span>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/canvas"
            className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-neon-purple to-neon-pink text-black hover:opacity-90 transition-all shadow-lg font-bold animate-pulse-slow"
          >
            Launch Interactive Demo
          </Link>
          <a
            href="#pillars"
            className="px-5 py-2.5 text-sm font-semibold rounded-lg border border-neutral-850 bg-neutral-900/50 hover:bg-neutral-850 hover:border-neutral-800 transition-all text-white font-mono flex items-center gap-1.5"
          >
            <span>Explore Philosophy</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
