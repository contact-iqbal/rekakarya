'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft,
  Check,
  CreditCard,
  Shield,
  Lock,
  Globe,
  Building,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  Star,
  Gift
} from 'lucide-react'

interface OrderSummary {
  domain: any
  template: any
  personalInfo: any
}

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  popular?: boolean
}

interface PaymentForm {
  method: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
  billingAddress: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  saveCard: boolean
  agreeTerms: boolean
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard size={20} />,
    description: 'Visa, Mastercard, American Express',
    popular: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.421c-.315-.178-.7-.284-1.18-.284h-1.695l-.692 4.39h1.695c1.12 0 1.968-.284 2.607-.9.639-.615.639-1.785 0-2.785z"/>
      </svg>
    ),
    description: 'Pay with your PayPal account'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: <Building size={20} />,
    description: 'Direct bank transfer'
  }
]

const securityFeatures = [
  {
    icon: <Shield size={16} />,
    text: "256-bit SSL encryption"
  },
  {
    icon: <Lock size={16} />,
    text: "PCI DSS compliant"
  },
  {
    icon: <CheckCircle size={16} />,
    text: "Secure payment processing"
  }
]

export default function PaymentPage() {
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    domain: null,
    template: null,
    personalInfo: null
  })
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    saveCard: false,
    agreeTerms: false
  })
  const [errors, setErrors] = useState<any>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Load order data from previous steps
    const domain = localStorage.getItem('selectedDomain')
    const template = localStorage.getItem('selectedTemplate')
    const personalInfo = localStorage.getItem('personalInfo')
    
    setOrderSummary({
      domain: domain ? JSON.parse(domain) : null,
      template: template ? JSON.parse(template) : null,
      personalInfo: personalInfo ? JSON.parse(personalInfo) : null
    })

    // Pre-fill billing address from personal info
    if (personalInfo) {
      const info = JSON.parse(personalInfo)
      setPaymentForm(prev => ({
        ...prev,
        cardName: `${info.firstName} ${info.lastName}`,
        billingAddress: {
          address: info.address || '',
          city: info.city || '',
          state: info.state || '',
          zipCode: info.zipCode || '',
          country: info.country || 'United States'
        }
      }))
    }
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('billingAddress.')) {
      const addressField = field.split('.')[1]
      setPaymentForm(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: value
        }
      }))
    } else {
      setPaymentForm(prev => ({ ...prev, [field]: value }))
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const validateForm = (): boolean => {
    const newErrors: any = {}

    if (paymentForm.method === 'card') {
      if (!paymentForm.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required'
      } else if (paymentForm.cardNumber.replace(/\s/g, '').length < 13) {
        newErrors.cardNumber = 'Invalid card number'
      }

      if (!paymentForm.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required'
      } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date format'
      }

      if (!paymentForm.cvv) {
        newErrors.cvv = 'CVV is required'
      } else if (paymentForm.cvv.length < 3) {
        newErrors.cvv = 'Invalid CVV'
      }

      if (!paymentForm.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required'
      }
    }

    if (!paymentForm.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsProcessing(false)
    setShowSuccess(true)
    
    // Clear stored data after successful payment
    setTimeout(() => {
      localStorage.removeItem('selectedDomain')
      localStorage.removeItem('selectedTemplate')
      localStorage.removeItem('personalInfo')
      // Redirect to success page or home
      window.location.href = '/'
    }, 3000)
  }

  const handleBack = () => {
    window.location.href = '/order/personal-info'
  }

  const calculateTotal = () => {
    const domainPrice = orderSummary.domain?.price || 0
    const templatePrice = orderSummary.template?.price || 0
    const subtotal = domainPrice + templatePrice
    const tax = subtotal * 0.1 // 10% tax
    return {
      subtotal,
      tax,
      total: subtotal + tax
    }
  }

  const pricing = calculateTotal()

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Your order has been processed successfully. We'll start working on your website right away!
          </p>
          <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
              className="bg-green-600 h-2 rounded-full"
            />
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Redirecting to homepage...
          </p>
        </motion.div>
      </div>
    )
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
              <div className="flex items-center space-x-2 opacity-50">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  <Check size={12} />
                </div>
                <span className="text-neutral-500 dark:text-neutral-400">Personal Info</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </div>
                <span className="font-medium text-neutral-900 dark:text-white">Payment</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div className="bg-neutral-900 dark:bg-white h-2 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-40 pb-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 tracking-tight">
              Complete Your Order
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Secure payment processing with industry-standard encryption. Your information is safe with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Payment Form */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Payment Method Selection */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl border-4 border-black dark:border-white p-8"
              >
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 rounded-xl border-3 cursor-pointer transition-all ${
                        paymentForm.method === method.id
                          ? 'border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-700'
                          : 'border-neutral-300 dark:border-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentForm.method === method.id}
                        onChange={(e) => handleInputChange('method', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="text-neutral-700 dark:text-neutral-300">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-neutral-900 dark:text-white">
                              {method.name}
                            </span>
                            {method.popular && (
                              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full font-medium">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {method.description}
                          </p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentForm.method === method.id
                          ? 'border-neutral-900 dark:border-white'
                          : 'border-neutral-300 dark:border-neutral-600'
                      }`}>
                        {paymentForm.method === method.id && (
                          <div className="w-2.5 h-2.5 bg-neutral-900 dark:bg-white rounded-full" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Card Details Form */}
              {paymentForm.method === 'card' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl border-4 border-black dark:border-white p-8"
                >
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                    Card Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={paymentForm.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full px-4 py-3 border-3 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                          errors.cardNumber 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                        } text-neutral-900 dark:text-white`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={paymentForm.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full px-4 py-3 border-3 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                            errors.expiryDate 
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                              : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                          } text-neutral-900 dark:text-white`}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.expiryDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={paymentForm.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className={`w-full px-4 py-3 border-3 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                            errors.cvv 
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                              : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                          } text-neutral-900 dark:text-white`}
                        />
                        {errors.cvv && (
                          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={paymentForm.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 border-3 rounded-xl focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition-all ${
                          errors.cardName 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700'
                        } text-neutral-900 dark:text-white`}
                      />
                      {errors.cardName && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.cardName}</p>
                      )}
                    </div>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paymentForm.saveCard}
                        onChange={(e) => handleInputChange('saveCard', e.target.checked)}
                        className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-500"
                      />
                      <span className="text-neutral-700 dark:text-neutral-300">
                        Save card for future purchases
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* PayPal Message */}
              {paymentForm.method === 'paypal' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-blue-50 dark:bg-blue-900/20 border-4 border-blue-200 dark:border-blue-800 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.421c-.315-.178-.7-.284-1.18-.284h-1.695l-.692 4.39h1.695c1.12 0 1.968-.284 2.607-.9.639-.615.639-1.785 0-2.785z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    PayPal Payment
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300">
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                </motion.div>
              )}

              {/* Bank Transfer Message */}
              {paymentForm.method === 'bank' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-neutral-50 dark:bg-neutral-800 border-4 border-neutral-300 dark:border-neutral-600 rounded-2xl p-8"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                        Bank Transfer Instructions
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                        After placing your order, you will receive bank transfer details via email. 
                        Your order will be processed once payment is confirmed.
                      </p>
                      <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-4">
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                          <strong>Processing time:</strong> 1-3 business days
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Terms Agreement */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl border-4 border-black dark:border-white p-8"
              >
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentForm.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="mt-1 w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-500"
                  />
                  <div>
                    <span className="text-neutral-900 dark:text-white font-medium">
                      I agree to the Terms of Service and Privacy Policy *
                    </span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                      By checking this box, you agree to our{' '}
                      <a href="/terms" className="text-neutral-900 dark:text-white underline hover:no-underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-neutral-900 dark:text-white underline hover:no-underline">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </label>
                {errors.agreeTerms && (
                  <p className="text-red-600 dark:text-red-400 text-sm mt-2">{errors.agreeTerms}</p>
                )}
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl border-4 border-black dark:border-white p-8 sticky top-32"
              >
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderSummary.domain && (
                    <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">
                            {orderSummary.domain.domain}{orderSummary.domain.extension}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Domain Registration (1 year)
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        ${orderSummary.domain.price}
                      </span>
                    </div>
                  )}

                  {orderSummary.template && (
                    <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-neutral-600 dark:bg-neutral-400 rounded"></div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-white">
                            {orderSummary.template.name}
                          </p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Website Template
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        ${orderSummary.template.price}
                      </span>
                    </div>
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span>${pricing.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Tax (10%)</span>
                    <span>${pricing.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                    <div className="flex justify-between text-lg font-bold text-neutral-900 dark:text-white">
                      <span>Total</span>
                      <span>${pricing.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-3 text-sm">
                    Your payment is secure
                  </h4>
                  <div className="space-y-2">
                    {securityFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="text-green-600 dark:text-green-400">
                          {feature.icon}
                        </div>
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 border-4 border-black dark:border-white flex items-center justify-center gap-3 ${
                    isProcessing
                      ? 'bg-neutral-400 text-white cursor-not-allowed'
                      : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Complete Payment - ${pricing.total.toFixed(2)}</span>
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center mt-4">
                  By completing this purchase, you agree to our terms and conditions.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
            <motion.button
              onClick={handleBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-6 py-3 border-4 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Personal Info</span>
            </motion.button>

            <div className="text-right">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Need help? <a href="/contact" className="text-neutral-900 dark:text-white underline hover:no-underline">Contact us</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}