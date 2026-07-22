import { Link } from 'react-router-dom'
import { Check, X, Shield, Star, RefreshCw } from 'lucide-react'

export function ProductTier() {
  return (
    <section id="pricing" className="w-full py-20 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-neon-pink">
            Pricing &amp; Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Designed to be owned, not rented.
          </h2>
          <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
            Most children's apps use predatory dark patterns and zombie subscription billing. ScribbleRoute is built on transparency: buy it once, own it forever.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* Card 1: ScribbleKeep (Free) */}
          <div className="glass-panel p-8 rounded-2xl border border-neutral-850 flex flex-col justify-between relative overflow-hidden group hover:border-neutral-800 transition-all duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono tracking-wider text-neon-teal">Level 01</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">ScribbleKeep</h3>
                </div>
                <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-900 text-neon-teal">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                The local, private control app that runs on the same physical tablet as ScribbleBox. 100% local, air-gapped, with zero outbound requests until requested.
              </p>
              <div className="pt-2">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-xs text-text-muted ml-2 font-mono">/ Forever Free</span>
              </div>

              <div className="w-full h-[1px] bg-neutral-850/60" />

              <ul className="space-y-3.5 text-sm text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-teal shrink-0 mt-0.5" />
                  <span>100% Offline execution &amp; SQLite storage</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-teal shrink-0 mt-0.5" />
                  <span>Max volume limits &amp; optional audio toggles</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-teal shrink-0 mt-0.5" />
                  <span>Disable any game &amp; tweak difficulty levels</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-teal shrink-0 mt-0.5" />
                  <span>Gentle screen time shutdown timers</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-teal shrink-0 mt-0.5" />
                  <span>Save drawings &amp; signatures for offline viewing</span>
                </li>
                <li className="flex items-start gap-2.5 text-neutral-500 line-through decoration-neutral-800">
                  <X className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                  <span>Multi-device remote controls</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                to="/canvas"
                className="block w-full py-3 text-center text-xs font-semibold rounded-lg bg-neutral-950 border border-neutral-900 hover:border-neutral-850 text-neutral-300 hover:text-white transition-all font-mono"
              >
                Launch Offline Demo
              </Link>
            </div>
          </div>

          {/* Card 2: ScribbleRemote (Premium) */}
          <div className="glass-panel p-8 rounded-2xl border border-neon-pink/20 flex flex-col justify-between relative overflow-hidden group shadow-neon-pink hover:border-neon-pink/35 transition-all duration-300">
            {/* Corner Badge */}
            <div className="absolute top-0 right-0 bg-neon-pink text-black text-[9px] font-black uppercase tracking-wider py-1 px-4 rounded-bl-xl font-mono">
              One-Time Purchase
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono tracking-wider text-neon-pink">Level 02</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">ScribbleRemote</h3>
                </div>
                <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-900 text-neon-pink">
                  <Star className="w-5 h-5 animate-pulse" />
                </div>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                Connect your phone directly to the tablet profile with an optional Google Account link. Extend sessions (+15 min), adjust volume locks, and view galleries remotely.
              </p>
              <div className="pt-2">
                <span className="text-4xl font-black text-white">$15</span>
                <span className="text-xs text-text-muted ml-2 font-mono">/ Single Lifetime Buy</span>
              </div>

              <div className="w-full h-[1px] bg-neutral-850/60" />

              <ul className="space-y-3.5 text-sm text-neutral-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-pink shrink-0 mt-0.5" />
                  <span>Includes all ScribbleKeep local parent features</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-pink shrink-0 mt-0.5" />
                  <span>Remote game disabling &amp; volume lock overrides</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-pink shrink-0 mt-0.5" />
                  <span>Stateless Rust API remote relay switchboard</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-pink shrink-0 mt-0.5" />
                  <span>Global vector drawing &amp; signature galleries</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-neon-pink shrink-0 mt-0.5" />
                  <span>Optional Google Auth profile linking</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => alert('ScribbleRemote purchase simulation triggered! One-time fee: $15. No recurring billing.')}
                className="block w-full py-3 text-center text-xs font-semibold rounded-lg bg-white text-black hover:bg-neutral-200 transition-all font-mono"
              >
                Purchase Lifetime License
              </button>
            </div>
          </div>

        </div>

        {/* Feature Highlight: Real-time Remote Drawing Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-neutral-950/30 p-6 sm:p-8 rounded-2xl border border-neutral-900">
          <div className="md:col-span-7 space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neon-pink">
              ScribbleRemote Exclusive Feature
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              A Live Gallery of Your Child's Art &amp; Signatures
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Never miss a creative moment. Save finger paintings, traced letters, and signatures to view your child's art after the fact. Access the complete artwork gallery on your phone, zoom in, and download scaling vector SVGs.
            </p>
            <ul className="space-y-2 text-xs font-mono text-neutral-350">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                <span>100% Vector Path preservation (no blur, no pixelation)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                <span>Download SVG files to decorate your home or print on canvas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                <span>Stateless end-to-end sync through Rust + Neon Edge</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-5 flex justify-center">
            {/* Phone Mockup Frame */}
            <div className="relative w-48 sm:w-56 bg-neutral-900 rounded-[36px] p-2.5 border-4 border-neutral-800 shadow-2xl overflow-hidden aspect-[9/19]">
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3 bg-neutral-800 rounded-full z-20 pointer-events-none" />
              <div className="relative w-full h-full bg-neutral-950 rounded-[28px] overflow-hidden border border-neutral-850">
                <img
                  src="/images/ScribbleKeepCloud_Drawing_Viewer.png"
                  alt="ScribbleKeepCloud Drawing Gallery Viewer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="pt-8 space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight text-center md:text-left">
            Architectural Capability Comparison
          </h3>
          <div className="overflow-x-auto rounded-xl border border-neutral-900 bg-neutral-950/40">
            <table className="w-full text-left border-collapse text-xs font-mono text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-900 bg-neutral-950">
                  <th className="p-4 font-semibold text-white">Capability</th>
                  <th className="p-4 font-semibold text-neon-teal">ScribbleKeep (Free)</th>
                  <th className="p-4 font-semibold text-neon-pink">ScribbleRemote (Paid)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/60">
                <tr>
                  <td className="p-4 font-medium text-white">Hosting Architecture</td>
                  <td className="p-4 text-neutral-400">100% Local / Air-Gapped</td>
                  <td className="p-4 text-neutral-400">Local + Edge Switchboard Relay</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Network Communication</td>
                  <td className="p-4 text-neutral-400">Zero outbound requests</td>
                  <td className="p-4 text-neutral-400">Stateless REST API + SSE sockets</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Parent Control Access</td>
                  <td className="p-4 text-neutral-400">Same-device local admin app</td>
                  <td className="p-4 text-neutral-400">Multi-device remote cloud admin link</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Volume Limits &amp; Audio</td>
                  <td className="p-4 text-neutral-400">On-device max volume lock</td>
                  <td className="p-4 text-neutral-400">Remote max volume lock override</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Game &amp; Difficulty Management</td>
                  <td className="p-4 text-neutral-400">Local game disabling &amp; difficulty tweaks</td>
                  <td className="p-4 text-neutral-400">Remote game disabling &amp; difficulty tweaks</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Session Timer Auditing</td>
                  <td className="p-4 text-neutral-400">Stateless Gentle Shutdown check</td>
                  <td className="p-4 text-neutral-400">Gentle Shutdown + Remote +15m extension</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-white">Billing Lifecycle</td>
                  <td className="p-4 text-neutral-400">None ($0)</td>
                  <td className="p-4 text-neutral-400">Single one-time invoice. No subscriptions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Anti-Subscription Seal */}
        <div className="flex items-center gap-4 p-4 rounded-xl border border-neutral-900 bg-neutral-950/60 max-w-xl mx-auto">
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-850 text-neon-teal shrink-0">
            <RefreshCw className="w-5 h-5 rotate-45" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs uppercase tracking-wider font-bold text-white font-mono">Our Zero-Subscription Guarantee</h4>
            <p className="text-[11px] text-text-muted leading-relaxed">
              We never run credit card loops, auto-renewals, or dark pattern cancellations. When children outgrow our software, parents stop using it. There is no billing footprint to remember to cancel.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProductTier
