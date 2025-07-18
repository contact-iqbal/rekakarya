'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Cookie, Settings, BarChart3, Shield, Globe, Eye } from 'lucide-react'

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: <Settings size={24} />,
      title: "Essential Cookies",
      description: "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      examples: ["Authentication", "Security", "Form submissions", "User preferences"],
      required: true
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Analytics Cookies",
      description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
      examples: ["Google Analytics", "Page views", "User behavior", "Performance metrics"],
      required: false
    },
    {
      icon: <Eye size={24} />,
      title: "Marketing Cookies",
      description: "These cookies may be set through our site by our advertising partners to build a profile of your interests.",
      examples: ["Ad targeting", "Social media", "Remarketing", "Conversion tracking"],
      required: false
    },
    {
      icon: <Globe size={24} />,
      title: "Functional Cookies",
      description: "These cookies enable the website to provide enhanced functionality and personalization.",
      examples: ["Language preferences", "Region selection", "Enhanced features", "Personalization"],
      required: false
    }
  ]

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance tracking",
      dataCollected: "Page views, user behavior, demographics",
      retention: "26 months",
      optOut: "https://tools.google.com/dlpage/gaoptout"
    },
    {
      name: "Google Fonts",
      purpose: "Font delivery and display",
      dataCollected: "IP address, browser information",
      retention: "1 year",
      optOut: "Browser settings"
    },
    {
      name: "Cloudflare",
      purpose: "Content delivery and security",
      dataCollected: "IP address, security logs",
      retention: "30 days",
      optOut: "Not applicable (essential service)"
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-medium px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-full backdrop-blur-sm bg-neutral-100/50 dark:bg-neutral-800/50">
                Legal
              </span>
            </div>
            
            <div className="flex items-center justify-center mb-6">
              <Cookie size={48} className="text-neutral-700 dark:text-neutral-300" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
              Cookie Policy
            </h1>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              This Cookie Policy explains how RekaKarya uses cookies and similar technologies 
              to recognize you when you visit our website. It explains what these technologies 
              are and why we use them.
            </p>
            
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              <p>Last updated: January 15, 2025</p>
              <p>Effective date: January 15, 2025</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Are Cookies Section */}
      <section className="pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 md:p-12 mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              What Are Cookies?
            </h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, RekaKarya) are called "first party cookies". 
                Cookies set by parties other than the website owner are called "third party cookies". 
                Third party cookies enable third party features or functionality to be provided on or through 
                the website (e.g., advertising, interactive content, and analytics).
              </p>
            </div>
          </motion.div>

          {/* Cookie Types */}
          <div className="space-y-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                Types of Cookies We Use
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                We use different types of cookies to provide and improve our services
              </p>
            </motion.div>

            {cookieTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    type.required 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}>
                    {type.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        {type.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        type.required 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                          : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      }`}>
                        {type.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      {type.description}
                    </p>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                        Examples:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((example, exampleIndex) => (
                          <span
                            key={exampleIndex}
                            className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm rounded-lg"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Third Party Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Third-Party Services
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-sm">
                <thead className="bg-neutral-50 dark:bg-neutral-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Purpose</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Data Collected</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Retention</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 dark:text-white">Opt-Out</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {thirdPartyServices.map((service, index) => (
                    <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50">
                      <td className="px-6 py-4 text-sm font-medium text-neutral-900 dark:text-white">
                        {service.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                        {service.purpose}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                        {service.dataCollected}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                        {service.retention}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {service.optOut.startsWith('http') ? (
                          <a 
                            href={service.optOut} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Opt-out link
                          </a>
                        ) : (
                          <span className="text-neutral-600 dark:text-neutral-400">{service.optOut}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Managing Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900 dark:bg-black rounded-2xl p-8 md:p-12 text-white mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Managing Your Cookie Preferences</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Browser Settings</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Most web browsers allow you to control cookies through their settings preferences. 
                  You can set your browser to refuse cookies or to alert you when cookies are being sent.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Cookie Consent</h3>
                <p className="text-neutral-300 leading-relaxed">
                  When you first visit our website, you'll see a cookie consent banner. You can choose 
                  which types of cookies to accept or reject.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Impact of Disabling Cookies</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Please note that if you disable cookies, some features of our website may not function 
                  properly, and your user experience may be affected.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                <p className="text-neutral-300 leading-relaxed">
                  If you have questions about our use of cookies, please contact us at{' '}
                  <a href="mailto:privacy@rekakarya.com" className="text-white hover:text-neutral-200 underline">
                    privacy@rekakarya.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Updates to Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Updates to This Cookie Policy
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy 
              regularly to stay informed about our use of cookies.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}