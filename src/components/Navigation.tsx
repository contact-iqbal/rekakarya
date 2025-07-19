'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ArrowRight, Sparkles, Code, Palette, Users, Briefcase, Phone, Award, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const MotionLink = motion(Link)

interface DropdownItem {
  label: string
  href: string
  description?: string
  icon?: React.ReactNode
  badge?: string
}

interface NavItem {
  path: string
  label: string
  number: string
  dropdown?: DropdownItem[]
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const [showRightSide, setShowRightSide] = useState(false)
  const pathname = usePathname()

  // Hide navbar on order pages
  const isOrderPage = pathname.startsWith('/order/')
  
  if (isOrderPage) {
    return null
  }
  const navItems: NavItem[] = [
    { path: '/', label: 'Home', number: '01' },
    { path: '/product', label: 'Product', number: '02' },
    { path: '/services', label: 'Services', number: '03' },
    { path: '/faq', label: 'FAQ', number: '04' },
    { 
      path: '/careers', 
      label: 'Careers', 
      number: '05',
      dropdown: [
        { 
          label: 'Open Positions', 
          href: '/careers#positions', 
          description: 'Current job opportunities',
          icon: <Briefcase size={18} />,
        },
        { 
          label: 'Internships', 
          href: '/careers#internships', 
          description: 'Student and graduate programs',
          icon: <Users size={18} />
        },
        { 
          label: 'Culture & Benefits', 
          href: '/careers#benefits', 
          description: 'Why work with us',
          icon: <Award size={18} />
        },
        { 
          label: 'Application Process', 
          href: '/careers#process', 
          description: 'How to apply and what to expect',
          icon: <Code size={18} />,
        }
      ]
    },
  ]

