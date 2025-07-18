'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

const CookieNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookies-accepted')
    
    if (!hasAcceptedCookies) {
      // Show notification after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true')
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.6 
          }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 lg:left-auto lg:right-8 lg:max-w-md z-50"
        >
          <div className="bg-neutral-100/95 dark:bg-neutral-800/95 backdrop-blur-xl border border-neutral-300/50 dark:border-neutral-600/50 rounded-xl shadow-lg p-4">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>

            {/* Content */}

            <div className="pr-6">
              <div className="flex items-center space-x-2 mb-3">
                <Cookie size={18} className="text-neutral-600 dark:text-neutral-400" />
                <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                  This site uses cookies
                </h3>
              </div>

                {/* Accept Button */}
                <motion.button
                  onClick={handleAccept}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-neutral-700 dark:bg-neutral-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-500 transition-colors duration-200"
                >
                  Accept
                </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieNotification