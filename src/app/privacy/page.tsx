'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Database, Globe, Mail } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Eye size={24} />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, contact us, or use our services. This may include your name, email address, phone number, company information, and any other information you choose to provide."
        },
        {
          subtitle: "Usage Information",
          text: "We automatically collect certain information about your use of our services, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed."
        },
        {
          subtitle: "Cookies and Tracking Technologies",
          text: "We use cookies, web beacons, and other tracking technologies to collect information about your browsing activities and to provide personalized experiences."
        }
      ]
    },
    {
      icon: <Database size={24} />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our services, process transactions, and communicate with you about your account or our services."
        },
        {
          subtitle: "Communication",
          text: "We may use your information to send you technical notices, updates, security alerts, and support messages, as well as marketing communications if you have opted in."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We use information to understand how our services are used, to develop new features, and to improve our overall user experience."
        }
      ]
    },
    {
      icon: <Globe size={24} />,
      title: "Information Sharing",
      content: [
        {
          subtitle: "Service Providers",
          text: "We may share your information with third-party service providers who perform services on our behalf, such as hosting, analytics, customer support, and payment processing."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect our rights, property, or safety."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction."
        }
      ]
    },
    {
      icon: <Lock size={24} />,
      title: "Data Security",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements."
        },
        {
          subtitle: "International Transfers",
          text: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 md:px-16 lg:px-24">
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
              <Shield size={48} className="text-neutral-700 dark:text-neutral-300" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
              Privacy Policy
            </h1>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              Your privacy is important to us. This Privacy Policy explains how RekaKarya collects, 
              uses, and protects your personal information when you use our services.
            </p>
            
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              <p>Last updated: January 15, 2025</p>
              <p>Effective date: January 15, 2025</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8 md:p-12"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Your Rights Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-neutral-900 dark:bg-black rounded-2xl p-8 md:p-12 text-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Your Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Access and Portability</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  You have the right to access your personal information and request a copy of the data we hold about you.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Correction and Deletion</h3>
                <p className="text-neutral-300 leading-relaxed">
                  You can request that we correct inaccurate information or delete your personal information, subject to certain exceptions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Opt-Out</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  You can opt out of receiving marketing communications from us at any time by following the unsubscribe instructions.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                <p className="text-neutral-300 leading-relaxed">
                  To exercise your rights or if you have questions about this Privacy Policy, contact us at{' '}
                  <a href="mailto:privacy@rekakarya.com" className="text-white hover:text-neutral-200 underline">
                    privacy@rekakarya.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Changes to Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}