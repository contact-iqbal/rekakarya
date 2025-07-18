'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft,
  Check,
  Star,
  Eye,
  Heart,
  ExternalLink,
  Zap,
  Palette,
  Code,
  Smartphone,
  Globe,
  ShoppingCart
} from 'lucide-react'

interface Template {
  id: number
  name: string
  category: string
  description: string
  image: string
  price: number
  originalPrice?: number
  features: string[]
  popular?: boolean
  recommended?: boolean
  views: string
  likes: string
  tags: string[]
  demoUrl?: string
}

const templates: Template[] = [
  {
    id: 1,
    name: "Modern Business",
    category: "Business",
    description: "Professional business website with clean design and modern layout",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 49,
    originalPrice: 79,
    features: ["Responsive Design", "Contact Forms", "SEO Optimized", "Fast Loading"],
    popular: true,
    recommended: true,
    views: "12.5k",
    likes: "2.1k",
    tags: ["Business", "Corporate", "Professional"],
    demoUrl: "#"
  },
  {
    id: 2,
    name: "E-Commerce Store",
    category: "E-Commerce",
    description: "Complete online store with shopping cart and payment integration",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 99,
    originalPrice: 149,
    features: ["Shopping Cart", "Payment Gateway", "Inventory Management", "Order Tracking"],
    popular: true,
    views: "18.2k",
    likes: "3.4k",
    tags: ["E-Commerce", "Shopping", "Store"],
    demoUrl: "#"
  },
  {
    id: 3,
    name: "Creative Portfolio",
    category: "Portfolio",
    description: "Stunning portfolio website for creative professionals and artists",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 39,
    features: ["Gallery Showcase", "Project Details", "Contact Integration", "Social Links"],
    views: "8.7k",
    likes: "1.8k",
    tags: ["Portfolio", "Creative", "Art"],
    demoUrl: "#"
  },
  {
    id: 4,
    name: "Restaurant & Food",
    category: "Restaurant",
    description: "Appetizing restaurant website with menu and reservation system",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 59,
    features: ["Menu Display", "Online Reservations", "Location Map", "Reviews Section"],
    views: "15.3k",
    likes: "2.7k",
    tags: ["Restaurant", "Food", "Menu"],
    demoUrl: "#"
  },
  {
    id: 5,
    name: "Tech Startup",
    category: "Technology",
    description: "Modern startup website with landing page and product showcase",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 69,
    features: ["Landing Page", "Product Showcase", "Team Section", "Investor Relations"],
    recommended: true,
    views: "22.1k",
    likes: "4.2k",
    tags: ["Startup", "Technology", "SaaS"],
    demoUrl: "#"
  },
  {
    id: 6,
    name: "Health & Wellness",
    category: "Healthcare",
    description: "Professional healthcare website with appointment booking",
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 79,
    features: ["Appointment Booking", "Service Listings", "Doctor Profiles", "Patient Portal"],
    views: "9.8k",
    likes: "1.5k",
    tags: ["Healthcare", "Medical", "Wellness"],
    demoUrl: "#"
  },
  {
    id: 7,
    name: "Real Estate",
    category: "Real Estate",
    description: "Property listing website with search and filter functionality",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 89,
    features: ["Property Listings", "Advanced Search", "Virtual Tours", "Agent Profiles"],
    views: "13.6k",
    likes: "2.3k",
    tags: ["Real Estate", "Property", "Listings"],
    demoUrl: "#"
  },
  {
    id: 8,
    name: "Education Platform",
    category: "Education",
    description: "Online learning platform with course management system",
    image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 109,
    features: ["Course Management", "Student Portal", "Progress Tracking", "Certificates"],
    views: "11.4k",
    likes: "2.0k",
    tags: ["Education", "Learning", "Courses"],
    demoUrl: "#"
  }
]

const categories = [
  { name: "All", icon: <Globe size={18} /> },
  { name: "Business", icon: <Code size={18} /> },
  { name: "E-Commerce", icon: <ShoppingCart size={18} /> },
  { name: "Portfolio", icon: <Palette size={18} /> },
  { name: "Restaurant", icon: <Heart size={18} /> },
  { name: "Technology", icon: <Zap size={18} /> },
  { name: "Healthcare", icon: <Heart size={18} /> },
  { name: "Real Estate", icon: <Globe size={18} /> },
  { name: "Education", icon: <Code size={18} /> }
]

