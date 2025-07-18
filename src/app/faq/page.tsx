'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'

const faqData = [
  {
    id: 1,
    number: '01',
    question: 'What is RekaKarya and what is its role?',
    answer: 'RekaKarya is a digital agency specialized in web development and business promotion on the internet. Our web agency aims to take charge of all aspects related to the client\'s internet business and to propose the most suitable solutions to the different needs of the client. The purpose of this approach is to allow companies engaging a web agency to focus on their core business without neglecting their online presence.'
  },
  {
    id: 2,
    number: '02',
    question: 'What services are offered by our RekaKarya agency?',
    answer: 'We offer comprehensive digital services including web development, mobile app development, UI/UX design, digital strategy, backend development, and DevOps & security services. Our team specializes in creating modern, responsive websites and applications that drive real business results.'
  },
  {
    id: 3,
    number: '03',
    question: 'Why choose a web agency based in your location?',
    answer: 'Choosing a local web agency offers several advantages: better communication and understanding of your market, easier face-to-face meetings, knowledge of local business practices, and the ability to provide ongoing support in your timezone. We understand the unique challenges and opportunities in your region.'
  },
  {
    id: 4,
    number: '04',
    question: 'What are the pricing rates for our RekaKarya agency services?',
    answer: 'Our pricing depends on the project scope, complexity, and timeline. We offer both fixed-price projects and hourly rates. We provide transparent pricing with no hidden costs and offer flexible payment plans for larger projects. Contact us for a detailed quote based on your specific requirements.'
  },
  {
    id: 5,
    number: '05',
    question: 'Why trust our RekaKarya web agency?',
    answer: 'With over 5 years of experience, we have successfully delivered 150+ projects and helped launch 50+ startups. Our team combines technical expertise with creative vision, and we provide 24/7 support. We maintain transparent communication throughout the project and guarantee quality results.'
  },
  {
    id: 6,
    number: '06',
    question: 'How to choose the right web agency for your project?',
    answer: 'When choosing a web agency, consider their portfolio, experience in your industry, technical expertise, communication style, support offerings, and client testimonials. Look for agencies that understand your business goals and can provide comprehensive solutions from design to deployment and ongoing maintenance.'
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([1]) // First item open by default

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-12 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about our services and how we can help your business succeed online.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-0">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border-b border-neutral-200 dark:border-neutral-700 ${
                  openItems.includes(faq.id) ? 'bg-green-100 dark:bg-green-900/20' : ''
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-8 py-8 text-left flex items-start justify-between hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors group"
                >
                  <div className="flex items-start space-x-6 flex-1">
                    <span className="text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1 flex-shrink-0">
                      ({faq.number})
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white leading-tight pr-4 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: openItems.includes(faq.id) ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ArrowUpRight 
                      size={24} 
                      className="text-neutral-600 dark:text-neutral-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" 
                    />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden bg-green-100 dark:bg-green-900/20"
                    >
                      <div className="px-8 pb-8">
                        <div className="flex items-start space-x-6">
                          <span className="text-sm font-mono text-transparent flex-shrink-0">
                            ({faq.number})
                          </span>
                          <div className="flex-1">
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}