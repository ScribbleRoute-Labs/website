import { Link } from 'react-router-dom'
import { FileText, ArrowRight, Sparkles, Terminal, Mail } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between items-center px-4 py-8 font-sans antialiased">
      {/* Top Header */}
      <header className="w-full max-w-2xl flex items-center justify-between py-4 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2 font-mono text-sm tracking-wider font-semibold text-white">
          <Terminal className="w-4 h-4 text-primary" />
          <span>teddy.fyi</span>
        </div>
        <Link 
          to="/grocery" 
          className="flex items-center gap-1 bg-primary text-black font-semibold px-4 py-2 rounded-lg text-xs hover:bg-[#c0a9f5] active:scale-95 transition-all shadow-[0_0_20px_rgba(208,188,255,0.2)]"
        >
          <span>Grocery App</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Professional Profile Content */}
      <main className="w-full max-w-2xl flex-1 flex flex-col justify-center py-12 space-y-8 animate-in fade-in duration-500">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-[10px] text-text-muted px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Available for Partnerships & Consulting</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-none">
            Teddy Martin
          </h1>
          <p className="text-lg sm:text-xl text-text-muted font-medium max-w-lg">
            Principal Full-Stack Engineer specializing in high-performance local-first sync systems, scalable infrastructure, and premium UX development.
          </p>
        </div>

        {/* Professional Connections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-tile border border-neutral-900 hover:border-neutral-800 transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-black border border-neutral-800 text-text-muted group-hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </div>
            <div>
              <span className="block text-sm font-semibold text-white group-hover:text-primary transition-colors">GitHub Profiles</span>
              <span className="block text-xs text-text-muted mt-0.5">Explore open source codebases</span>
            </div>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-tile border border-neutral-900 hover:border-neutral-800 transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-black border border-neutral-800 text-text-muted group-hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <div>
              <span className="block text-sm font-semibold text-white group-hover:text-primary transition-colors">LinkedIn Profile</span>
              <span className="block text-xs text-text-muted mt-0.5">Professional career timeline</span>
            </div>
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Resume download triggered!");
            }}
            className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-tile border border-neutral-900 hover:border-neutral-800 transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-black border border-neutral-800 text-text-muted group-hover:text-primary transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-semibold text-white group-hover:text-primary transition-colors">Curriculum Vitae</span>
              <span className="block text-xs text-text-muted mt-0.5">Download my latest Resume (PDF)</span>
            </div>
          </a>

          <a
            href="mailto:teddy@teddy.fyi"
            className="flex items-center gap-3.5 p-4 rounded-xl bg-surface-tile border border-neutral-900 hover:border-neutral-800 transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-black border border-neutral-800 text-text-muted group-hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-sm font-semibold text-white group-hover:text-primary transition-colors">Contact</span>
              <span className="block text-xs text-text-muted mt-0.5">teddy@teddy.fyi</span>
            </div>
          </a>
        </div>

        {/* Small Login/App Entry section */}
        <div className="border border-neutral-900 bg-neutral-950/20 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white">Grocery Sync Client</h3>
            <p className="text-xs text-text-muted">Access the secure cloud-synced collaborative grocery application.</p>
          </div>
          <Link
            to="/grocery"
            className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-semibold text-xs py-2.5 px-4 rounded-lg transition-all text-center cursor-pointer hover:border-neutral-700"
          >
            Authenticate & Launch
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-2xl text-center border-t border-[#1a1a1a] pt-4 text-[10px] text-neutral-600 font-mono">
        &copy; {new Date().getFullYear()} teddy.fyi. All rights reserved.
      </footer>
    </div>
  )
}
