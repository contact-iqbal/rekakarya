'use client'

import { useEffect, useRef, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ScrollOverlay from '@/components/ScrollOverlay'
import { ArrowUpRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { Tilt } from 'react-tilt'
import ProjectCards from '@/components/ProjectCards'
import TestimonialsSection from '@/components/TestimonialsSection'

// Typing animation hook
function useTypingAnimation(words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000, rekaKaryaPauseTime = 4000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const currentWord = words[currentWordIndex]
    const isRekaKarya = currentWord === 'RekaKarya.'
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        } else {
          // Word complete, pause then start deleting
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, isRekaKarya ? rekaKaryaPauseTime : pauseTime)
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
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime, rekaKaryaPauseTime, isPaused])

  return currentText
}

export default function Home() {
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const [isStartupsHovered, setIsStartupsHovered] = useState(false)
  
  // Typing animation for "Digital" word
  const typingWords = ['Digital', 'Easy', 'RekaKarya.']
  const typedText = useTypingAnimation(typingWords, 80, 50, 1200, 6000)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300 relative overflow-hidden">
      <Navigation />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-between px-8 md:px-16 lg:px-24 pt-24 pb-16">
          {/* Left Content */}
          <motion.div 
            className="flex-1 max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <br/>
            <br/>
            {/* Main Heading with Typing Animation */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-neutral-900 dark:text-white tight-heading mb-12 tracking-tight">
              <span className="inline-block min-w-[200px] md:min-w-[300px] lg:min-w-[400px]">
                <span className="font-black">{typedText}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
                  className="text-neutral-500 dark:text-neutral-400"
                >
                  |
                </motion.span>
              </span>
              <br className="leading-none" />
              <span className="text-neutral-700 dark:text-neutral-300 text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="inline-block transform translate-y-[-0.3em]">solution for</span>{' '}
                <span 
                  className="relative inline-block cursor-pointer"
                  onMouseEnter={() => setIsStartupsHovered(true)}
                  onMouseLeave={() => setIsStartupsHovered(false)}
                >
                  <div className="inline-block overflow-hidden" style={{ height: '1.2em' }}>
                    <motion.span
                      animate={{ 
                        y: isStartupsHovered ? '-100%' : '0%',
                        opacity: isStartupsHovered ? 0 : 1
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="inline-block"
                    >
                      startups
                    </motion.span>
                    <motion.span
                      animate={{ 
                        y: isStartupsHovered ? '0%' : '100%',
                        opacity: isStartupsHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute left-0 top-0 inline-block"
                    >
                      w/lander
                    </motion.span>
                  </div>
                </span>
              </span>
            </h1>
            
            {/* Main Heading without Animation */}
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-neutral-900 dark:text-white leading-none mb-12 tracking-tight hidden"
              variants={itemVariants}
            >
              Digital Solutions
              <br />
              <span className="text-neutral-700 dark:text-neutral-300">
                for Startups
              </span>
            </motion.h1>
            
            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-6"
              variants={containerVariants}
            >
              <motion.button 
                className="group flex items-center gap-3 text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                variants={buttonVariants}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
               onClick={() => window.location.href = '/order/choose-domain'}
              >
                <span className="text-lg md:text-xl font-medium border-b-4 border-black dark:border-white group-hover:border-neutral-600 dark:group-hover:border-neutral-400 transition-colors pb-1">
                  Start Your Project
                </span>
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                className="group flex items-center gap-3 text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                variants={buttonVariants}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
               onClick={() => window.location.href = '/services'}
              >
                <span className="text-lg md:text-xl font-medium border-b-4 border-black dark:border-white group-hover:border-neutral-600 dark:group-hover:border-neutral-400 transition-colors pb-1">
                  Our services
                </span>
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Project Card with 3D Tilt */}
          <motion.div 
            className="hidden lg:block ml-16"
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ 
              duration: 1, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.8 
            }}
          >
            <Tilt
              options={{
                max: 8,
                scale: 1.02,
                speed: 800,
                glare: true,
                'max-glare': 0.1,
                gyroscope: true,
                reset: false
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                animation: 'continuousTilt 8s ease-in-out infinite'
              }}
            >
              <div 
                className="bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-2xl p-6 w-80 border-4 border-black dark:border-white shadow-2xl"
                style={{ transform: 'translateZ(50px)' }}
              >
                {/* Domain Search Header */}
                <div 
                  className="mb-6"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    Find Your Domain
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Search for the perfect domain name
                  </p>
                </div>

                {/* Search Input */}
                <div 
                  className="relative mb-4"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <input
                    type="text"
                    placeholder="Enter domain name..."
                    className="w-full px-4 py-3 bg-white dark:bg-neutral-700 border-3 border-black dark:border-white rounded-xl text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 focus:border-transparent transition-all duration-200"
                   onClick={() => {
                     const domainInput = document.querySelector('input[placeholder="Enter domain name..."]') as HTMLInputElement;
                     const domainValue = domainInput?.value?.trim();
                     if (domainValue) {
                       // Store the domain search term and redirect to order page
                       sessionStorage.setItem('domainSearchTerm', domainValue);
                       window.location.href = '/order/choose-domain';
                     } else {
                       // If no domain entered, just go to order page
                       window.location.href = '/order/choose-domain';
                     }
                   }}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg flex items-center justify-center hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                {/* Domain Extensions */}
                <div 
                  className="flex flex-wrap gap-2 mb-4"
                  style={{ transform: 'translateZ(35px)' }}
                >
                  {['.com', '.net', '.org', '.io'].map((ext) => (
                    <button
                      key={ext}
                      className="px-3 py-1.5 text-xs font-medium bg-neutral-200/50 dark:bg-neutral-600/50 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-300/50 dark:hover:bg-neutral-500/50 transition-colors border border-neutral-300/50 dark:border-neutral-500/50"
                    >
                      {ext}
                    </button>
                  ))}
                </div>

                {/* Search Button */}
                <button 
                  className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium py-3 rounded-xl border-3 border-black dark:border-white hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <span>Search Domain</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </Tilt>
          </motion.div>
        </div>
        
        {/* Bottom Stats Section with Count Up Animation */}
        <div className="px-8 md:px-16 lg:px-24 pb-16 pt-8">
          <motion.div 
            ref={statsRef}
            className="bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border-4 border-black dark:border-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Stat 1 */}
              <div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-2">
                  {isStatsInView && (
                    <CountUp
                      start={0}
                      end={150}
                      duration={2.5}
                      delay={0.5}
                      suffix="+"
                      useEasing={true}
                      separator=","
                    />
                  )}
                  {!isStatsInView && "150+"}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                  Successful projects<br />delivered worldwide
                </p>
              </div>
              
              {/* Stat 2 */}
              <div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-2">
                  {isStatsInView && (
                    <CountUp
                      start={0}
                      end={50}
                      duration={2.5}
                      delay={0.7}
                      suffix="+"
                      useEasing={true}
                    />
                  )}
                  {!isStatsInView && "50+"}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                  Startups launched<br />and scaled
                </p>
              </div>
              
              {/* Stat 3 */}
              <div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-2">
                  {isStatsInView ? "24/7" : "24/7"}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                  Support & maintenance<br />for your digital products
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* About Section */}
      <section id="our-story" className="bg-white dark:bg-neutral-900 py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left Column - Title */}
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-8 flex items-center gap-4">
                <span className="group relative cursor-pointer">
                  Our Story
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-900 dark:bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
                </span>
                <div style={{ transform: 'rotate(90deg)' }}>
                  <ArrowUpRight size={48} className="text-neutral-600 dark:text-neutral-400" />
                </div>
              </h2>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              {/* Main Story Text */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Our founder, John started RekaKarya because he wanted to make it easy for anyone to do what he does: create exceptional digital experiences that drive real business results.
                </p>
                
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  He wanted to make sure that those he served alongside during his time in the tech industry would have the same opportunity to build wealth as those with technical degrees and development licenses. This vision extended to helping small businesses, college students, freelancers, creative agencies, and everyone in between save toward what matters most to them from the comfort of their digital presence.
                </p>
                
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Creating digital solutions is a great option for anyone looking to build long-term success that can stand up to risk and market volatility. The RekaKarya team is united around our core philosophy: innovate, and let compound creativity do the rest.
                </p>
              </div>

              {/* Founder Quote Card */}
              <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-8 border-4 border-black dark:border-white">
                {/* Founder Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-neutral-400 to-neutral-600 dark:from-neutral-500 dark:to-neutral-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white">John Doe</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Founder & CEO</p>
                  </div>
                </div>
                
                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                  "Our goal is to build a better digital ecosystem for the individual entrepreneur — one that is simpler, more reliable, lower cost and transparent."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Cards Section */}
      <ProjectCards />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Why Choose Us Section */}
      <section className="bg-neutral-50 dark:bg-neutral-900 py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-20 transition-colors duration-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 md:mb-20 lg:mb-24"
          >
            <div className="inline-block mb-6">
              <span className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-medium px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-full backdrop-blur-sm bg-neutral-100/50 dark:bg-neutral-800/50">
                Why Partner With Us
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
              We Don't Just Build
              <br />
              <span className="relative inline-block">
                We Transform
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                  className="absolute bottom-2 left-0 right-0 h-1 bg-neutral-900 dark:bg-white origin-left"
                />
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Every project is a partnership. We combine strategic thinking with creative execution 
              to deliver solutions that don't just meet expectations—they exceed them.
            </p>
          </motion.div>

          {/* Features Grid - Styled like the image */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20">
            {/* Card 1 - Expert Team */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-8 border-4 border-black dark:border-white hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 border-4 border-black dark:border-white rounded-full flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-neutral-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                Expert Team
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
                Work with seasoned developers and designers who bring years of real-world experience to every project, delivering cutting-edge web solutions using the latest technologies and industry best practices.
              </p>
            </motion.div>

            {/* Card 2 - Career-Boost Results */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-8 border-4 border-black dark:border-white hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 border-4 border-black dark:border-white rounded-full flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-neutral-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                Business-Boost Results
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
                Get websites and applications that drive real business growth, helping you increase conversions, enhance user engagement, and establish a strong digital presence that opens doors to new opportunities.
              </p>
            </motion.div>

            {/* Card 3 - Featured Card with CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-3xl p-8 border-4 border-black dark:border-white hover:shadow-2xl transition-all duration-300 row-span-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 border-4 border-white dark:border-black rounded-full flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-white dark:text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                Flexible Development Process
              </h3>
              
              <p className="text-white/80 dark:text-neutral-700 leading-relaxed text-base mb-8">
                At RekaKarya, we understand the importance of balancing development with your business needs. That's why our development process is flexible and collaborative, allowing you to stay involved at your own pace, anytime and anywhere.
              </p>
              
              <p className="text-white/70 dark:text-neutral-600 leading-relaxed text-base mb-10">
                Whether you're a startup founder or an established business owner, you can customize our collaboration to fit your timeline and requirements.
              </p>
              
              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/order/choose-domain'}
                className="group relative overflow-hidden bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl border-4 border-white dark:border-black transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
              >
                <span>Build Website</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                
                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1.5, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </motion.div>

            {/* Card 4 - High Impact Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="bg-neutral-100 dark:bg-neutral-800 rounded-3xl p-8 border-4 border-black dark:border-white hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 border-4 border-black dark:border-white rounded-full flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-neutral-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                100+ High Impact Projects
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base">
                RekaKarya has delivered over 100 successful projects that cover essential needs in today's digital landscape. Whether you're a startup or an established business, our expertise in web development, mobile apps, and digital experiences provides practical, results-driven solutions that you can launch immediately & competitively.
              </p>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-neutral-900 dark:bg-white rounded-3xl p-8 md:p-12 mb-16 md:mb-20 border-4 border-black dark:border-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "99%", label: "Client Satisfaction", sublabel: "Based on 150+ projects" },
                { value: "48h", label: "Average Delivery", sublabel: "From concept to launch" },
                { value: "24/7", label: "Support Available", sublabel: "Always here for you" },
                { value: "100%", label: "Money Back", sublabel: "If not satisfied" }
              ].map((stat, index) => (
                <div key={index} className="relative">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white dark:text-neutral-900 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-white/80 dark:text-neutral-700 font-semibold mb-1">
                    {stat.label}
                  </p>
                  <p className="text-white/60 dark:text-neutral-500 text-sm">
                    {stat.sublabel}
                  </p>
                  
                  {/* Separator Line */}
                  {index < 3 && (
                    <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-white/20 dark:bg-neutral-700" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-full opacity-50" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full opacity-60" />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full opacity-40" />
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full opacity-50" />
      </section>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Overlays */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-neutral-200/20 dark:from-neutral-700/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-neutral-300/20 dark:from-neutral-800/20 to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-600 rounded-full"></div>
      </div>

      <Footer />
    </div>
  )
}