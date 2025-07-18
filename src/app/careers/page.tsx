'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

// Moving text content for the banner
const movingTextItems = [
  "JOIN OUR TEAM",
  "BUILD THE FUTURE",
  "WORK WITH US",
  "CAREER OPPORTUNITIES",
  "LET'S WORK TOGETHER",
  "INNOVATION STARTS HERE",
  "YOUR NEXT ADVENTURE",
  "DREAM JOB AWAITS"
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-neutral-900 transition-colors duration-300">
      <Navigation />
      
      {/* Full Screen Hero Section - 100vh */}
      <section className="h-screen flex flex-col bg-neutral-900">
        {/* Main Hero Content - Takes most of the screen */}
        <div className="flex-1 flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-8 tracking-tight leading-tight">
                Let's Work
                <br />
                <span className="text-white">
                  Together
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 max-w-3xl leading-relaxed">
                But, there is no open position right now... ;(
              </p>
            </motion.div>
          </div>
        </div>

        {/* Moving Text Banner - Fixed at bottom of hero */}
        <div className="bg-green-400 py-6 md:py-8 overflow-hidden relative">
          {/* Moving Text Animation */}
          <div className="relative">
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex whitespace-nowrap"
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center">
                  {movingTextItems.map((text, index) => (
                    <div key={`${i}-${index}`} className="flex items-center">
                      <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-black tracking-tight mr-12 md:mr-16">
                        {text}
                      </span>
                      <span className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black/60 mr-12 md:mr-16">
                        ∷
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}