'use client'

import { useEffect, useRef, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, Star, Zap, Shield, Rocket, Users, Globe, Code, Palette, Smartphone, Database, ExternalLink, Heart, Eye, Bookmark, X, Mail, Phone, Globe as GlobeIcon } from 'lucide-react'
import CountUp from 'react-countup'

const pricingPlans = [
  {
    name: "Starter",
    price: "999",
    period: "one-time",
    description: "Perfect for small businesses and startups",
    features: [
      "5-page responsive website",
      "Mobile optimization",
      "Basic SEO setup",
      "Contact form integration",
      "1 month support",
      "SSL certificate"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "2,499",
    period: "one-time",
    description: "Ideal for growing businesses",
    features: [
      "10-page responsive website",
      "Custom design & branding",
      "Advanced SEO optimization",
      "E-commerce integration",
      "Analytics setup",
      "3 months support",
      "Content management system",
      "Social media integration"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "quote",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited pages",
      "Custom web application",
      "Advanced integrations",
      "Database design",
      "API development",
      "12 months support",
      "Training & documentation",
      "Priority support"
    ],
    popular: false
  }
]

const designShowcase = [
  {
    id: 1,
    title: "E-Commerce Platform",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Dipa Inhouse",
    views: "48.2k",
    email: "dipa@rekakarya.com",
    phone: "+1 234 567 8901",
    website: "dipainhouse.com",
    status: "Available for work",
    description: "Modern e-commerce platform with seamless user experience and advanced product filtering capabilities."
  },
  {
    id: 2,
    title: "Product Landing Page",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Caraka",
    views: "33.8k",
    email: "caraka@rekakarya.com",
    phone: "+1 234 567 8902",
    website: "caraka.design",
    status: "Available for work",
    description: "High-converting product landing page with optimized user flow and compelling visual design."
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Bondroy",
    views: "53.2k",
    email: "bondroy@rekakarya.com",
    phone: "+1 234 567 8903",
    website: "bondroy.dev",
    status: "Available for work",
    description: "Comprehensive SaaS dashboard with real-time analytics and intuitive data visualization."
  },
  {
    id: 4,
    title: "Mobile Banking App",
    image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Wix Studio",
    views: "41.7k",
    email: "studio@wix.com",
    phone: "+1 234 567 8904",
    website: "wixstudio.com",
    status: "Available for work",
    description: "Secure mobile banking application with biometric authentication and seamless transaction flow."
  },
  {
    id: 5,
    title: "Food Delivery Platform",
    image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Design Co",
    views: "29.5k",
    email: "hello@designco.com",
    phone: "+1 234 567 8905",
    website: "designco.com",
    status: "Available for work",
    description: "Complete food delivery platform connecting restaurants with customers through smart logistics."
  },
  {
    id: 6,
    title: "Portfolio Website",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "Creative Lab",
    views: "22.1k",
    email: "info@creativelab.com",
    phone: "+1 234 567 8906",
    website: "creativelab.com",
    status: "Available for work",
    description: "Creative portfolio website showcasing artistic work with interactive galleries and smooth animations."
  },
  {
    id: 7,
    title: "Healthcare App",
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "MedTech",
    views: "67.3k",
    email: "contact@medtech.com",
    phone: "+1 234 567 8907",
    website: "medtech.com",
    status: "Available for work",
    description: "Comprehensive healthcare application for patient management and telemedicine consultations."
  },
  {
    id: 8,
    title: "Travel Booking Site",
    image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "TravelUI",
    views: "89.1k",
    email: "hello@travelui.com",
    phone: "+1 234 567 8908",
    website: "travelui.com",
    status: "Available for work",
    description: "Modern travel booking platform with advanced search filters and seamless booking experience."
  }
]

// Additional products for load more functionality
const additionalProducts = [
  {
    id: 9,
    title: "Fitness Tracking App",
    image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "FitTech",
    views: "35.4k",
    email: "info@fittech.com",
    phone: "+1 234 567 8909",
    website: "fittech.com",
    status: "Available for work",
    description: "Comprehensive fitness tracking application with workout plans and nutrition guidance."
  },
  {
    id: 10,
    title: "Real Estate Platform",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "PropTech",
    views: "42.8k",
    email: "contact@proptech.com",
    phone: "+1 234 567 8910",
    website: "proptech.com",
    status: "Available for work",
    description: "Modern real estate platform with virtual tours and advanced property search."
  },
  {
    id: 11,
    title: "Learning Management System",
    image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "EduTech",
    views: "28.9k",
    email: "hello@edutech.com",
    phone: "+1 234 567 8911",
    website: "edutech.com",
    status: "Available for work",
    description: "Comprehensive learning management system with interactive courses and progress tracking."
  },
  {
    id: 12,
    title: "Social Media Dashboard",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "SocialTech",
    views: "51.2k",
    email: "info@socialtech.com",
    phone: "+1 234 567 8912",
    website: "socialtech.com",
    status: "Available for work",
    description: "Advanced social media management dashboard with analytics and scheduling tools."
  },
  {
    id: 13,
    title: "Cryptocurrency Exchange",
    image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "CryptoTech",
    views: "73.5k",
    email: "support@cryptotech.com",
    phone: "+1 234 567 8913",
    website: "cryptotech.com",
    status: "Available for work",
    description: "Secure cryptocurrency exchange platform with advanced trading features."
  },
  {
    id: 14,
    title: "Event Management App",
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "EventTech",
    views: "31.7k",
    email: "hello@eventtech.com",
    phone: "+1 234 567 8914",
    website: "eventtech.com",
    status: "Available for work",
    description: "Complete event management solution with ticketing and attendee management."
  },
  {
    id: 15,
    title: "Music Streaming Platform",
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "MusicTech",
    views: "86.3k",
    email: "info@musictech.com",
    phone: "+1 234 567 8915",
    website: "musictech.com",
    status: "Available for work",
    description: "Modern music streaming platform with personalized playlists and social features."
  },
  {
    id: 16,
    title: "Recipe Sharing App",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "FoodTech",
    views: "24.6k",
    email: "contact@foodtech.com",
    phone: "+1 234 567 8916",
    website: "foodtech.com",
    status: "Available for work",
    description: "Social recipe sharing platform with meal planning and grocery list features."
  }
]

// Second batch of additional products
const secondBatchProducts = [
  {
    id: 17,
    title: "Task Management Tool",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "TaskFlow",
    views: "39.2k",
    email: "hello@taskflow.com",
    phone: "+1 234 567 8917",
    website: "taskflow.com",
    status: "Available for work",
    description: "Intuitive task management platform with team collaboration and project tracking features."
  },
  {
    id: 18,
    title: "Weather Forecast App",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "WeatherPro",
    views: "27.8k",
    email: "info@weatherpro.com",
    phone: "+1 234 567 8918",
    website: "weatherpro.com",
    status: "Available for work",
    description: "Advanced weather application with detailed forecasts and interactive radar maps."
  },
  {
    id: 19,
    title: "Video Conferencing Platform",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "VideoConnect",
    views: "64.1k",
    email: "support@videoconnect.com",
    phone: "+1 234 567 8919",
    website: "videoconnect.com",
    status: "Available for work",
    description: "Professional video conferencing solution with screen sharing and recording capabilities."
  },
  {
    id: 20,
    title: "Digital Wallet App",
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "PaySecure",
    views: "58.7k",
    email: "hello@paysecure.com",
    phone: "+1 234 567 8920",
    website: "paysecure.com",
    status: "Available for work",
    description: "Secure digital wallet with contactless payments and expense tracking features."
  },
  {
    id: 21,
    title: "News Aggregator",
    image: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "NewsHub",
    views: "33.5k",
    email: "contact@newshub.com",
    phone: "+1 234 567 8921",
    website: "newshub.com",
    status: "Available for work",
    description: "Personalized news aggregation platform with AI-powered content curation."
  },
  {
    id: 22,
    title: "Photo Editor Pro",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "PhotoStudio",
    views: "45.3k",
    email: "info@photostudio.com",
    phone: "+1 234 567 8922",
    website: "photostudio.com",
    status: "Available for work",
    description: "Professional photo editing application with advanced filters and AI enhancement tools."
  },
  {
    id: 23,
    title: "Meditation & Wellness",
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "ZenApp",
    views: "29.1k",
    email: "hello@zenapp.com",
    phone: "+1 234 567 8923",
    website: "zenapp.com",
    status: "Available for work",
    description: "Comprehensive meditation and wellness app with guided sessions and progress tracking."
  },
  {
    id: 24,
    title: "Smart Home Controller",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
    author: "SmartTech",
    views: "52.9k",
    email: "support@smarttech.com",
    phone: "+1 234 567 8924",
    website: "smarttech.com",
    status: "Available for work",
    description: "Unified smart home control system with voice commands and automation features."
  }
]

// Lazy loading hook
const useLazyLoading = (ref: React.RefObject<HTMLElement>) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const isInView = useInView(ref, { once: true, margin: "100px" })

  useEffect(() => {
    if (isInView) {
      setIsLoaded(true)
    }
  }, [isInView])

  return isLoaded
}

