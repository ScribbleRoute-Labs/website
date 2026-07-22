import { Volume2, Sliders, Clock, Image, ShieldAlert, Lock, Radio } from 'lucide-react'

interface ControlFeature {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  tag: string
  colorClass: string
  shadowClass: string
}

const PARENT_FEATURES: ControlFeature[] = [
  {
    id: 'game-disabling',
    title: 'Disable Any Game at Any Time',
    subtitle: 'Full Catalog Curated by You',
    description: 'Toggle individual mini-games on or off with a single tap in the parent admin dashboard. Customize your child’s accessible play space instantly.',
    icon: <Sliders className="w-5 h-5 text-neon-purple" />,
    tag: 'Game Management',
    colorClass: 'border-neon-purple/30 text-neon-purple bg-neon-purple/10',
    shadowClass: 'shadow-neon-purple'
  },
  {
    id: 'difficulty-tweaks',
    title: 'Tweak & Scale Game Difficulty',
    subtitle: 'Meet Your Child Where They Are',
    description: 'Adjust speed thresholds, snap-grid tolerances, and stroke precision to match your child’s current age, fine motor skills, and confidence.',
    icon: <Sliders className="w-5 h-5 text-neon-teal" />,
    tag: 'Adaptive Controls',
    colorClass: 'border-neon-teal/30 text-neon-teal bg-neon-teal/10',
    shadowClass: 'shadow-neon-teal'
  },
  {
    id: 'volume-locks',
    title: 'Volume Lock & Optional Audio',
    subtitle: 'Hearing Protection Safety',
    description: 'All game audio is completely optional. Set a hard maximum decibel cap in the local parent app so sound levels never exceed safe boundaries.',
    icon: <Volume2 className="w-5 h-5 text-neon-pink" />,
    tag: 'Volume Safety',
    colorClass: 'border-neon-pink/30 text-neon-pink bg-neon-pink/10',
    shadowClass: 'shadow-neon-pink'
  },
  {
    id: 'gentle-timers',
    title: 'Gentle Shutdown Session Timers',
    subtitle: 'No Screen Meltdowns',
    description: 'Set custom screen-time limits. When the session expires, the app gracefully dims, bids goodnight, and shuts down gently without abrupt cuts.',
    icon: <Clock className="w-5 h-5 text-neon-blue" />,
    tag: 'Screen Time Limits',
    colorClass: 'border-neon-blue/30 text-neon-blue bg-neon-blue/10',
    shadowClass: 'shadow-neon-blue'
  },
  {
    id: 'art-archiving',
    title: 'Art & Signature Archiving',
    subtitle: 'Preserve Toddler Masterpieces',
    description: 'Automatically save raw vector drawings, finger paintings, and traced signatures so you can review and preserve your child’s artwork after the fact.',
    icon: <Image className="w-5 h-5 text-neon-purple" />,
    tag: 'Art Preserved',
    colorClass: 'border-neon-purple/30 text-neon-purple bg-neon-purple/10',
    shadowClass: 'shadow-neon-purple'
  },
  {
    id: 'local-admin-privacy',
    title: '100% Local Parent Admin App',
    subtitle: 'No Outbound Requests',
    description: 'The parent admin panel runs completely on-device. Zero outbound network traffic until you explicitly request it (e.g. optional Google Account remote link).',
    icon: <Lock className="w-5 h-5 text-neon-teal" />,
    tag: 'Air-Gapped Local Use',
    colorClass: 'border-neon-teal/30 text-neon-teal bg-neon-teal/10',
    shadowClass: 'shadow-neon-teal'
  }
]

export function ParentalControls() {
  return (
    <section id="parental-controls" className="w-full py-20 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-850 text-xs font-mono text-neon-pink shadow-neon-pink">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Parent Admin Dashboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Complete Control. Zero Outbound Requests.
          </h2>
          <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            The parent admin application is available for 100% local, air-gapped use. You hold absolute authority over game access, difficulty, audio caps, and screen limits.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARENT_FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="glass-panel p-6 rounded-2xl border border-neutral-850 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-neutral-950 border ${feat.colorClass} ${feat.shadowClass}`}>
                    {feat.icon}
                  </div>
                  <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-full border ${feat.colorClass}`}>
                    {feat.tag}
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    {feat.subtitle}
                  </p>
                </div>

                <p className="text-xs text-text-muted leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-900 flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
                <Radio className="w-3 h-3 text-neon-teal" />
                <span>On-Device Execution</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Banner: Local First Privacy */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950/80 border border-neutral-850 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neon-teal">
              <Lock className="w-3.5 h-3.5" />
              <span>Offline and Privacy First</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              No network requests until you ask for it.
            </h3>
            <p className="text-xs text-text-muted max-w-xl leading-relaxed">
              ScribbleKeep operates as a local mailbox app on the tablet. If you choose to enable ScribbleRemote, an optional Google Account link connects phone to tablet with zero habit tracking.
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-end text-right font-mono text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neon-purple font-semibold">
              Zero Outbound Data
            </span>
            <span className="text-[10px] text-neutral-500 mt-1">Optional Google Auth Link</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ParentalControls
