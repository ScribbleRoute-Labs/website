import { useState, useRef, useTransition } from 'react'
import { Link } from 'react-router-dom'
import {
  Volume2,
  Clock,
  Trash2,
  Activity,
  Database,
  Wifi,
  Shield,
  ArrowLeft
} from 'lucide-react'
import { Footer } from '@/components/Footer'

interface Point {
  x: number
  y: number
}

interface DrawPath {
  id: string
  points: Point[]
  color: string
  width: number
  type: 'brush' | 'circle' | 'triangle' | 'square'
}

export function CanvasPage() {
  const [, startTransition] = useTransition()
  // Canvas State
  const [paths, setPaths] = useState<DrawPath[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPoints, setCurrentPoints] = useState<Point[]>([])
  const [activeColor, setActiveColor] = useState('#D0BCFF') // neon-purple
  const [activeTool, setActiveTool] = useState<'brush' | 'circle' | 'triangle' | 'square'>('brush')

  // Parent Control State
  const [volumeCap, setVolumeCap] = useState<50 | 80>(50)
  const [screenLimit, setScreenLimit] = useState(45)
  const [screenElapsed] = useState(42)
  const [isPushing, setIsPushing] = useState(false)
  const [pushLogs, setPushLogs] = useState<string[]>([])

  // Low-level DB Simulator Console Logs
  const [dbLogs, setDbLogs] = useState<string[]>([
    '[INIT] ScribbleKeep Local DB online (SQLite3 Loopback VFS)',
    '[INIT] Volume capped at 50% max physical gain',
    '[INIT] Session timer loaded: 45m duration bound to date-key 2026-06-21',
  ])

  const canvasRef = useRef<SVGSVGElement>(null)

  const addDbLog = (msg: string) => {
    setDbLogs(prev => [
      `[${new Date().toLocaleTimeString()}] ${msg}`,
      ...prev.slice(0, 15)
    ])
  }

  // Web Audio alternative visual feedback triggers (wiggles and pulses)
  const [wiggleBtn, setWiggleBtn] = useState<string | null>(null)

  const triggerVisualPulse = (btnName: string) => {
    setWiggleBtn(btnName)
    setTimeout(() => setWiggleBtn(null), 400)
    addDbLog(`[event] ScribbleBox activity: button_click("${btnName}")`)
  }

  // Handle drawing
  const getCoordinates = (e: React.PointerEvent<SVGSVGElement>): Point | null => {
    if (!canvasRef.current) return null
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    }
  }

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const coords = getCoordinates(e)
    if (!coords) return

    canvasRef.current?.setPointerCapture(e.pointerId)

    if (activeTool === 'brush') {
      setIsDrawing(true)
      setCurrentPoints([coords])
      addDbLog(`[db.write] app.drawing.flow_path stream started`)
    } else {
      // Stamp shape immediately
      const newPath: DrawPath = {
        id: `stamp_${Date.now()}`,
        points: [coords],
        color: activeColor,
        width: 4,
        type: activeTool
      }
      setPaths(prev => [...prev, newPath])
      addDbLog(`[db.write] app.drawing.flow_path stamp: added_${activeTool}(x: ${coords.x}, y: ${coords.y})`)
    }
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing || activeTool !== 'brush') return
    const coords = getCoordinates(e)
    if (!coords) return

    startTransition(() => {
      setCurrentPoints(prev => {
        const next = [...prev, coords]
        // Throttled logging to not spam the console too heavily, log every 5th point
        if (next.length % 5 === 0) {
          addDbLog(`[stream] coordinate flow: append_vector(${coords.x}, ${coords.y})`)
        }
        return next
      })
    })
  }

  const handlePointerUp = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    if (currentPoints.length > 1) {
      const newPath: DrawPath = {
        id: `path_${Date.now()}`,
        points: currentPoints,
        color: activeColor,
        width: 4,
        type: 'brush'
      }
      setPaths(prev => [...prev, newPath])
      addDbLog(`[db.write] app.drawing.flow_path stream committed: ${currentPoints.length} points`)
    }
    setCurrentPoints([])
  }

  const clearCanvas = () => {
    setPaths([])
    addDbLog('[db.write] app.drawing.flow_path: truncated table local_drawings')
  }

  // Handle parent panel adjustments
  const toggleVolume = () => {
    const nextCap = volumeCap === 50 ? 80 : 50
    setVolumeCap(nextCap)
    addDbLog(`[db.write] app.config: set("audio.volume_cap", 0.${nextCap})`)
  }

  const triggerPushNotification = () => {
    if (isPushing) return
    setIsPushing(true)

    const logs = [
      '⚡ [Rust API]: Received parental session extension request',
      '🔒 [Rust API]: Auth validation passed (JWT verified via Google Auth client)',
      '🌐 [Stateless K8s Switchboard]: Routing payload to Neon routing ledger',
      '📨 [Neon Hub]: Broadcasting SSE silent payload target_device: "keep_profile_1"',
      '📱 [ScribbleKeep]: Neon payload received: { "command": "extend_session", "minutes": 15 }'
    ]

    logs.forEach((log, index) => {
      setTimeout(() => {
        setPushLogs(prev => [...prev, log])
        if (index === logs.length - 1) {
          setScreenLimit(prev => prev + 15)
          addDbLog('[db.write] app.config: extend_limit(+900s) verified_remote_push')
          setIsPushing(false)
        }
      }, (index + 1) * 350)
    })
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 font-sans antialiased selection:bg-[#c0a9f5]/30">
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center space-y-6 pb-12">
        {/* Brand Header */}
        <header className="w-full flex items-center justify-between py-6 border-b border-neutral-900 mb-8">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-neon-purple to-neon-pink flex items-center justify-center font-bold text-black text-xs tracking-tighter shadow-neon-purple">
              SR
            </div>
            <span className="font-extrabold tracking-tight text-white text-lg">
              ScribbleRoute <span className="text-neutral-500 font-normal">Labs</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-850 bg-neutral-900/50 hover:bg-neutral-850 text-neutral-400 hover:text-white transition-all text-xs font-mono group"
          >
            <ArrowLeft className="w-3 h-3 text-neutral-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Product Site</span>
          </Link>
        </header>

        {/* Headline Intro */}
        <div className="text-center max-w-2xl space-y-3 mb-6">
          <span className="text-xs uppercase font-mono tracking-widest text-neon-purple bg-neon-purple/10 px-2.5 py-1 rounded-full border border-neon-purple/20">
            Interactive System Demo
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            ScribbleBox &amp; ScribbleKeep
          </h1>
          <p className="text-text-muted text-sm max-w-md mx-auto leading-relaxed">
            Interact with the zero-text toddler board on the left and see how database transactions configure and sync locally in the parent control dashboard on the right.
          </p>
        </div>

        {/* The Split Screen Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Side: ScribbleBox (Zero-Word Arcade) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="w-full bg-neutral-900/40 rounded-2xl border border-neutral-800/80 p-4 sm:p-6 shadow-2xl flex flex-col flex-1 relative overflow-hidden">
              {/* Ambient Background Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-neon-purple/5 blur-3xl pointer-events-none rounded-full" />

              {/* Toy Case Mock Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-850/60 mb-4">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] font-mono text-neutral-600 tracking-wider">SCRIBBLEBOX ARCADE // OFFLINE ACTIVE</span>
              </div>

              {/* Title / Zero Word Info */}
              <div className="text-center mb-4">
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-500 bg-neutral-950 px-2.5 py-1 rounded-full border border-neutral-900">
                  🎨 Scribble Paint (Zero-Text Interface)
                </span>
              </div>

              {/* Drawing Canvas */}
              <div className="relative w-full aspect-video bg-neutral-950 rounded-xl border border-neutral-850 overflow-hidden cursor-crosshair group shadow-inner">
                <svg
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full touch-none"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                >
                  {/* Render committed paths */}
                  {paths.map((p) => {
                    if (p.type === 'brush') {
                      return (
                        <path
                          key={p.id}
                          d={`M ${p.points.map(pt => `${pt.x} ${pt.y}`).join(' L ')}`}
                          fill="none"
                          stroke={p.color}
                          strokeWidth={p.width}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )
                    } else if (p.type === 'circle') {
                      const pt = p.points[0]
                      return (
                        <circle
                          key={p.id}
                          cx={pt.x}
                          cy={pt.y}
                          r="24"
                          fill="none"
                          stroke={p.color}
                          strokeWidth={p.width}
                        />
                      )
                    } else if (p.type === 'triangle') {
                      const pt = p.points[0]
                      const size = 28
                      const points = `${pt.x},${pt.y - size} ${pt.x - size},${pt.y + size} ${pt.x + size},${pt.y + size}`
                      return (
                        <polygon
                          key={p.id}
                          points={points}
                          fill="none"
                          stroke={p.color}
                          strokeWidth={p.width}
                        />
                      )
                    } else if (p.type === 'square') {
                      const pt = p.points[0]
                      const size = 44
                      return (
                        <rect
                          key={p.id}
                          x={pt.x - size / 2}
                          y={pt.y - size / 2}
                          width={size}
                          height={size}
                          fill="none"
                          stroke={p.color}
                          strokeWidth={p.width}
                        />
                      )
                    }
                    return null
                  })}

                  {/* Render active drawing path */}
                  {isDrawing && currentPoints.length > 1 && (
                    <path
                      d={`M ${currentPoints.map(pt => `${pt.x} ${pt.y}`).join(' L ')}`}
                      fill="none"
                      stroke={activeColor}
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>

                {/* Canvas Overlay Hint */}
                {paths.length === 0 && !isDrawing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none select-none">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-880 flex items-center justify-center mb-2 animate-bounce">
                      🎨
                    </div>
                    <span className="text-xs text-neutral-500 font-mono">Scribble inside this frame to stream coordinates</span>
                  </div>
                )}
              </div>

              {/* Toy Chest Buttons: Toddler Workspace Control */}
              <div className="grid grid-cols-12 gap-3 mt-4">
                {/* Color Toggles */}
                <div className="col-span-12 sm:col-span-5 flex items-center gap-2 justify-around p-2.5 rounded-xl bg-neutral-950 border border-neutral-900">
                  {[
                    { hex: '#D0BCFF', shadow: 'shadow-neon-purple bg-neon-purple' },
                    { hex: '#EFB8C8', shadow: 'shadow-neon-pink bg-neon-pink' },
                    { hex: '#80F3D6', shadow: 'shadow-neon-teal bg-neon-teal' },
                    { hex: '#60A5FA', shadow: 'shadow-neon-blue bg-neon-blue' }
                  ].map(c => (
                    <button
                      key={c.hex}
                      onClick={() => {
                        setActiveColor(c.hex)
                        addDbLog(`[state] Brush color updated: ${c.hex}`)
                      }}
                      className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 transition-all ${activeColor === c.hex ? 'border-white scale-110 ' + c.shadow : 'border-transparent hover:scale-105 bg-neutral-800'
                        }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={`Select color ${c.hex}`}
                    />
                  ))}
                </div>

                {/* Shape stamps */}
                <div className="col-span-9 sm:col-span-5 grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-neutral-950 border border-neutral-900">
                  {[
                    { tool: 'brush', label: '🎨' },
                    { tool: 'circle', label: '◯' },
                    { tool: 'triangle', label: '△' },
                    { tool: 'square', label: '☐' }
                  ].map(t => (
                    <button
                      key={t.tool}
                      onClick={() => {
                        setActiveTool(t.tool as 'brush' | 'circle' | 'triangle' | 'square')
                        addDbLog(`[state] Tool set to: ${t.tool}`)
                      }}
                      className={`py-2 rounded-lg text-sm font-semibold transition-all ${activeTool === t.tool
                          ? 'bg-neutral-800 text-white border border-neutral-700'
                          : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Clear Canvas */}
                <div className="col-span-3 sm:col-span-2 flex">
                  <button
                    onClick={clearCanvas}
                    className="w-full flex items-center justify-center rounded-xl bg-red-950/30 border border-red-900/35 hover:bg-red-900/20 text-red-400 hover:text-red-300 transition-colors"
                    title="Clear Drawing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Zero-Text Subpanels: Animal Sound Popper Simulator */}
              <div className="mt-4 pt-4 border-t border-neutral-850/60">
                <div className="text-center mb-2">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">🐷 Sound Popper Activity Board (Visual Feedback Only)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { emoji: '🐶', label: 'Puppy Dog', class: 'border-neon-purple hover:bg-neon-purple/10 text-neon-purple' },
                    { emoji: '🐱', label: 'Kitty Cat', class: 'border-neon-pink hover:bg-neon-pink/10 text-neon-pink' },
                    { emoji: '🐦', label: 'Chippy Bird', class: 'border-neon-teal hover:bg-neon-teal/10 text-neon-teal' },
                    { emoji: '🦁', label: 'Roar Lion', class: 'border-neon-blue hover:bg-neon-blue/10 text-neon-blue' }
                  ].map(a => (
                    <button
                      key={a.emoji}
                      onClick={() => triggerVisualPulse(a.label)}
                      className={`py-3 rounded-xl border bg-black/40 text-xl font-bold flex flex-col items-center justify-center transition-all ${a.class} ${wiggleBtn === a.label ? 'scale-90 rotate-3' : 'hover:scale-[1.03]'
                        }`}
                    >
                      <span>{a.emoji}</span>
                      <span className="text-[9px] uppercase tracking-wider font-mono opacity-60 mt-1">{a.emoji === '🐶' ? 'WOOF' : a.emoji === '🐱' ? 'MEOW' : a.emoji === '🐦' ? 'TWEET' : 'ROAR'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: ScribbleKeep (Parent Control Dashboard) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="w-full bg-neutral-900/40 rounded-2xl border border-neutral-800/80 p-4 sm:p-6 shadow-2xl flex flex-col flex-1 relative overflow-hidden">
              {/* Ambient Background Glow */}
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-neon-teal/5 blur-3xl pointer-events-none rounded-full" />

              {/* Header info */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-850/60 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                  <Database className="w-3.5 h-3.5 text-neon-teal" />
                  <span>ScribbleKeep: Local Config</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-neon-teal font-mono bg-neon-teal/10 border border-neon-teal/20 px-2 py-0.5 rounded-full shadow-neon-teal animate-pulse">
                  <Wifi className="w-2.5 h-2.5" />
                  <span>Synced</span>
                </div>
              </div>

              <div className="space-y-5 flex-1">

                {/* Dynamic Live Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-900 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Active Paths</span>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-neon-purple" />
                      <span className="text-xl font-bold font-mono text-white">{paths.length}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-900 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Device Target</span>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-neon-teal" />
                      <span className="text-sm font-bold font-mono text-white">Pixel Tablet</span>
                    </div>
                  </div>
                </div>

                {/* Volume Cap Control */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-semibold text-white">Audio Limit Control</h3>
                      <p className="text-[10px] text-neutral-500">Limits physical hardware amplifier ceiling</p>
                    </div>
                    <button
                      onClick={toggleVolume}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${volumeCap === 50
                          ? 'bg-neon-teal/10 border-neon-teal/20 text-neon-teal shadow-neon-teal'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                        }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{volumeCap === 50 ? '50% Cap (Safe)' : '80% Cap'}</span>
                    </button>
                  </div>
                </div>

                {/* Screen Time Boundaries Control */}
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Lazy-Timer Boundary</h3>
                      <div className="flex items-center gap-1 text-xs text-neon-purple font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{screenElapsed}m / {screenLimit}m</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-500">Evaluates session limit on transition entry points</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden border border-neutral-850">
                    <div
                      className="bg-gradient-to-r from-neon-purple to-neon-pink h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (screenElapsed / screenLimit) * 100)}%` }}
                    />
                  </div>

                  {/* Adjuster Slider Simulation */}
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="15"
                      value={screenLimit}
                      onChange={(e) => {
                        const val = parseInt(e.target.value)
                        setScreenLimit(val)
                        addDbLog(`[db.write] app.config: set("timer.daily_duration", ${val * 60}s)`)
                      }}
                      className="flex-1 accent-neon-purple cursor-ew-resize bg-neutral-900 rounded-lg h-1.5"
                    />
                    <span className="text-xs font-mono text-neutral-400 w-12 text-right">{screenLimit} Min</span>
                  </div>

                  {/* Remote push simulator trigger */}
                  <div className="pt-2">
                    <button
                      onClick={triggerPushNotification}
                      disabled={isPushing}
                      className="w-full py-2 bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 active:scale-[0.99] disabled:opacity-55 text-black font-extrabold text-xs tracking-wide rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>⚡ Push +15 Mins (Remote Cloud Trigger)</span>
                    </button>
                  </div>
                </div>

                {/* Real-time telemetry routing log */}
                {pushLogs.length > 0 && (
                  <div className="p-3 bg-neutral-950/80 rounded-xl border border-neon-purple/20 space-y-1.5 text-[10px] font-mono text-neon-purple shadow-neon-purple max-h-32 overflow-y-auto">
                    <div className="font-semibold border-b border-neon-purple/10 pb-1 mb-1 flex justify-between items-center">
                      <span>STATELESS PUSH TELEMETRY IN FLIGHT</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-ping" />
                    </div>
                    {pushLogs.map((log, i) => (
                      <div key={i} className="leading-normal">{log}</div>
                    ))}
                  </div>
                )}

                {/* SQLite database transaction log */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Local SQLite3 VFS Transaction Log</span>
                  <div className="w-full h-32 bg-black rounded-xl p-3 border border-neutral-900 font-mono text-[9px] text-neutral-400 overflow-y-auto flex flex-col-reverse space-y-1 space-y-reverse select-none leading-normal">
                    {dbLogs.map((log, i) => (
                      <div
                        key={i}
                        className={
                          log.includes('[db.write]') ? 'text-neon-teal' :
                            log.includes('[event]') ? 'text-neon-pink' :
                              log.includes('[stream]') ? 'text-neutral-500' : 'text-neutral-400'
                        }
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CanvasPage
