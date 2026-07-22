import { Sparkles, TrendingUp, ShieldCheck, GraduationCap, HeartHandshake } from 'lucide-react'

interface PillarItem {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  badge: string
  colorClass: string
  shadowClass: string
}

const PILLARS: PillarItem[] = [
  {
    id: 'enough-games',
    number: '01',
    title: 'Enough Games to Not Get Bored',
    subtitle: 'Variety & Infinite Exploration',
    description: 'A rich, pre-loaded digital toy chest filled with tactile mini-games—from Flashlight Safari to Letter Tracing—ensuring endless engagement without endless app store installs.',
    icon: <Sparkles className="w-5 h-5 text-neon-purple" />,
    badge: 'Pre-loaded Library',
    colorClass: 'border-neon-purple/30 text-neon-purple bg-neon-purple/10',
    shadowClass: 'shadow-neon-purple'
  },
  {
    id: 'grow-with-child',
    number: '02',
    title: 'Games That Grow With Your Child',
    subtitle: 'Adaptive Skill Scaling',
    description: 'Tweak game settings and scale difficulty parameters to meet your child where they are—adapting seamlessly from early 3-year-old motor taps to 5-year-old letter writing.',
    icon: <TrendingUp className="w-5 h-5 text-neon-teal" />,
    badge: 'Adaptive Difficulty',
    colorClass: 'border-neon-teal/30 text-neon-teal bg-neon-teal/10',
    shadowClass: 'shadow-neon-teal'
  },
  {
    id: 'agency-without-escape',
    number: '03',
    title: 'Agency Without Escape',
    subtitle: 'Toddler Ergonomics',
    description: 'Designed specifically for toddler hands with zero written text, big touch targets, and zero accidental pop-ups or escape routes. Absolute independence in a safe digital sandbox.',
    icon: <ShieldCheck className="w-5 h-5 text-neon-pink" />,
    badge: 'Zero Text / Zero Traps',
    colorClass: 'border-neon-pink/30 text-neon-pink bg-neon-pink/10',
    shadowClass: 'shadow-neon-pink'
  },
  {
    id: 'teach-accidentally',
    number: '04',
    title: 'Games That Teach Accidentally',
    subtitle: 'Stealth Educational Design',
    description: 'Children learn color theory, color mixing, eye-hand coordination, animal diets, and letter tracing naturally through play, without tedious quizzes or drill cards.',
    icon: <GraduationCap className="w-5 h-5 text-neon-blue" />,
    badge: 'Stealth Learning',
    colorClass: 'border-neon-blue/30 text-neon-blue bg-neon-blue/10',
    shadowClass: 'shadow-neon-blue'
  },
  {
    id: 'fun-without-addiction',
    number: '05',
    title: 'Fun Without Addiction',
    subtitle: 'Healthy Screen Boundaries',
    description: 'Built from the ground up without dopamine loops, endless scrolling, or predatory reward streaks. Includes gentle shut-down timers when set session limits expire.',
    icon: <HeartHandshake className="w-5 h-5 text-neon-purple" />,
    badge: 'Gentle Boundaries',
    colorClass: 'border-neon-purple/30 text-neon-purple bg-neon-purple/10',
    shadowClass: 'shadow-neon-purple'
  }
]

export function PillarsShowcase() {
  return (
    <section id="pillars" className="w-full py-20 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-850 text-xs font-mono text-neon-purple shadow-neon-purple">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            A Toybox Built for Toddlers.
          </h2>
          <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Local-first software engineered around 5 uncompromised principles of child development, independent agency, and digital safety.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const isWide = idx === 4 // Make 5th item stretch nicely on lg layout if grid has 3 cols
            return (
              <div
                key={pillar.id}
                className={`glass-panel p-6 rounded-2xl border border-neutral-850 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition-all duration-300 group ${
                  isWide ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl bg-neutral-950 border ${pillar.colorClass} ${pillar.shadowClass}`}>
                      {pillar.icon}
                    </div>
                    <span className="font-mono text-xs text-neutral-600 font-bold group-hover:text-neutral-400 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border ${pillar.colorClass}`}>
                      {pillar.badge}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight pt-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-neon-teal transition-colors" />
                  <span>Toddler First Architecture</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PillarsShowcase
