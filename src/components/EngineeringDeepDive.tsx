import { useState } from 'react'
import { ChevronDown, Code, GitFork, Cpu, ShieldAlert } from 'lucide-react'

interface AccordionItem {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  content: React.ReactNode
}

export function EngineeringDeepDive() {
  const [openSection, setOpenSection] = useState<string | null>('vector-paths')

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id)
  }

  const sections: AccordionItem[] = [
    {
      id: 'vector-paths',
      title: 'Infinite-Resolution Vector Paths',
      subtitle: 'Flow Coordinate Streaming vs. Lossy Bitmaps',
      icon: <Code className="w-5 h-5 text-neon-purple" />,
      content: (
        <div className="space-y-4 text-sm text-text-muted leading-relaxed">
          <p>
            Traditional children's drawing apps export drawings as compressed, lossy <code className="px-1.5 py-0.5 rounded bg-neutral-900 text-neon-purple font-mono text-xs">.png</code> or <code className="px-1.5 py-0.5 rounded bg-neutral-900 text-neon-purple font-mono text-xs">.jpeg</code> files. Over years of transfers, device upgrades, and cloud syncs, these memories inevitably compress, pixelate, or degrade.
          </p>
          <p>
            Scribble Paint bypasses rasterization entirely. Every touch interaction is recorded in real-time as a high-precision coordinate stream—what we call our <strong className="text-white">Flow Path format</strong>.
          </p>
          <div className="p-4 rounded-lg bg-black/40 border border-neutral-850 font-mono text-xs text-neutral-400 space-y-2 overflow-x-auto">
            <span className="text-neutral-500">// Sample Flow Path Stream Payload</span>
            <div className="text-neon-teal">
              {`{
  "id": "draw_98a72b",
  "brush": { "color": "#D0BCFF", "width": 4.5 },
  "coordinates": [
    { "x": 102.5, "y": 88.4, "t": 0 },
    { "x": 105.1, "y": 91.2, "t": 16 },
    { "x": 110.8, "y": 97.9, "t": 32 }
  ]
}`}
            </div>
          </div>
          <p>
            By storing drawings as raw mathematical coordinate vectors, drawings are preserved in <strong className="text-white">infinite resolution</strong>. They can be scaled to fit a high-definition tablet or printed on a physical canvas to decorate your wall, retaining pristine lines forever.
          </p>
        </div>
      )
    },
    {
      id: 'rust-switchboard',
      title: 'The Stateless Rust API Switchboard',
      subtitle: 'Zero-Habit Zero-Data Routing Layer',
      icon: <GitFork className="w-5 h-5 text-neon-pink" />,
      content: (
        <div className="space-y-4 text-sm text-text-muted leading-relaxed">
          <p>
            For parents who choose <strong className="text-white">ScribbleRemote</strong> for cross-house control, remote adjustments must traverse the internet. Most companies use this as an excuse to log your location, map user habits, and store children's files on centralized databases.
          </p>
          <p>
            We engineered our servers to act as a <strong className="text-white">stateless switchboard</strong>. Written in Rust and deployed across a distributed Kubernetes edge, the backend routes real-time commands (like volume updates or session extensions) directly from parent devices to ScribbleKeep profiles without ever saving the payload to disk.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
            <div className="flex-1 p-3 rounded bg-black/30 border border-neutral-850 flex flex-col justify-center items-center text-center">
              <span className="text-xs font-semibold text-white mb-1">Parent App</span>
              <span className="text-[10px] text-neon-pink">Sends signed payload via Google Auth</span>
            </div>
            <div className="flex items-center justify-center font-mono text-neon-pink text-xs select-none">
              ──▶
            </div>
            <div className="flex-1 p-3 rounded bg-black/40 border border-neon-pink/20 flex flex-col justify-center items-center text-center shadow-neon-pink">
              <span className="text-xs font-semibold text-neon-pink mb-1">Stateless Switchboard (Rust)</span>
              <span className="text-[10px] text-neutral-400">Verifies JWT token &amp; pushes message. Store to DB? [NO]</span>
            </div>
            <div className="flex items-center justify-center font-mono text-neon-teal text-xs select-none">
              ──▶
            </div>
            <div className="flex-1 p-3 rounded bg-black/30 border border-neutral-850 flex flex-col justify-center items-center text-center">
              <span className="text-xs font-semibold text-white mb-1">ScribbleKeep</span>
              <span className="text-[10px] text-neon-teal">Local client applies setting offline</span>
            </div>
          </div>
          <p>
            If our servers are ever compromised, there is nothing to steal. No profiles, no location logs, no toddler usage habits. Absolute privacy by architectural design.
          </p>
        </div>
      )
    },
    {
      id: 'timer-design',
      title: 'Stateless Date-Bound Dictionary Timers',
      subtitle: 'Zero Battery-Drain Screen Boundaries',
      icon: <Cpu className="w-5 h-5 text-neon-teal" />,
      content: (
        <div className="space-y-4 text-sm text-text-muted leading-relaxed">
          <p>
            Standard screen-time applications run battery-draining background services that constantly poll the system clock, leading to high resource usage and device lag.
          </p>
          <p>
            ScribbleLabs implements a <strong className="text-white">lazy evaluation timer design</strong>. Instead of active polling, the application stores a dictionary of allowed boundaries bound to strict calendar dates, verified at transition entry-points.
          </p>
          <p>
            When a child switches games in ScribbleBox or unlocks the screen, the system performs a stateless calculation comparing current timestamps against the locally stored dictionary boundaries:
          </p>
          <div className="p-4 rounded-lg bg-black/40 border border-neutral-850 font-mono text-xs text-neutral-400 space-y-2 overflow-x-auto">
            <span className="text-neutral-500">// Stateless Boundary Verification</span>
            <div className="text-neon-purple">
              {`const verifySession = (boundaryDict, currentTime) => {
  const dateKey = getFormattedDate(currentTime);
  const session = boundaryDict[dateKey];
  
  if (!session) return { allowed: true, remaining: DEFAULT_LIMIT };
  const elapsed = currentTime - session.startTime;
  return {
    allowed: elapsed < session.allowedDurationLimit,
    remaining: Math.max(0, session.allowedDurationLimit - elapsed)
  };
}`}
            </div>
          </div>
          <p>
            This lazy evaluation guarantees zero background process overhead, extending your child's tablet battery life while strictly maintaining set screen boundaries.
          </p>
        </div>
      )
    }
  ]

  return (
    <section id="deep-dive" className="w-full py-20 border-t border-neutral-900">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-850 text-xs font-mono text-neon-purple shadow-neon-purple">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Open Architecture</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            For the Engineer Parents: Under the Hood
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto">
            We build software the way you would. Here is the technical breakdown of how we ensure security, speed, and privacy.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const isOpen = openSection === section.id
            return (
              <div
                key={section.id}
                className={`glass-panel rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-neutral-700 bg-neutral-900/40' : 'border-neutral-850 hover:border-neutral-800 bg-neutral-900/10'
                }`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple/50"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg bg-neutral-900/80 border transition-all duration-300 ${
                      isOpen ? 'border-neutral-700 text-white' : 'border-neutral-850 text-neutral-400'
                    }`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white tracking-tight">{section.title}</h3>
                      <p className="text-xs text-text-muted mt-0.5">{section.subtitle}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[1000px] border-t border-neutral-850' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 bg-neutral-900/20">
                    {section.content}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EngineeringDeepDive
