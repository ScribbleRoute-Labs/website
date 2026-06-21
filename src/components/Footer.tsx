export function Footer() {
  return (
    <footer className="w-full py-16 mt-20 border-t border-neutral-900 bg-neutral-950/20">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        
        {/* Footnotes / Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono text-neutral-500">
          
          {/* Column 1: Domain mappings */}
          <div className="space-y-3">
            <span className="text-white font-bold text-[10px] uppercase tracking-wider block">Domain Mappings</span>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-purple shrink-0" />
                <span>scribbleroute.com — Marketing &amp; Parents Panel</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-teal shrink-0" />
                <span>scribbleroute.app — Zero-Word Toddler Client</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal Placeholders */}
          <div className="space-y-3">
            <span className="text-white font-bold text-[10px] uppercase tracking-wider block">Legal Sandbox</span>
            <ul className="space-y-2">
              <li>
                <a href="#terms" className="hover:text-neutral-300 transition-colors">Terms of Service (Standard No-Subscription)</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy (Local-First Guarantee)</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Mission */}
          <div className="space-y-3">
            <span className="text-white font-bold text-[10px] uppercase tracking-wider block">Corporate Mission</span>
            <p className="leading-relaxed">
              ScribbleRoute Labs is dedicated to creating user-owned family technology that respects limits, maintains privacy, and guarantees architectural durability.
            </p>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-neutral-900 text-[10px] font-mono text-neutral-600 gap-4">
          <div>
            &copy; {new Date().getFullYear()} ScribbleRoute Labs. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Built offline</span>
            <span>•</span>
            <span>V1.0.0 Production Release</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
