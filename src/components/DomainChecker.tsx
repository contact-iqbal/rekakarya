'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Globe, CheckCircle, XCircle, Loader2, ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react'

interface DomainResult {
  domain: string
  available: boolean
  price?: string
  registrar?: string
  error?: string
  extension: string // Added extension property
}

const DomainChecker: React.FC = () => {
  const [domain, setDomain] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [results, setResults] = useState<DomainResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const popularTLDs = ['.com', '.net', '.org', '.io', '.co', '.dev', '.app', '.tech']

  const checkDomainAvailability = async (domainName: string, tld: string): Promise<DomainResult> => {
    const fullDomain = `${domainName}${tld}`
    
    // Simulate domain availability check with realistic results
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000)) // Random delay
    
    const isAvailable = Math.random() > 0.6 // 40% chance of being available
    
    return {
      domain: fullDomain,
      available: isAvailable,
      price: isAvailable ? `$${Math.floor(Math.random() * 20) + 10}.99/year` : undefined,
      registrar: isAvailable ? 'Available for registration' : 'Registered',
      extension: tld // Set the extension property
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!domain.trim()) return

    setIsChecking(true)
    setHasSearched(true)
    setResults([])

    // Clean domain name (remove any existing TLD)
    const cleanDomain = domain.toLowerCase().replace(/\.(com|net|org|io|co|dev|app|tech)$/, '')

    try {
      // Check all popular TLDs
      const promises = popularTLDs.map(tld => checkDomainAvailability(cleanDomain, tld))
      const domainResults = await Promise.all(promises)
      
      setResults(domainResults)
    } catch (error) {
      console.error('Error checking domains:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
          {/* Left Section - Search */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                Search Your Domain
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enter your desired domain name and we'll check availability across all popular extensions.
              </p>
            </div>

            {/* Enhanced Search Form */}
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500 w-5 h-5 z-10" />
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain name..."
                    className="w-full pl-16 pr-6 py-6 text-lg font-medium bg-white dark:bg-neutral-800 border-4 border-black dark:border-white rounded-2xl focus:border-neutral-400 dark:focus:border-neutral-500 focus:outline-none transition-all duration-300 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 shadow-sm hover:shadow-md focus:shadow-lg relative z-10"
                    disabled={isChecking}
                  />
                </div>
              </div>

              {/* Enhanced Search Button */}
              <motion.button
                type="submit"
                disabled={isChecking || !domain.trim()}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-neutral-100 dark:to-neutral-200 text-white dark:text-neutral-900 py-6 rounded-2xl border-4 border-black dark:border-white font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:hover:scale-100 disabled:hover:y-0"
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-700 dark:from-neutral-200 dark:to-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button Content */}
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isChecking ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Checking Domains...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Check Availability</span>
                      <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    </>
                  )}
                </div>

                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 dark:bg-black/20 rounded-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1.5, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </form>

            {/* Popular TLDs Info */}
            <div className="space-y-4">
              <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                We check these popular extensions:
              </p>
              <div className="flex flex-wrap gap-2">
                {popularTLDs.map((tld) => (
                  <motion.span
                    key={tld}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors cursor-default"
                  >
                    {tld}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Section - Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                Results
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {hasSearched ? 'Domain availability results:' : 'Search results will appear here.'}
              </p>
            </div>

            {/* Results Container */}
            <div className="min-h-[400px] bg-white dark:bg-neutral-800 rounded-2xl border-4 border-black dark:border-white p-6 shadow-sm">
              <AnimatePresence mode="wait">
                {!hasSearched ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center py-16"
                  >
                    <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                      Enter a domain name to check availability
                    </p>
                    
                    {/* Main CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.href = '/order/choose-domain'}
                      className="mt-6 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl border-3 border-black dark:border-white hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center gap-2 mx-auto"
                    >
                      <span>Start Domain Search</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ) : isChecking ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center py-16"
                  >
                    <Loader2 className="w-12 h-12 animate-spin text-neutral-500 dark:text-neutral-400 mb-4" />
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg font-medium">
                      Checking domain availability...
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-500 text-sm mt-2">
                      This may take a few seconds
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-3"
                  >
                    {results.map((result, index) => (
                      <motion.div
                        key={result.domain}
                        variants={itemVariants}
                        custom={index}
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                          result.available
                            ? 'bg-green-50 dark:bg-green-900/20 border-4 border-green-600 dark:border-green-400 hover:border-green-700 dark:hover:border-green-300'
                            : 'bg-neutral-50 dark:bg-neutral-700/50 border-4 border-neutral-400 dark:border-neutral-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            {result.available ? (
                              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <h4 className="font-bold text-neutral-900 dark:text-white">
                                {result.domain}
                              </h4>
                              <p className={`text-sm ${
                                result.available 
                                  ? 'text-green-600 dark:text-green-400' 
                                  : 'text-neutral-500 dark:text-neutral-400'
                              }`}>
                                {result.available ? 'Available' : 'Taken'}
                                {result.price && ` • ${result.price}`}
                              </p>
                            </div>
                          </div>
                          
                          {result.available && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                             onClick={() => {
                               // Store domain info and redirect to order page
                               sessionStorage.setItem('domainSearchTerm', `${result.domain}${result.extension}`);
                               window.location.href = '/order/choose-domain';
                             }}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2 flex-shrink-0"
                            >
                              <span>Register</span>
                              <ExternalLink className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                        
                        {result.error && (
                          <p className="text-amber-600 dark:text-amber-400 text-xs mt-2">
                            {result.error}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DomainChecker