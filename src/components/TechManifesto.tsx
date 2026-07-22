import { ShieldCheck, CloudOff, Unlock } from 'lucide-react'

export function TechManifesto() {
  return (
    <section id="philosophy" className="w-full py-20 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Editorial Headline */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-neon-teal">
            The ScribbleRoute Manifesto
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto leading-[1.1]">
            Always Local-First.<br />
            <span className="text-neutral-500 font-normal">Software should respect your family's boundaries.</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-neon-teal to-neon-purple mx-auto rounded mt-4" />
        </div>

        {/* Philosophy Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: 100% Offline Core */}
          <div className="glass-panel p-6 rounded-2xl border border-neutral-850 space-y-4 hover:border-neutral-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neon-teal shadow-neon-teal">
              <CloudOff className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">100% Offline Core</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Parent admin app is available for local use. No outbound requests until you ask for it. It works on road trips, off-grid cabins, and flights without a single byte sent to the cloud.
              </p>
            </div>
          </div>

          {/* Card 2: Absolute Data Privacy & Safety */}
          <div className="glass-panel p-6 rounded-2xl border border-neutral-850 space-y-4 hover:border-neutral-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neon-purple shadow-neon-purple">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Parent-Locked Control</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                All audio is optional, and maximum volume is locked to parent control to protect hearing. Disable any game at any time, set time limits, and tweak games to scale difficulty.
              </p>
            </div>
          </div>

          {/* Card 3: Zero Lock-In Ecosystem */}
          <div className="glass-panel p-6 rounded-2xl border border-neutral-850 space-y-4 hover:border-neutral-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neon-pink shadow-neon-pink">
              <Unlock className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Optional Cloud Power-Up</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Optional Google Account for true remote access. Save vector drawings and signatures to view your child's art after the fact. No predatory subscriptions ever.
              </p>
            </div>
          </div>

        </div>

        {/* The Monolithic Anti-Subscription Quote */}
        <div className="p-8 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col md:flex-row items-center gap-6 text-left">
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center text-2xl font-serif text-neon-purple select-none shrink-0">
            “
          </div>
          <div className="space-y-2">
            <p className="text-sm md:text-base text-neutral-300 italic leading-relaxed">
              "We believe software for children should be built like a physical wooden toybox. Enough games to not get bored, games that grow with your child, agency without escape, games that teach accidentally, and fun without addiction."
            </p>
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-500">
              — The ScribbleRoute Labs Design Philosophy
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default TechManifesto
