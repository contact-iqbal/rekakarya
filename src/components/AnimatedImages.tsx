'use client'

import React from 'react'
import { motion } from 'framer-motion'

const AnimatedImages: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Image 1 - Top left area */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -15 }}
        animate={{ scale: 1, opacity: 0.6, rotate: -10 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-32 left-16"
      >
        <img 
          src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=400" 
          alt="3D Abstract Shape"
          className="w-28 h-28 object-cover rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110 rotate-12"
        />
      </motion.div>
      
      {/* Image 2 - Right side middle */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: 20 }}
        animate={{ scale: 1, opacity: 0.5, rotate: 15 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute top-1/2 right-20 transform -translate-y-1/2"
      >
        <img 
          src="https://images.pexels.com/photos/7130545/pexels-photo-7130545.jpeg?auto=compress&cs=tinysrgb&w=400" 
          alt="3D Abstract Design"
          className="w-32 h-32 object-cover rounded-xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110 -rotate-6"
        />
      </motion.div>
      
      {/* Image 3 - Bottom left */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -25 }}
        animate={{ scale: 1, opacity: 0.7, rotate: -20 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-40 left-12"
      >
        <img 
          src="https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?auto=compress&cs=tinysrgb&w=400" 
          alt="3D Minimal Object"
          className="w-24 h-24 object-cover rounded-2xl shadow-xl grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110 rotate-45"
        />
      </motion.div>
      
      {/* Image 4 - Top right corner */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: 30 }}
        animate={{ scale: 1, opacity: 0.4, rotate: 25 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-24 right-12"
      >
        <img 
          src="https://images.pexels.com/photos/7130471/pexels-photo-7130471.jpeg?auto=compress&cs=tinysrgb&w=400" 
          alt="3D Modern Shape"
          className="w-20 h-20 object-cover rounded-xl shadow-xl grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110 -rotate-12"
        />
      </motion.div>
    </div>
  )
}

export default AnimatedImages