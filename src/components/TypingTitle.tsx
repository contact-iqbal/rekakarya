'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

const TypingTitle: React.FC = () => {
  const { theme } = useTheme()
  const words = ['RekaKarya.', 'Innovation?']
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (isWaiting) return

    const currentWord = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        } else {
          // Word complete, wait then start deleting
          setIsWaiting(true)
          setTimeout(() => {
            setIsWaiting(false)
            setIsDeleting(true)
          }, 4000)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Deletion complete, move to next word
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 80)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, isWaiting])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-[50vh] pt-24 pb-16 px-4">
      <div className="w-full text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block relative"
        >
          {/* Background dengan ukuran tetap */}
          <div 
            className={`absolute inset-0 rounded-2xl ${
              theme === 'light' 
                ? 'bg-neutral-900' 
                : 'bg-white'
            } rounded-t-[20px]`}
            style={{
              width: '100vw',
              height: '20vw',
              minHeight: '120px',
              maxHeight: '300px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          
          {/* Teks dengan warna berkebalikan */}
          <h1
            className={`relative z-10 font-black tracking-tight leading-none whitespace-nowrap ${
              theme === 'light' 
                ? 'text-white' 
                : 'text-neutral-900'
            }`}
            style={{
              fontSize: '15vw',
              transform: 'scaleX(1)',
              transformOrigin: 'center',
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              textAlign: 'left', 
              letterSpacing: '0.02em',
              paddingLeft: '2vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              height: '20vw',
              minHeight: '120px',
              maxHeight: '300px',
            }}
          >
            <span>
              {currentText}
              <motion.span
                animate={{ opacity: showCursor ? 1 : 0 }}
                transition={{ duration: 0.1 }}
                className={theme === 'light' ? 'text-white/50' : 'text-neutral-500'}
              >
                |
              </motion.span>
            </span>
          </h1>
        </motion.div>
      </div>
    </div>
  )
}

export default TypingTitle