export default function ChooseTemplatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDomain, setSelectedDomain] = useState<any>(null)

  useEffect(() => {
    // Get selected domain from previous step
    const domain = localStorage.getItem('selectedDomain')
    if (domain) {
      setSelectedDomain(JSON.parse(domain))
    }
  }, [])

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
  }

  const handleContinue = () => {
    if (selectedTemplate) {
      localStorage.setItem('selectedTemplate', JSON.stringify(selectedTemplate))
      window.location.href = '/order/personal-info'
    }
  }

  const handleBack = () => {
    window.location.href = '/order/choose-domain'
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  <Check size={12} />
                </div>
                <span className="text-neutral-500 dark:text-neutral-400">Choose Domain</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <span className="font-medium text-neutral-900 dark:text-white">Choose Template</span>
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
              <div className="bg-neutral-900 dark:bg-white h-2 rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight">
              Choose Your Template
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Select a professional template that matches your business needs. All templates are fully customizable and mobile-responsive.
            </p>
            
            {/* Selected Domain Display */}
            {selectedDomain && (
              <div className="mt-6 inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-green-800 dark:text-green-200 font-medium">
                  {selectedDomain.domain}{selectedDomain.extension}
                </span>
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Categories & Selected Template */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        selectedCategory === category.name
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      <div className={selectedCategory === category.name ? 'text-white dark:text-neutral-900' : 'text-neutral-500 dark:text-neutral-400'}>
                        {category.icon}
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Selected Template Summary */}
              <AnimatePresence>
                {selectedTemplate && (
                  <motion.div
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-bold text-blue-800 dark:text-blue-200">
                        Selected Template
                      </h3>
                    </div>
                    
                    <div className="mb-4">
                      <img
                        src={selectedTemplate.image}
                        alt={selectedTemplate.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">
                        {selectedTemplate.name}
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
                        {selectedTemplate.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        {selectedTemplate.originalPrice && (
                          <span className="text-sm text-blue-600 dark:text-blue-400 line-through">
                            ${selectedTemplate.originalPrice}
                          </span>
                        )}
                        <span className="font-bold text-blue-900 dark:text-blue-100">
                          ${selectedTemplate.price}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={handleContinue}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Content - Templates Grid */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {selectedCategory === 'All' ? 'All Templates' : `${selectedCategory} Templates`}
                  </h3>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {filteredTemplates.length} templates
                  </div>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTemplates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => handleTemplateSelect(template)}
                      className={`group cursor-pointer bg-white dark:bg-neutral-800 rounded-2xl border-2 transition-all duration-300 overflow-hidden hover:shadow-xl ${
                        selectedTemplate?.id === template.id
                          ? 'border-blue-500 dark:border-blue-400 shadow-lg'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                      }`}
                    >
                      {/* Template Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          {template.popular && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Popular
                            </span>
                          )}
                          {template.recommended && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Recommended
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-colors">
                            <ExternalLink size={16} />
                          </button>
                        </div>

                        {/* Stats */}
                        <div className="absolute bottom-3 left-3 flex items-center space-x-4 text-white text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye size={14} />
                            <span>{template.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart size={14} />
                            <span>{template.likes}</span>
                          </div>
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-neutral-900 dark:text-white text-lg mb-1">
                              {template.name}
                            </h4>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                              {template.description}
                            </p>
                          </div>
                          <div className="text-right">
                            {template.originalPrice && (
                              <div className="text-sm text-neutral-500 line-through">
                                ${template.originalPrice}
                              </div>
                            )}
                            <div className="font-bold text-neutral-900 dark:text-white">
                              ${template.price}
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {template.features.slice(0, 3).map((feature, featureIndex) => (
                              <span
                                key={featureIndex}
                                className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                            {template.features.length > 3 && (
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                +{template.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {template.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Select Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                            selectedTemplate?.id === template.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-600'
                          }`}
                        >
                          {selectedTemplate?.id === template.id ? 'Selected' : 'Select Template'}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
            <motion.button
              onClick={handleBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Domain</span>
            </motion.button>

            <motion.button
              onClick={handleContinue}
              disabled={!selectedTemplate}
              whileHover={{ scale: selectedTemplate ? 1.02 : 1 }}
              whileTap={{ scale: selectedTemplate ? 0.98 : 1 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedTemplate
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100'
                  : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
              }`}
            >
              <span>Continue to Personal Info</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}