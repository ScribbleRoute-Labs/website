import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Shield, Sparkles, Gamepad2, Layers } from 'lucide-react'

interface GameData {
  id: string
  name: string
  tag: string
  objective: string
  description: string
  emoji: string
  images: string[]
  themeColor: string // hex code or CSS var for border/glow
  themeClass: string // text-neon-xxx bg-neon-xxx/10 border-neon-xxx/20
  shadowClass: string // shadow-neon-xxx
}

const GAMES_LIST: GameData[] = [
  {
    id: 'launcher',
    name: 'ToyBox Launcher',
    tag: 'Main Portal',
    objective: 'Choice & Toddler Independence',
    description: 'The language-agnostic landing dashboard. Features large tapping areas, bright animated cards, and zero textual barriers, allowing children to launch any mini-game independently.',
    emoji: '📱',
    images: ['/images/HomeScreen_1.png', '/images/HomeScreen_2.png'],
    themeColor: '#D0BCFF',
    themeClass: 'text-neon-purple bg-neon-purple/10 border-neon-purple/20',
    shadowClass: 'shadow-neon-purple'
  },
  {
    id: 'safari',
    name: 'Flashlight Safari',
    tag: 'Exploration',
    objective: 'Spatial Awareness & Curiosity',
    description: 'Explore a dark screen using a virtual flashlight beam to discover hidden animals. Sweeping the light beam triggers responsive animal animations and lively environmental sound effects.',
    emoji: '🔦',
    images: ['/images/FlashlightSafari_1.png', '/images/FlashlightSafari_2.png'],
    themeColor: '#80F3D6',
    themeClass: 'text-neon-teal bg-neon-teal/10 border-neon-teal/20',
    shadowClass: 'shadow-neon-teal'
  },
  {
    id: 'colorbee',
    name: 'Color Bee',
    tag: 'Color Matching',
    objective: 'Early Color Theory & Motor Control',
    description: 'Match colors and guide busy bumblebees to their corresponding flower beds. An engaging puzzle that teaches early color categorization and builds precision motor controls.',
    emoji: '🐝',
    images: ['/images/ColorBee_1.png', '/images/ColorBee_2.png'],
    themeColor: '#EFB8C8',
    themeClass: 'text-neon-pink bg-neon-pink/10 border-neon-pink/20',
    shadowClass: 'shadow-neon-pink'
  },
  {
    id: 'feed',
    name: 'Animal Feed Match',
    tag: 'Sorting',
    objective: 'Shape & Object Recognition',
    description: 'Feed hungry animals like a giant forest bear by matching food items to their preferences. Fosters early shape sorting and matching logic through friendly, feedback-driven animation.',
    emoji: '🐻',
    images: ['/images/AnimalFeed_Bear.png'],
    themeColor: '#60A5FA',
    themeClass: 'text-neon-blue bg-neon-blue/10 border-neon-blue/20',
    shadowClass: 'shadow-neon-blue'
  },
  {
    id: 'catcher',
    name: 'Bug Catcher',
    tag: 'Reflexes',
    objective: 'Visual Tracking & Action Response',
    description: 'Tap to catch crawling ladybugs and caterpillars on a grass playground. Fast-paced tapping action that builds response time and hand-eye coordination with rich tactile pops.',
    emoji: '🪲',
    images: ['/images/Bug_Catcher.png'],
    themeColor: '#80F3D6',
    themeClass: 'text-neon-teal bg-neon-teal/10 border-neon-teal/20',
    shadowClass: 'shadow-neon-teal'
  },
  {
    id: 'tracing',
    name: 'Letter Tracing',
    tag: 'Early Literacy',
    objective: 'Path Drawing & Pre-Writing',
    description: 'Trace guided lines to draw letters, numbers, and basic shapes. The perfect foundation for grip control and early handwriting with fun, responsive rewards upon path completion.',
    emoji: '✍️',
    images: ['/images/TraceTheLetters.png'],
    themeColor: '#D0BCFF',
    themeClass: 'text-neon-purple bg-neon-purple/10 border-neon-purple/20',
    shadowClass: 'shadow-neon-purple'
  }
]

const CLASSIC_GAMES = [
  { name: 'Nesting Dolls', emoji: '🪆', desc: 'Stack dolls by height. Teaches relative sizing, scales, and sequencing logic.' },
  { name: 'Scribble Puzzle', emoji: '🧩', desc: 'Toddler-friendly drag-and-drop puzzles with forgiving snap-to guidelines.' },
  { name: 'Symmetrical Blocks', emoji: '🧱', desc: 'Copy block patterns symmetrically on a split screen to build early geometry skills.' },
  { name: 'Elf Hunt', emoji: '🧝', desc: 'Whimsical winter seek-and-find. Spot hidden characters behind winter woodland elements.' }
]