  const menuVariants = {
    closed: {
      clipPath: "circle(0% at 95% 5%)",
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    open: {
      clipPath: "circle(150% at 95% 5%)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    closed: {
      y: 80,
      opacity: 0,
      transition: {
        duration: 0.4
      }
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const handleMouseEnter = (label: string) => {
    setHoveredDropdown(label)
  }

  const handleMouseLeave = () => {
    setHoveredDropdown(null)
  }

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setActiveDropdown(null)
        setHoveredDropdown(null)
        setShowRightSide(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      
      // Delay showing right side by 1.5 seconds
      const timer = setTimeout(() => {
        setShowRightSide(true)
      }, 1500)
      
      return () => {
        clearTimeout(timer)
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    } else {
      document.body.style.overflow = 'unset'
      setShowRightSide(false)
    }

  }, [isOpen])

  return (
    <>
      {/* Fixed Header - Hidden when menu is open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-12 left-4 right-4 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg transition-all duration-500 ease-in-out"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="flex items-center justify-between h-16 md:h-20">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link href="/" className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                    RekaKarya<span className="text-neutral-400 dark:text-neutral-500">.</span>
                  </Link>
                </motion.div>

                <div className="flex items-center space-x-4">
                  {/* Menu Button */}
                  <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl shadow-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-300"
                    aria-label="Toggle menu"
                  >
                    <Menu size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black"
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors duration-300 z-10"
              aria-label="Close menu"
            >
              <X size={20} />
            </motion.button>

            <div className="h-full flex">
              {/* Desktop Layout */}
              <div className="hidden md:flex w-full">
                {/* Left Side - Navigation (60%) */}
                <motion.div 
                  animate={{
                    width: !showRightSide ? '100%' : (hoveredDropdown ? '50%' : '60%')
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex flex-col justify-center p-12"
                >
                  <motion.div variants={itemVariants} className="mb-12">
                    <h2 className="text-6xl font-black text-white mb-4 tracking-tight">
                      RekaKarya<span className="text-neutral-400 dark:text-neutral-500">.</span>
                    </h2>
                    <p className="text-white/60 text-lg">
                      Explore our digital universe
                    </p>
                  </motion.div>

                  <motion.div variants={containerVariants} className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        variants={itemVariants}
                        custom={index}
                      >
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center justify-between py-4 px-6 rounded-2xl border-3 border-transparent hover:border-white/30 transition-all duration-300 ${
                            pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/')
                              ? 'bg-white text-neutral-900'
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <span className={`text-sm font-mono ${
                              pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/') ? 'text-neutral-500' : 'text-white/50'
                            }`}>
                              {item.number}
                            </span>
                            <span className="text-2xl font-bold tracking-tight">
                              {item.label}
                            </span>
                          </div>
                          <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Side - Dropdown & Info (40%) */}
                <motion.div 
                  animate={{
                    width: !showRightSide ? '0%' : (hoveredDropdown ? '50%' : '40%'),
                    x: !showRightSide ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="flex flex-col justify-center p-12 bg-white/5 overflow-hidden"
                  onMouseLeave={handleMouseLeave}
                >
                  <AnimatePresence mode="wait">
                    {showRightSide && (
                    (activeDropdown || hoveredDropdown) ? (
                      <motion.div
                        key={activeDropdown || hoveredDropdown}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {activeDropdown || hoveredDropdown}
                          </h3>
                          <p className="text-white/60 text-sm">
                            Choose from our specialized services
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          {navItems.find(item => item.label === (activeDropdown || hoveredDropdown))?.dropdown?.map((dropdownItem, index) => (
                            <motion.div
                              key={dropdownItem.href}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.2 }}
                            >
                              <Link
                                href={dropdownItem.href}
                                onClick={() => {
                                  setIsOpen(false)
                                  setActiveDropdown(null)
                                  setHoveredDropdown(null)
                                  setShowRightSide(false)
                                }}
                                className="group flex items-start space-x-4 p-4 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                              >
                                <div className="text-white/60 group-hover:text-white/80 transition-colors mt-1">
                                  {dropdownItem.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold flex items-center space-x-3 mb-1">
                                    <span>{dropdownItem.label}</span>
                                  </div>
                                  <div className="text-sm text-white/50 leading-relaxed">
                                    {dropdownItem.description}
                                  </div>
                                </div>
                                <ArrowRight size={16} className="text-white/40 group-hover:text-white/60 transition-colors mt-1" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-4xl font-bold text-white mb-4">
                            Let's Create Something Amazing
                          </h3>
                          <p className="text-white/70 text-lg leading-relaxed">
                            Ready to transform your ideas into exceptional digital experiences? 
                            Let's collaborate and bring your vision to life.
                          </p>
                        </div>
                        
                        <div className="space-y-4">
                          <MotionLink
                            href="/product"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-3 text-white hover:text-white/80 transition-colors group"
                            whileHover={{ scale: 1.05, x: 10 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-lg font-semibold">Start a Project</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </MotionLink>
                          
                          <MotionLink
                            href="/product"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors group"
                            whileHover={{ scale: 1.05, x: 10 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-lg font-semibold">View Our Work</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </MotionLink>
                          
                          <MotionLink
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors group"
                            whileHover={{ scale: 1.05, x: 10 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-lg font-semibold">Contact Us</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </MotionLink>
                        </div>

                      </motion.div>
                    )
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden h-full flex flex-col p-6 pt-20 pb-6 w-full">
                {/* Logo */}
                <motion.div variants={itemVariants} className="mb-8">
                  <Link 
                    href="/" 
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-black text-white tracking-tight"
                  >
                    RekaKarya<span className="text-white/50">.</span>
                  </Link>
                </motion.div>

                {/* Navigation Items */}
                <div className="flex-1 flex flex-col justify-center min-h-0 overflow-y-auto">
                  <motion.div variants={containerVariants} className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        variants={itemVariants}
                        custom={index}
                      >
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center justify-between py-3 px-4 rounded-xl border-3 border-transparent hover:border-white/30 transition-all duration-300 ${
                            pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/')
                              ? 'bg-white text-neutral-900'
                              : 'text-white hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className={`text-xs font-mono ${
                              pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/') ? 'text-neutral-500' : 'text-white/50'
                            }`}>
                              {item.number}
                            </span>
                            <span className="text-xl font-bold tracking-tight">
                              {item.label}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Bottom Section */}
                <div className="space-y-6 mt-8 border-t border-white/20 pt-6">
                  <motion.div variants={itemVariants} className="text-center">
                    <p className="text-white/50 text-xs">
                      © 2025 RekaKarya
                    </p>
                    <p className="text-white/30 text-xs">
                      Made with ❤️
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation