import { Hero } from '@/components/Hero'
import { SafePlayground } from '@/components/SafePlayground'
import { TechManifesto } from '@/components/TechManifesto'
import { ProductTier } from '@/components/ProductTier'
import { Footer } from '@/components/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 font-sans antialiased selection:bg-[#c0a9f5]/30">
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center space-y-12">
        <Hero />
        <SafePlayground />
        <TechManifesto />
        <ProductTier />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
