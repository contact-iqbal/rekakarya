'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowRight, 
  Star,
  Shield,
  Zap,
  Clock,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface DomainResult {
  domain: string
  extension: string
  available: boolean
  price: number
  originalPrice?: number
  popular?: boolean
  recommended?: boolean
  description?: string
}

interface DomainCategory {
  name: string
  extensions: string[]
  description: string
}

const domainCategories: DomainCategory[] = [
  {
    name: "Popular",
    extensions: ['.com', '.net', '.org', '.info'],
    description: "Most trusted and widely recognized domains"
  },
  {
    name: "Tech",
    extensions: ['.io', '.dev', '.tech', '.app'],
    description: "Perfect for technology and startup companies"
  },
  {
    name: "Business",
    extensions: ['.co', '.biz', '.pro', '.company'],
    description: "Professional domains for business use"
  },
  {
    name: "Creative",
    extensions: ['.design', '.studio', '.art', '.creative'],
    description: "Ideal for creative professionals and agencies"
  }
]

const features = [
  {
    icon: <Shield size={20} />,
    title: "Free SSL Certificate",
    description: "Secure your website with HTTPS"
  },
  {
    icon: <Zap size={20} />,
    title: "Fast DNS Management",
    description: "Lightning-fast domain resolution"
  },
  {
    icon: <Clock size={20} />,
    title: "24/7 Support",
    description: "Round-the-clock technical assistance"
  }
]

