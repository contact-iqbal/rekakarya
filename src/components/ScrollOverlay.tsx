'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScrollOverlayProps {
  isVisible: boolean
  onAnimationComplete?: () => void
  variant?: 'scrolling' | 'reached-top'
}

const ScrollOverlay: React.FC<ScrollOverlayProps> = ({ 
  isVisible, 
  onAnimationComplete,
  variant = 'scrolling'
}) => {
  const overlayVariants = {
    hidden: {
      clipPath: "circle(0% at 95% 5%)",
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    visible: {
      clipPath: "circle(150% at 95% 5%)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  // Different gradient based on variant
  const getBackgroundGradient = () => {
    if (variant === 'reached-top') {
      return 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900'
    }
    return 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-black'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onAnimationComplete={onAnimationComplete}
          className={`fixed inset-0 z-[100] ${getBackgroundGradient()}`}
        >
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Grid Pattern */}
            <motion.div
              animate={{
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />

            {/* Floating subtle particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  y: [0, -50, 0],
                  x: [0, Math.random() * 100 - 50, 0]
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}

            {/* Gradient orbs for depth */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: 360
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
              className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl ${
                variant === 'reached-top' 
                  ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20'
                  : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
              }`}
            />
            <motion.div
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.1, 0.2, 0.1],
                rotate: -360
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl ${
                variant === 'reached-top'
                  ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20'
                  : 'bg-gradient-to-r from-indigo-500/10 to-cyan-500/10'
              }`}
            />
          </div>

          {/* Minimal center element - just a subtle pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-white/40 rounded-full"
            />
          </div>

          {/* Corner decorative elements */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-8 left-8 w-6 h-6 border border-white/20 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.1, 1, 1.1]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-8 right-8 w-4 h-4 border border-white/15 rounded-full"
          />
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-8 left-8 w-3 h-3 bg-white/10 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-8 right-8 w-8 h-8 border border-white/25 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollOverlay