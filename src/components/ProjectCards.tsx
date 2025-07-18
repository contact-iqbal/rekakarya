'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  tags: string[]
  year: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout flow and advanced product filtering",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Web Development",
    tags: ["React", "Node.js", "Stripe"],
    year: "2023"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure and intuitive financial management with biometric authentication",
    image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Mobile App",
    tags: ["React Native", "Firebase", "Plaid"],
    year: "2023"
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    description: "Analytics platform with real-time insights and customizable widgets",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "UI/UX Design",
    tags: ["Figma", "D3.js", "TypeScript"],
    year: "2023"
  },
  {
    id: 4,
    title: "Food Delivery App",
    description: "Connecting restaurants with hungry customers through smart logistics",
    image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Mobile App",
    tags: ["Flutter", "Google Maps", "Socket.io"],
    year: "2023"
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Creative showcase for digital artists with interactive galleries",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Web Development",
    tags: ["Next.js", "Three.js", "Framer Motion"],
    year: "2023"
  }
]

const ProjectCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        // Check if we're anywhere within the project cards section
        // Hide navbar when section starts entering and keep hidden until it completely exits
        const isInView = rect.top <= window.innerHeight * 0.1 && rect.bottom > -100
        setIsSticky(isInView)
        
        // Always hide navbar when we're in the project cards section area
        const navbar = document.querySelector('nav')
        if (navbar) {
          if (isInView) {
            navbar.style.transform = 'translateY(-100%)'
            navbar.style.opacity = '0'
            navbar.style.pointerEvents = 'none'
            navbar.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out'
          } else {
            navbar.style.transform = 'translateY(0)'
            navbar.style.opacity = '1'
            navbar.style.pointerEvents = 'auto'
            navbar.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out'
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="bg-white dark:bg-black transition-colors duration-500">
      {/* Sticky Cards Section */}
      <div 
        ref={sectionRef}
        className="relative"
      >
        <div 
          ref={containerRef}
          className="relative h-[600vh]" // Increased height for smoother scroll
        >
          <div className={`${isSticky ? 'fixed' : 'sticky'} top-0 h-screen flex items-center justify-center w-full`}>
            <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              
              {/* Cards Stack - Much bigger cards */}
              <div className="relative w-full max-w-7xl mx-auto" style={{ aspectRatio: '16/9', height: '85vh', maxHeight: '800px' }}>
                {projects.map((project, index) => {
                  const cardProgress = useTransform(
                    scrollYProgress,
                    [index * 0.2, (index + 1) * 0.2],
                    [0, 1]
                  )
                  
                  const y = useTransform(
                    cardProgress,
                    [0, 1],
                    [0, -150]
                  )
                  
                  const scale = useTransform(
                    cardProgress,
                    [0, 1],
                    [1, 0.85]
                  )
                  
                  const opacity = useTransform(
                    cardProgress,
                    [0, 0.8, 1],
                    [1, 1, 0]
                  )

                  const rotateX = useTransform(
                    cardProgress,
                    [0, 1],
                    [0, -15]
                  )

                  return (
                    <motion.div
                      key={project.id}
                      style={{
                        y,
                        scale,
                        opacity,
                        rotateX,
                        zIndex: projects.length - index,
                        transformStyle: 'preserve-3d'
                      }}
                      className="absolute inset-0 group cursor-pointer"
                    >
                      <motion.div 
                        className="relative w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                        whileHover={{ 
                          scale: 1.02,
                          rotateY: 2,
                          rotateX: -2,
                          transition: { duration: 0.3, ease: "easeOut" }
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Image Container - 60% height */}
                        <div className="relative h-[60%] overflow-hidden">
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            style={{ 
                              filter: 'grayscale(100%) contrast(1.2) brightness(0.9)',
                              transition: 'filter 0.5s ease'
                            }}
                            whileHover={{ 
                              filter: 'grayscale(0%) contrast(1) brightness(1)',
                              scale: 1.05,
                              transition: { duration: 0.5, ease: "easeOut" }
                            }}
                          />
                          
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          
                          {/* Category Badge */}
                          <motion.div 
                            className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="text-xs sm:text-sm font-bold text-white px-3 sm:px-4 py-1.5 sm:py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/30">
                              {project.category}
                            </span>
                          </motion.div>


                          {/* Action Buttons */}
                          <motion.div 
                            className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex space-x-2 sm:space-x-3"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors border border-white/30"
                            >
                              <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors border border-white/30"
                            >
                              <Github size={16} className="sm:w-5 sm:h-5" />
                            </motion.button>
                          </motion.div>
                        </div>
                        
                        {/* Content Section - 40% height */}
                        <div className="h-[40%] p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between">
                          <div className="flex-1">
                            <motion.h3 
                              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-black dark:text-white mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              {project.title}
                            </motion.h3>
                            <motion.p 
                              className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              {project.description}
                            </motion.p>
                          </div>
                          
                          {/* Tags and CTA */}
                          <motion.div 
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag, tagIndex) => (
                                <motion.span
                                  key={tagIndex}
                                  className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400 px-2 sm:px-3 py-1 sm:py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-md sm:rounded-lg"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {tag}
                                </motion.span>
                              ))}
                            </div>
                            
                            <div className="flex gap-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-black dark:bg-white text-white dark:text-black text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                              >
                                Choose Template
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-black dark:border-white text-black dark:text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                              >
                                Visit
                              </motion.button>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Add more spacing after project cards */}
      <div className="h-32 md:h-48 lg:h-64"></div>
    </section>
  )
}

export default ProjectCards