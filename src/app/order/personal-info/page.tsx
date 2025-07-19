'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft,
  Check,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  CreditCard,
  Shield,
} from 'lucide-react'

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Address Information
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Business Information (optional)
  companyName: string
  businessType: string
  website: string
  
  // Preferences
  newsletter: boolean
  terms: boolean
  privacy: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  companyName?: string
  businessType?: string
  website?: string
  newsletter?: string
  terms?: string
  privacy?: string
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
  companyName: '',
  businessType: '',
  website: '',
  newsletter: false,
  terms: false,
  privacy: false
}

const businessTypes = [
  'Select Business Type',
  'Sole Proprietorship',
  'Partnership',
  'Corporation',
  'LLC',
  'Non-Profit',
  'Other'
]

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Indonesia',
  'Germany',
  'France',
  'Japan',
  'Other'
]

export default function PersonalInfoPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [selectedDomain, setSelectedDomain] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Get selected domain and template from previous steps
    const domain = localStorage.getItem('selectedDomain')
    const template = localStorage.getItem('selectedTemplate')
    
    if (domain) setSelectedDomain(JSON.parse(domain))
    if (template) setSelectedTemplate(JSON.parse(template))
  }, [])

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required fields validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions'
    if (!formData.privacy) newErrors.privacy = 'You must accept the privacy policy'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Store form data
    localStorage.setItem('personalInfo', JSON.stringify(formData))
    
    // Navigate to payment page
    window.location.href = '/order/payment'
  }

  const handleBack = () => {
    window.location.href = '/order/choose-template'
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      
      {/* Progress Bar */}
      <div className="fixed top-12 left-0 right-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  <Check size={12} />
                </div>
                <span className="text-neutral-500 dark:text-neutral-400">Choose Domain</span>
              </div>
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  <Check size={12} />
                </div>
                <span className="text-neutral-500 dark:text-neutral-400">Choose Template</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span className="font-medium text-neutral-900 dark:text-white">Personal Info</span>
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
              <div className="bg-neutral-900 dark:bg-white h-2 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-40 pb-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight">
              Personal Information
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Please provide your information to complete your website setup. All information is secure and encrypted.
            </p>
            
            {/* Order Summary */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {selectedDomain && (
                <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-2">
                  <Globe className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-800 dark:text-green-200 font-medium">
                    {selectedDomain.domain}{selectedDomain.extension}
                  </span>
                </div>
              )}
              {selectedTemplate && (
                <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-2">
                  <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-800 dark:text-blue-200 font-medium">
                    {selectedTemplate.name}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            
            {/* Personal Information Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                      errors.firstName 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                    } text-neutral-900 dark:text-white`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                      errors.lastName 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                    } text-neutral-900 dark:text-white`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                      errors.email 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                    } text-neutral-900 dark:text-white`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                      errors.phone 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                    } text-neutral-900 dark:text-white`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Address Information
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                      errors.address 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                    } text-neutral-900 dark:text-white`}
                    placeholder="Enter your street address"
                  />
                  {errors.address && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                        errors.city 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                      } text-neutral-900 dark:text-white`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                        errors.state 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                      } text-neutral-900 dark:text-white`}
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                        errors.zipCode 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                      } text-neutral-900 dark:text-white`}
                      placeholder="ZIP Code"
                    />
                    {errors.zipCode && (
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Country *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all text-neutral-900 dark:text-white"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Business Information Section (Optional) */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                    Business Information
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">Optional - for business websites</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all text-neutral-900 dark:text-white"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Business Type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all text-neutral-900 dark:text-white"
                  >
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Existing Website (if any)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all text-neutral-900 dark:text-white"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>
            </div>


            {/* Preferences & Terms Section */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Preferences & Terms
                </h2>
              </div>

              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    className="mt-1 w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-500"
                  />
                  <div>
                    <span className="text-neutral-900 dark:text-white font-medium">
                      Subscribe to newsletter
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Get updates about new features, templates, and special offers.
                    </p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => handleInputChange('terms', e.target.checked)}
                    className="mt-1 w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-500"
                  />
                  <div>
                    <span className="text-neutral-900 dark:text-white font-medium">
                      I accept the Terms and Conditions *
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      By checking this box, you agree to our{' '}
                      <a href="/terms" className="text-neutral-900 dark:text-white underline hover:no-underline">
                        Terms of Service
                      </a>
                    </p>
                  </div>
                </label>
                {errors.terms && (
                  <p className="text-red-600 dark:text-red-400 text-sm ml-7">{errors.terms}</p>
                )}

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={(e) => handleInputChange('privacy', e.target.checked)}
                    className="mt-1 w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-500"
                  />
                  <div>
                    <span className="text-neutral-900 dark:text-white font-medium">
                      I accept the Privacy Policy *
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      By checking this box, you agree to our{' '}
                      <a href="/privacy" className="text-neutral-900 dark:text-white underline hover:no-underline">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </label>
                {errors.privacy && (
                  <p className="text-red-600 dark:text-red-400 text-sm ml-7">{errors.privacy}</p>
                )}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-neutral-200 dark:border-neutral-700">
              <motion.button
                type="button"
                onClick={handleBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Template</span>
              </motion.button>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-neutral-400 text-white cursor-not-allowed'
                    : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>

      <Footer />
    </div>
  )
}