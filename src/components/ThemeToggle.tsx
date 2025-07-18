'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
          scale: theme === 'dark' ? 0.8 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === 'light' ? (
          <Sun size={20} className="text-neutral-700" />
        ) : (
          <Moon size={20} className="text-neutral-300" />
        )}
      </motion.div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-neutral-900/10 dark:bg-white/10"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}