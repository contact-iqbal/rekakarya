'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, ArrowUp } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import ScrollOverlay from './ScrollOverlay'

export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      
      // Calculate how much content is left to scroll
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)
      
      // Only show scroll to top when very close to bottom (within 50px)
      // AND there's actually content to scroll (page is longer than viewport)
      const hasScrollableContent = scrollHeight > clientHeight
      const isAtBottom = distanceFromBottom <= 50
      
      setShowScrollTop(hasScrollableContent && isAtBottom)
    }

    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    if (isScrolling) return
    
    // Mark that we're scrolling to top
    sessionStorage.setItem('wasScrollingToTop', 'true')
    
    setIsScrolling(true)
    setShowOverlay(true)
    
    // Start scrolling after a short delay to show the overlay
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      
      // Hide overlay after scroll completes
      setTimeout(() => {
        setShowOverlay(false)
        setIsScrolling(false)
      }, 1000) // Adjust timing based on scroll duration
    }, 300)
  }

  const bubbleVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    click: {
      scale: 1.2,
      rotate: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  const glowVariants = {
    idle: {
      opacity: 0.3,
      scale: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    },
    hover: {
      opacity: 0.6,
      scale: 1.2,
      transition: {
        duration: 0.3
      }
    },
    click: {
      opacity: 0.8,
      scale: 1.4,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <>
      <ScrollOverlay 
        isVisible={showOverlay}
        variant="scrolling"
        onAnimationComplete={() => {
          // Optional: Handle animation completion
        }}
      />
      
      <div className="fixed bottom-8 right-8 pointer-events-auto z-40">
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="cursor-pointer"
      >
        {/* Outer Glow */}
        <motion.div
          variants={glowVariants}
          animate={isHovered ? 'hover' : 'idle'}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-neutral-300 via-neutral-400 to-neutral-500 dark:from-neutral-600 dark:via-neutral-700 dark:to-neutral-800 blur-xl"
        />
        
        {/* Main Bubble */}
        <motion.button
          onClick={showScrollTop ? scrollToTop : toggleTheme}
          disabled={isScrolling}
          variants={bubbleVariants}
          animate={isHovered ? 'hover' : 'idle'}
          whileTap="click"
          className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-white/90 to-white/70 dark:from-neutral-800/90 dark:to-neutral-900/70 backdrop-blur-xl border-2 border-neutral-300 dark:border-neutral-600 shadow-2xl flex items-center justify-center group overflow-hidden transition-opacity duration-300 ${
            isScrolling ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label={showScrollTop ? "Scroll to top" : "Toggle theme"}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent dark:from-transparent dark:via-neutral-700/20 dark:to-transparent" />
          
          {/* Sparkle Effects */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-neutral-400 to-neutral-600 dark:from-neutral-500 dark:to-neutral-300 rounded-full"
                style={{
                  top: '20%',
                  left: '50%',
                  transformOrigin: '0 20px',
                  transform: `rotate(${i * 60}deg)`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>

          {/* Icon with Smooth Transition */}
          <motion.div
            animate={{
              rotate: showScrollTop ? 0 : (theme === 'dark' ? 180 : 0),
              scale: showScrollTop ? 1 : (theme === 'dark' ? 0.9 : 1),
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative z-10"
          >
            <motion.div
              animate={{
                opacity: showScrollTop ? 1 : 0,
                scale: showScrollTop ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ArrowUp size={24} className="text-neutral-700 dark:text-neutral-300 drop-shadow-lg" />
            </motion.div>
            
            <motion.div
              animate={{
                opacity: showScrollTop ? 0 : 1,
                scale: showScrollTop ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              {theme === 'light' ? (
                <Sun size={24} className="text-neutral-700 dark:text-neutral-300 drop-shadow-lg" />
              ) : (
                <Moon size={24} className="text-neutral-700 dark:text-neutral-300 drop-shadow-lg" />
              )}
            </motion.div>
          </motion.div>

          {/* Ripple Effect on Click */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-neutral-400/20 via-neutral-500/20 to-neutral-600/20 dark:from-neutral-500/20 dark:via-neutral-400/20 dark:to-neutral-300/20"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 2, opacity: [0, 1, 0] }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </motion.div>
      </div>
    </>
  )
}