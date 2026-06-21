import { Hero } from '@/components/Hero'
import { TechManifesto } from '@/components/TechManifesto'
import { ProductTier } from '@/components/ProductTier'
import { EngineeringDeepDive } from '@/components/EngineeringDeepDive'
import { Footer } from '@/components/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 font-sans antialiased selection:bg-[#c0a9f5]/30">
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center space-y-2">
        <Hero />
        <TechManifesto />
        <ProductTier />
        <EngineeringDeepDive />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage

