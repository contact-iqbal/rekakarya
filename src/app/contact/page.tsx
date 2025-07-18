'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { Mail, Phone, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black dark:bg-black transition-colors duration-300 relative overflow-hidden">
      <Navigation />
      
      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black opacity-95" />
        
        {/* Subtle light rays */}
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-b from-cyan-500/10 via-cyan-400/5 to-transparent blur-3xl transform rotate-45" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-t from-blue-500/8 via-blue-400/4 to-transparent blur-3xl" />
        
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-40 w-full min-h-screen flex items-center">
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full items-center">
            
            {/* Left Side - Additional Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                LET'S WORK
                <br />
                <span className="text-white/80">TOGETHER</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                Ready to transform your ideas into exceptional digital experiences? 
                Let's collaborate and bring your vision to life.
              </p>
            </motion.div>

            {/* Right Side - Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Get In Touch
                </h3>
                <p className="text-white/60 text-base leading-relaxed">
                  Choose your preferred way to reach us
                </p>
              </div>
              
              {/* Contact Methods */}
              <div className="space-y-6">
                {/* Email */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Mail size={20} className="text-white/80" />
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm font-medium mb-1 uppercase tracking-wider">Email</h4>
                    <a 
                      href="mailto:hello@rekakarya.com" 
                      className="text-white/90 hover:text-white transition-colors text-lg font-medium"
                    >
                      hello@rekakarya.com
                    </a>
                  </div>
                </motion.div>
              
                {/* Phone */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone size={20} className="text-white/80" />
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm font-medium mb-1 uppercase tracking-wider">Phone</h4>
                    <a 
                      href="tel:+15551234567" 
                      className="text-white/90 hover:text-white transition-colors text-lg font-medium"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </motion.div>
                
                {/* WhatsApp */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <MessageCircle size={20} className="text-white/80" />
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm font-medium mb-1 uppercase tracking-wider">WhatsApp</h4>
                    <a 
                      href="https://wa.me/15551234567" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-white transition-colors text-lg font-medium"
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </motion.div>
              
                {/* Social Links */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm font-medium mb-1 uppercase tracking-wider">Social</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="text-white/90 hover:text-white transition-colors text-lg font-medium">
                        Instagram
                      </a>
                      <span className="text-white/30">•</span>
                      <a href="#" className="text-white/90 hover:text-white transition-colors text-lg font-medium">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}