export default function ChooseDomainPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<DomainResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<DomainResult | null>(null)
  const [activeCategory, setActiveCategory] = useState('Popular')
  const [showAllCategories, setShowAllCategories] = useState(false)

  // Auto-fill search term from homepage if available
  useEffect(() => {
    const savedSearchTerm = sessionStorage.getItem('domainSearchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      // Auto-search if domain term was passed from homepage
      searchDomains(savedSearchTerm);
      // Clear the session storage
      sessionStorage.removeItem('domainSearchTerm');
    }
  }, []);

  // Simulate domain search
  const searchDomains = async (domainName: string) => {
    setIsSearching(true)
    setHasSearched(true)
    
    // Clean domain name
    const cleanDomain = domainName.toLowerCase().replace(/\.(com|net|org|io|co|dev|app|tech|info|biz|pro|company|design|studio|art|creative)$/, '')
    
    // Get all extensions from all categories
    const allExtensions = domainCategories.flatMap(cat => cat.extensions)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const results: DomainResult[] = allExtensions.map(ext => {
      const isAvailable = Math.random() > 0.4 // 60% chance available
      const basePrice = getBasePriceForExtension(ext)
      const hasDiscount = Math.random() > 0.7 // 30% chance of discount
      
      return {
        domain: cleanDomain,
        extension: ext,
        available: isAvailable,
        price: hasDiscount ? Math.round(basePrice * 0.8) : basePrice,
        originalPrice: hasDiscount ? basePrice : undefined,
        popular: ['.com', '.net', '.org'].includes(ext),
        recommended: ext === '.com' && isAvailable,
        description: getDomainDescription(ext)
      }
    })
    
    // Sort results: available first, then by popularity
    results.sort((a, b) => {
      if (a.available && !b.available) return -1
      if (!a.available && b.available) return 1
      if (a.recommended && !b.recommended) return -1
      if (!a.recommended && b.recommended) return 1
      if (a.popular && !b.popular) return -1
      if (!a.popular && b.popular) return 1
      return a.price - b.price
    })
    
    setSearchResults(results)
    setIsSearching(false)
  }

  const getBasePriceForExtension = (ext: string): number => {
    const prices: { [key: string]: number } = {
      '.com': 12, '.net': 14, '.org': 13, '.info': 8,
      '.io': 35, '.dev': 15, '.tech': 18, '.app': 20,
      '.co': 25, '.biz': 16, '.pro': 22, '.company': 28,
      '.design': 45, '.studio': 38, '.art': 42, '.creative': 40
    }
    return prices[ext] || 15
  }

  const getDomainDescription = (ext: string): string => {
    const descriptions: { [key: string]: string } = {
      '.com': 'Most popular and trusted extension',
      '.net': 'Great for network and tech companies',
      '.org': 'Perfect for organizations and nonprofits',
      '.io': 'Popular among startups and tech companies',
      '.dev': 'Ideal for developers and tech projects',
      '.co': 'Short and memorable business extension',
      '.design': 'Perfect for creative professionals',
      '.studio': 'Great for creative agencies and studios'
    }
    return descriptions[ext] || 'Professional domain extension'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      searchDomains(searchTerm.trim())
    }
  }

  const handleDomainSelect = (domain: DomainResult) => {
    if (domain.available) {
      setSelectedDomain(domain)
    }
  }

  const handleContinue = () => {
    if (selectedDomain) {
      // Store selected domain in localStorage or state management
      localStorage.setItem('selectedDomain', JSON.stringify(selectedDomain))
      // Navigate to next step (template selection)
      window.location.href = '/order/choose-template'
    }
  }

  const filteredResults = searchResults.filter(result => {
    const category = domainCategories.find(cat => cat.extensions.includes(result.extension))
    return category?.name === activeCategory
  })

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <span className="font-medium text-neutral-900 dark:text-white">Choose Domain</span>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-6 h-6 border-2 border-neutral-300 dark:border-neutral-600 rounded-full flex items-center justify-center text-xs">
                  2
                </div>
                <span className="text-neutral-500 dark:text-neutral-400">Choose Template</span>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-6 h-6 border-2 border-neutral-300 dark:border-neutral-600 rounded-full flex items-center justify-center text-xs">
                  3
                </div>
                <span className="text-neutral-500 dark:text-neutral-400">Personal Info</span>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-6 h-6 border-2 border-neutral-300 dark:border-neutral-600 rounded-full flex items-center justify-center text-xs">
                  4
                </div>
                <span className="text-neutral-500 dark:text-neutral-400">Payment</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div className="bg-neutral-900 dark:bg-white h-2 rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight">
              Choose Your Domain
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Find the perfect domain name for your website. Search and check availability across all popular extensions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Search & Features */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Search Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  Search Domain
                </h3>
                
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Enter your domain name..."
                      className="w-full pl-12 pr-4 py-4 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all text-neutral-900 dark:text-white"
                      disabled={isSearching}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSearching || !searchTerm.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Search Domain
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  What's Included
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="text-neutral-600 dark:text-neutral-400 mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                          {feature.title}
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Selected Domain Summary */}
              <AnimatePresence>
                {selectedDomain && (
                  <motion.div
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <h3 className="font-bold text-green-800 dark:text-green-200">
                        Selected Domain
                      </h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-lg font-bold text-green-900 dark:text-green-100">
                        {selectedDomain.domain}{selectedDomain.extension}
                      </p>
                      <p className="text-green-700 dark:text-green-300">
                        ${selectedDomain.price}/year
                      </p>
                    </div>
                    <motion.button
                      onClick={handleContinue}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      Continue to Templates
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 min-h-[600px]"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {hasSearched ? 'Search Results' : 'Domain Search Results'}
                    </h3>
                    {hasSearched && (
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {searchResults.filter(r => r.available).length} available domains
                      </div>
                    )}
                  </div>

                  {!hasSearched ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mb-4">
                        <Globe className="w-8 h-8 text-neutral-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                        Ready to find your domain?
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Enter a domain name in the search box to get started
                      </p>
                    </div>
                  ) : isSearching ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <Loader2 className="w-12 h-12 animate-spin text-neutral-500 mb-4" />
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                        Searching domains...
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Checking availability across all extensions
                      </p>
                    </div>
                  ) : (
                    <div>
                      {/* Category Tabs */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {domainCategories.slice(0, showAllCategories ? undefined : 2).map((category) => (
                            <button
                              key={category.name}
                              onClick={() => setActiveCategory(category.name)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                activeCategory === category.name
                                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                              }`}
                            >
                              {category.name}
                            </button>
                          ))}
                          {domainCategories.length > 2 && (
                            <button
                              onClick={() => setShowAllCategories(!showAllCategories)}
                              className="px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors flex items-center gap-1"
                            >
                              {showAllCategories ? (
                                <>
                                  Less <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  More <ChevronDown className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        {showAllCategories && (
                          <div className="flex flex-wrap gap-2">
                            {domainCategories.slice(2).map((category) => (
                              <button
                                key={category.name}
                                onClick={() => setActiveCategory(category.name)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  activeCategory === category.name
                                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                                }`}
                              >
                                {category.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Results List */}
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredResults.map((result, index) => (
                          <motion.div
                            key={`${result.domain}${result.extension}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => handleDomainSelect(result)}
                            className={`p-4 rounded-xl border transition-all duration-200 ${
                              result.available
                                ? selectedDomain?.domain === result.domain && selectedDomain?.extension === result.extension
                                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 cursor-pointer'
                                  : 'bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 hover:border-neutral-300 dark:hover:border-neutral-500 cursor-pointer'
                                : 'bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 flex-1">
                                {result.available ? (
                                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                                )}
                                
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="font-bold text-neutral-900 dark:text-white">
                                      {result.domain}{result.extension}
                                    </h4>
                                    {result.recommended && (
                                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full font-medium">
                                        Recommended
                                      </span>
                                    )}
                                    {result.popular && (
                                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    )}
                                  </div>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {result.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                {result.available ? (
                                  <div>
                                    {result.originalPrice && (
                                      <p className="text-sm text-neutral-500 line-through">
                                        ${result.originalPrice}/year
                                      </p>
                                    )}
                                    <p className="font-bold text-neutral-900 dark:text-white">
                                      ${result.price}/year
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    Not Available
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}