export function ToyBoxShowcase() {
  const [activeGameId, setActiveGameId] = useState<string>('launcher')
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

  const activeGame = GAMES_LIST.find(g => g.id === activeGameId) || GAMES_LIST[0]

  // Reset slide index when active game changes
  useEffect(() => {
    setActiveSlideIndex(0)
  }, [activeGameId])

  // Handle slide rotation for games with multiple screenshots
  useEffect(() => {
    if (activeGame.images.length <= 1) return

    const timer = setInterval(() => {
      setActiveSlideIndex(prev => (prev + 1) % activeGame.images.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [activeGame])

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveSlideIndex(prev => (prev + 1) % activeGame.images.length)
  }

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveSlideIndex(prev => (prev - 1 + activeGame.images.length) % activeGame.images.length)
  }

  return (
    <section id="toybox-showcase" className="w-full py-20 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-850 text-xs font-mono text-neon-pink shadow-neon-pink">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Interactive Playroom</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Inside the ToyBox: Built for Autonomy.
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
            Every game in ScribbleBox is designed with zero written instructions, allowing toddlers to explore, learn, and play independently. Review screenshots from our built-in offline activities below.
          </p>
        </div>

        {/* Dynamic Multi-column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Game List Tabs */}
          <div className="lg:col-span-5 space-y-3 order-2 lg:order-1">
            <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-widest pl-2 block">
              Offline Mini-Games Catalog
            </span>
            <div className="space-y-2">
              {GAMES_LIST.map((game) => {
                const isActive = game.id === activeGameId
                return (
                  <button
                    key={game.id}
                    onClick={() => setActiveGameId(game.id)}
                    className={`w-full flex items-center gap-4 p-3.5 rounded-xl text-left transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple/50 ${
                      isActive
                        ? `bg-neutral-900/60 border-neutral-700 shadow-sm`
                        : 'bg-neutral-950/20 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/10'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-neutral-950 border flex items-center justify-center text-xl shrink-0 transition-colors ${
                        isActive ? 'border-neutral-700' : 'border-neutral-900'
                      }`}
                    >
                      {game.emoji}
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-semibold tracking-tight ${isActive ? 'text-white' : 'text-neutral-400'}`}>
                          {game.name}
                        </h3>
                        <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-full border ${game.themeClass}`}>
                          {game.tag}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted truncate">
                        {game.objective}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Premium Tablet Simulator */}
          <div className="lg:col-span-7 flex flex-col order-1 lg:order-2">
            <div className="w-full relative">
              {/* The Physical-style Tablet Chassis */}
              <div
                className={`w-full bg-neutral-900 rounded-[32px] p-3 sm:p-4 border-[6px] border-neutral-800 shadow-2xl relative overflow-hidden transition-all duration-500 ${activeGame.shadowClass}`}
                style={{
                  boxShadow: `0 0 35px -5px ${activeGame.themeColor}1a, 0 0 10px -2px ${activeGame.themeColor}10`
                }}
              >
                {/* Tablet Top Camera Hole / Sensor Bar */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-neutral-800 rounded-full z-20 pointer-events-none" />

                {/* Kids Tablet Screen Area */}
                <div className="relative aspect-[4/3] w-full bg-neutral-950 rounded-2xl border border-neutral-850 overflow-hidden group select-none">
                  
                  {/* Kids App Status Bar */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-black/40 backdrop-blur-md z-10 flex items-center justify-between px-3 text-[9px] font-mono text-neutral-400 select-none pointer-events-none border-b border-white/5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>ToyBox System V1.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500 uppercase">Offline Sandbox Mode</span>
                      <Shield className="w-3 h-3 text-neon-teal" />
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Screenshots Slide Container */}
                  <div className="w-full h-full pt-6 relative flex items-center justify-center">
                    {activeGame.images.map((imgUrl, idx) => {
                      const isSlideActive = idx === activeSlideIndex
                      return (
                        <div
                          key={imgUrl}
                          className={`absolute inset-x-0 bottom-0 top-6 transition-all duration-700 ease-in-out ${
                            isSlideActive
                              ? 'opacity-100 scale-100 translate-x-0 pointer-events-auto'
                              : 'opacity-0 scale-95 translate-x-4 pointer-events-none'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${activeGame.name} Screen ${idx + 1}`}
                            className="w-full h-full object-contain object-bottom select-none bg-neutral-950"
                          />
                        </div>
                      )
                    })}

                    {/* Left/Right Arrow Navigation Overlays (Only show when activeGame has multiple screenshots) */}
                    {activeGame.images.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800/80 transition-colors z-20 focus:outline-none"
                          aria-label="Previous screenshot"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-neutral-800 flex items-center justify-center text-white hover:bg-neutral-800/80 transition-colors z-20 focus:outline-none"
                          aria-label="Next screenshot"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Paginate Dots */}
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/65 px-2.5 py-1 rounded-full border border-neutral-900">
                          {activeGame.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveSlideIndex(idx)
                              }}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                idx === activeSlideIndex ? 'bg-white w-3' : 'bg-neutral-600 hover:bg-neutral-400'
                              }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Game Detail Card Overlay below the tablet */}
              <div className="mt-4 p-5 rounded-2xl glass-panel border border-neutral-850 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border ${activeGame.themeClass}`}>
                    Focus: {activeGame.objective}
                  </span>
                  <span className="text-neutral-500 font-mono text-[10px]">// offline execution ok</span>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {activeGame.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Catalog: Additional Built-in Games */}
        <div className="pt-8 space-y-6 border-t border-neutral-900/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Layers className="w-4.5 h-4.5 text-neon-pink" />
                <span>The Extended Playroom Library</span>
              </h3>
              <p className="text-xs text-text-muted">
                Additional built-in tactile mini-games shipping standard inside the offline ToyBox app.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-900 text-[10px] font-mono text-neutral-400">
              <Sparkles className="w-3 h-3 text-neon-teal" />
              <span>10+ Games Preloaded</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLASSIC_GAMES.map((cg) => (
              <div
                key={cg.name}
                className="p-4 rounded-xl border border-neutral-900 bg-neutral-950/30 flex flex-col justify-between space-y-3 hover:border-neutral-850 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-label={cg.name}>{cg.emoji}</span>
                    <h4 className="text-sm font-semibold text-white tracking-tight">{cg.name}</h4>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">{cg.desc}</p>
                </div>
                <div className="text-[9px] font-mono text-neon-teal tracking-wider pt-1 flex items-center gap-1 select-none">
                  <span className="w-1 h-1 rounded-full bg-neon-teal" />
                  <span>LOCAL PLAYABLE</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default ToyBoxShowcase
