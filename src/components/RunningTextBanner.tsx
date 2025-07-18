'use client'

import React from 'react'
import { motion } from 'framer-motion'

const RunningTextBanner: React.FC = () => {
  const contactText = "WhatsApp number: 085746113606 • Email: farisikbal304@gmail.com"
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white py-2 overflow-hidden">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex whitespace-nowrap"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="text-sm font-medium tracking-wide mr-16">
              {contactText}
            </span>
            <span className="text-sm text-white/60 mr-16">
              •
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default RunningTextBanner