import { Palette, Target, Pencil, Flame, Utensils } from 'lucide-react'

interface LearningOutcome {
  id: string
  number: string
  title: string
  detail: string
  gameMapping: string
  emoji: string
  icon: React.ReactNode
  colorClass: string
  badgeClass: string
}

const OUTCOMES: LearningOutcome[] = [
  {
    id: 'color-matching',
    number: '01',
    title: 'Color Matching',
    detail: 'Teaches early color theory and pattern recognition by guiding bees to flower beds and catching matching colored bugs.',
    gameMapping: 'Color Bee & Bug Catcher',
    emoji: '🐝',
    icon: <Palette className="w-5 h-5 text-neon-pink" />,
    colorClass: 'border-neon-pink/30 text-neon-pink bg-neon-pink/10',
    badgeClass: 'text-neon-pink border-neon-pink/20 bg-neon-pink/10'
  },
  {
    id: 'eye-hand-coordination',
    number: '02',
    title: 'Eye-Hand Coordination',
    detail: 'Refines fine motor control, rapid target identification, and tactile reaction speed by tapping crawling bugs across moving playfields.',
    gameMapping: 'Bug Catcher',
    emoji: '🪲',
    icon: <Target className="w-5 h-5 text-neon-teal" />,
    colorClass: 'border-neon-teal/30 text-neon-teal bg-neon-teal/10',
    badgeClass: 'text-neon-teal border-neon-teal/20 bg-neon-teal/10'
  },
  {
    id: 'drawing-letters',
    number: '03',
    title: 'Drawing Letters & Name Writing',
    detail: 'Builds pre-writing grip control and letter formation by tracing guided stroke paths for letters, numbers, and personal signatures.',
    gameMapping: 'Letter Tracing',
    emoji: '✍️',
    icon: <Pencil className="w-5 h-5 text-neon-purple" />,
    colorClass: 'border-neon-purple/30 text-neon-purple bg-neon-purple/10',
    badgeClass: 'text-neon-purple border-neon-purple/20 bg-neon-purple/10'
  },
  {
    id: 'color-mixing',
    number: '04',
    title: 'Color Mixing Dynamics',
    detail: 'Fosters creative discovery by blending primary color strokes together in real-time vector path canvas to produce new vibrant secondary hues.',
    gameMapping: 'ScribblePaint',
    emoji: '🎨',
    icon: <Flame className="w-5 h-5 text-neon-blue" />,
    colorClass: 'border-neon-blue/30 text-neon-blue bg-neon-blue/10',
    badgeClass: 'text-neon-blue border-neon-blue/20 bg-neon-blue/10'
  },
  {
    id: 'animal-diets',
    number: '05',
    title: 'Animals & What They Eat',
    detail: 'Introduces zoology and ecological relationships by feeding forest animals their natural diets and discovering hidden wildlife.',
    gameMapping: 'Animal Feed Match & Flashlight Safari',
    emoji: '🐻',
    icon: <Utensils className="w-5 h-5 text-neon-teal" />,
    colorClass: 'border-neon-teal/30 text-neon-teal bg-neon-teal/10',
    badgeClass: 'text-neon-teal border-neon-teal/20 bg-neon-teal/10'
  }
]

export function LearningOutcomes() {
  return (
    <section id="learning-outcomes" className="w-full py-20 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-neon-teal">
            Stealth Educational Design
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Some of the Things Your Kid Can Learn
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
            No dry quizzes or repetitive flashcards. Educational milestones are integrated directly into organic gameplay loops.
          </p>
        </div>

        {/* Outcomes List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OUTCOMES.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-6 rounded-2xl border border-neutral-850 space-y-4 hover:border-neutral-750 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={item.title}>
                      {item.emoji}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono text-neutral-500">
                        Milestone {item.number}
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 rounded-xl bg-neutral-950 border ${item.colorClass}`}>
                    {item.icon}
                  </div>
                </div>

                <p className="text-xs text-text-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-900 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  Target Activity:
                </span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${item.badgeClass}`}>
                  {item.gameMapping}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LearningOutcomes