// Product Card Component
const ProductCard: React.FC<{ product: any; onClick: () => void; showOverlay?: boolean }> = ({ product, onClick, showOverlay = false }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isLoaded = useLazyLoading(cardRef)

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer relative shadow-lg shadow-white/50 dark:shadow-black/50 hover:shadow-xl hover:shadow-white/60 dark:hover:shadow-black/60"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 dark:bg-neutral-800 border-4 border-black dark:border-white rounded-t-lg">
        {isLoaded ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        )}
        
        {/* Dark Overlay - Show on hover or when showOverlay is true */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          showOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`} />
        
        {/* Title Overlay - Show on hover or when showOverlay is true */}
        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 transition-opacity duration-300 ${
          showOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
            {product.title}
          </h3>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="p-4 border-4 border-t-0 border-black dark:border-white rounded-b-lg">
        <div className="flex items-center justify-between">
          {/* Author Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-neutral-800 dark:bg-neutral-200 rounded-full border-2 border-black dark:border-white flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {product.author.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-neutral-900 dark:text-white text-sm">
                  {product.author}
                </span>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm">
            <div className="flex items-center space-x-1">
              <Eye size={14} />
              <span>{product.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Product Modal Component
const ProductModal: React.FC<{ product: any; isOpen: boolean; onClose: () => void }> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Generate multiple images for slider (using the same image with different params for demo)
  const productImages = [
    product?.image,
    product?.image?.replace('w=600', 'w=800'),
    product?.image?.replace('w=600', 'w=700'),
    product?.image?.replace('w=600', 'w=900')
  ].filter(Boolean)

  if (!isOpen || !product) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center pt-8 pb-0"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              duration: 0.5
            }}
            className="bg-white dark:bg-neutral-900 rounded-t-3xl w-full h-[calc(100vh-2rem)] flex flex-col shadow-2xl max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Clean minimal header */}
            <div className="flex items-center justify-between p-4 md:p-6 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0">
              {/* Drag Handle */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-neutral-300 dark:bg-neutral-600 rounded-full"></div>
              
              <h2 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                {product.title}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 md:p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X size={20} className="md:w-6 md:h-6 text-neutral-500 dark:text-neutral-400" />
              </button>
            </div>

            {/* Author Info Bar */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-neutral-800 dark:bg-neutral-200 rounded-full flex items-center justify-center">
                  <span className="text-white dark:text-neutral-900 font-bold text-xs md:text-sm">
                    {product.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base">
                      {product.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs md:text-sm text-green-600 dark:text-green-400">
                      {product.status}
                    </span>
                    <button className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  Visit page
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                  Choose this template
                </motion.button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-4 md:p-6">
                {/* Image Slider */}
                <div className="relative mb-6 md:mb-8">
                  <div className="aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                    <img
                      src={productImages[currentImageIndex]}
                      alt={`${product.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-neutral-700 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 dark:bg-black/80 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-black transition-colors"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-neutral-700 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Image Indicators */}
                  {productImages.length > 1 && (
                    <div className="flex justify-center space-x-1.5 md:space-x-2 mt-3 md:mt-4">
                      {productImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors ${
                            index === currentImageIndex
                              ? 'bg-neutral-900 dark:bg-white'
                              : 'bg-neutral-300 dark:bg-neutral-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Description */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-3 md:mb-4">
                    About This Project
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm md:text-base lg:text-lg">
                    {product.description}
                  </p>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 p-4 md:p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg md:rounded-xl">

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1 md:mb-2">
                      <Eye size={16} className="text-neutral-500 dark:text-neutral-400" />
                      <span className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-white">
                        {product.views}
                      </span>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Views</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1 md:mb-2">
                      <Bookmark size={16} className="text-neutral-500 dark:text-neutral-400" />
                      <span className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-white">
                        {Math.floor(parseInt(product.views.replace('k', '')) * 0.1)}
                      </span>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Saves</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1 md:mb-2">
                      <ExternalLink size={16} className="text-neutral-500 dark:text-neutral-400" />
                      <span className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-white">
                        {Math.floor(parseInt(product.views.replace('k', '')) * 0.05)}
                      </span>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Visits</span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-white">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail size={16} className="md:w-[18px] md:h-[18px] text-neutral-500 dark:text-neutral-400" />
                      <span className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">{product.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone size={16} className="md:w-[18px] md:h-[18px] text-neutral-500 dark:text-neutral-400" />
                      <span className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">{product.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GlobeIcon size={16} className="md:w-[18px] md:h-[18px] text-neutral-500 dark:text-neutral-400" />
                      <span className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">{product.website}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom padding for mobile scroll */}
                <div className="h-4 md:h-0"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ProductPage() {
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [displayedProducts, setDisplayedProducts] = useState(designShowcase)
  const [hasMoreProducts, setHasMoreProducts] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [clickedProductId, setClickedProductId] = useState<number | null>(null)
  const [heroOpacity, setHeroOpacity] = useState(1)
  const productSectionRef = useRef<HTMLDivElement>(null)

  // Monitor scroll position to adjust hero opacity
  useEffect(() => {
    const handleScroll = () => {
      if (productSectionRef.current) {
        const rect = productSectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Calculate when the product section starts entering the viewport
        // Start fading when the section is 200px from entering the viewport
        const fadeStartPoint = windowHeight + 200
        const fadeEndPoint = windowHeight - 100
        
        if (rect.top <= fadeStartPoint && rect.top >= fadeEndPoint) {
          // Calculate opacity based on scroll position
          const progress = (fadeStartPoint - rect.top) / (fadeStartPoint - fadeEndPoint)
          const newOpacity = Math.max(0.2, 1 - (progress * 0.8)) // Fade from 1 to 0.2
          setHeroOpacity(newOpacity)
        } else if (rect.top < fadeEndPoint) {
          // Fully in product section - minimum opacity
          setHeroOpacity(0.2)
        } else {
          // Above product section - full opacity
          setHeroOpacity(1)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCardClick = (product: any) => {
    setClickedProductId(product.id)
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    // Keep the overlay for a short time after closing modal
    setTimeout(() => {
      setClickedProductId(null)
    }, 300)
  }

  const loadMoreProducts = () => {
    if (isLoading || !hasMoreProducts) return
    
    setIsLoading(true)
    
    // Simulate loading delay
    setTimeout(() => {
      const currentCount = displayedProducts.length
      const allAdditionalProducts = [...additionalProducts, ...secondBatchProducts]
      
      if (currentCount < designShowcase.length + allAdditionalProducts.length) {
        let nextBatch: any[] = []
        
        if (currentCount === designShowcase.length) {
          // First load more click - load first 8 additional products
          nextBatch = additionalProducts
        } else if (currentCount === designShowcase.length + additionalProducts.length) {
          // Second load more click - load second batch
          nextBatch = secondBatchProducts
        }
        
        setDisplayedProducts(prev => [...prev, ...nextBatch])
        
        // Check if we've loaded all products
        if (currentCount + nextBatch.length >= designShowcase.length + allAdditionalProducts.length) {
          setHasMoreProducts(false)
        }
      } else {
        setHasMoreProducts(false)
      }
      
      setIsLoading(false)
    }, 1000)
  }
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300 relative">
      <Navigation />
      
      {/* Hero Section - Sticky Background */}
      <section 
        className="fixed inset-0 z-0 pt-28 pb-16 px-8 md:px-16 lg:px-24 min-h-screen flex items-center bg-white dark:bg-neutral-900 transition-opacity duration-500 ease-out"
        style={{ opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Animated Text Hero */}
          <div className="relative h-[85vh] flex flex-col justify-center items-center overflow-hidden">
            {/* Left Fade Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-r from-white dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
            
            {/* Right Fade Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-l from-white dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
            
            {/* Top Line - Moving Left Slow */}
            <div className="relative w-full mb-4 md:mb-8 overflow-hidden">
              <motion.div
                animate={{ x: [0, -2000] }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex whitespace-nowrap"
              >
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 dark:text-white tracking-tight mr-8">
                      DIGITAL SOLUTIONS
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-400 dark:text-neutral-600 mr-8">
                      ∷
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 dark:text-white tracking-tight mr-8">
                      WEB DEVELOPMENT
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-400 dark:text-neutral-600 mr-8">
                      ∷
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 dark:text-white tracking-tight mr-8">
                      MOBILE APPS
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-400 dark:text-neutral-600 mr-8">
                      ∷
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Middle Line - Moving Right Fast */}
            <div className="relative w-full mb-4 md:mb-8 overflow-hidden">
              <motion.div
                animate={{ x: [-2000, 0] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex whitespace-nowrap"
              >
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 dark:text-white tracking-tight mr-8">
                      UI/UX DESIGN
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-400 dark:text-neutral-600 mr-8">
                      ∷
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 dark:text-white tracking-tight mr-8">
                      BRANDING
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-400 dark:text-neutral-600 mr-8">
                      ∷
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 dark:text-white tracking-tight mr-8">
                      STRATEGY
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-400 dark:text-neutral-600 mr-8">
                      ∷
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Line - Moving Left Very Slow */}
            <div className="relative w-full overflow-hidden">
              <motion.div
                animate={{ x: [0, -2000] }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex whitespace-nowrap"
              >
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 dark:text-white tracking-tight mr-8">
                      INNOVATION
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-400 dark:text-neutral-600 mr-8">
                      ∷
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 dark:text-white tracking-tight mr-8">
                      EXCELLENCE
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-400 dark:text-neutral-600 mr-8">
                      ∷
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-neutral-900 dark:text-white tracking-tight mr-8">
                      RESULTS
                    </span>
                    <span className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-neutral-400 dark:text-neutral-600 mr-8">
                      ∷
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to push content below the fixed hero */}
      <div className="h-screen relative z-10"></div>

      {/* Design Showcase Section - 4 Cards Per Row */}
      <section 
        ref={productSectionRef}
        className="relative z-10 py-12 px-2 md:px-4 lg:px-6 bg-transparent" 
        style={{ paddingLeft: '8px !important', paddingRight: '8px !important' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Product Grid - Responsive: 1 col on mobile, 2 on small, 3 on medium, 4 on large */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleCardClick(product)}
                showOverlay={clickedProductId === product.id}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreProducts && (
            <div className="text-center mt-12">
              <motion.button
                onClick={loadMoreProducts}
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className={`group relative overflow-hidden px-8 py-4 rounded-2xl border-4 border-black dark:border-white font-semibold text-lg transition-all duration-300 shadow-lg shadow-white/50 dark:shadow-black/50 hover:shadow-xl hover:shadow-white/60 dark:hover:shadow-black/60 flex items-center gap-3 ${
                  isLoading 
                    ? 'bg-neutral-400 text-white cursor-not-allowed' 
                    : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Loading More...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Products</span>
                    <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
                
                {/* Ripple Effect */}
                {!isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-white/20 dark:bg-black/20 rounded-2xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{ scale: 1.5, opacity: [0, 1, 0] }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>
            </div>
          )}
          
          {/* Show message when all products are loaded */}
          {!hasMoreProducts && displayedProducts.length > designShowcase.length && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mt-12 px-8 py-4 bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm text-neutral-600 dark:text-neutral-400 rounded-2xl border-4 border-black dark:border-white font-medium cursor-default shadow-md shadow-white/40 dark:shadow-black/40"
            >
              All products loaded
            </motion.button>
          )}
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}