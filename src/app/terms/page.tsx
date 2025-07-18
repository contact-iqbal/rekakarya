'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { FileText, Users, Shield, AlertTriangle, Scale, Gavel } from 'lucide-react'

export default function TermsOfServicePage() {
  const sections = [
    {
      icon: <Users size={24} />,
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using RekaKarya's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our service. Continued use of the service after such modifications constitutes acceptance of the updated terms."
        }
      ]
    },
    {
      icon: <Shield size={24} />,
      title: "Use of Services",
      content: [
        {
          subtitle: "Permitted Use",
          text: "You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use the service in any way that could damage, disable, overburden, or impair the service."
        },
        {
          subtitle: "User Accounts",
          text: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account."
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not use our services to transmit, distribute, store or destroy material that could constitute or encourage conduct that would be considered a criminal offense, give rise to civil liability, or otherwise violate any law or regulation."
        }
      ]
    },
    {
      icon: <FileText size={24} />,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Our Content",
          text: "The service and its original content, features, and functionality are and will remain the exclusive property of RekaKarya and its licensors. The service is protected by copyright, trademark, and other laws."
        },
        {
          subtitle: "User Content",
          text: "Our service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service."
        },
        {
          subtitle: "License Grant",
          text: "By posting content to our service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the service."
        }
      ]
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Disclaimers and Limitations",
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to provide uninterrupted access to our services, but we cannot guarantee 100% uptime. The service is provided on an 'as is' and 'as available' basis without any warranties of any kind."
        },
        {
          subtitle: "Limitation of Liability",
          text: "In no event shall RekaKarya, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages."
        },
        {
          subtitle: "Indemnification",
          text: "You agree to defend, indemnify, and hold harmless RekaKarya and its licensee and licensors from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees)."
        }
      ]
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
              <Scale size={48} className="text-neutral-700 dark:text-neutral-300" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
              Terms of Service
            </h1>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
              These Terms of Service govern your use of RekaKarya's services. Please read them carefully 
              as they contain important information about your rights and obligations.
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

          {/* Payment and Billing Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-neutral-900 dark:bg-black rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Gavel size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Payment and Billing</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Payment Terms</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  Payment for services is due according to the terms specified in your service agreement. 
                  Late payments may result in service suspension.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Refund Policy</h3>
                <p className="text-neutral-300 leading-relaxed">
                  Refunds are handled on a case-by-case basis according to the specific terms of your service agreement. 
                  Contact us to discuss refund requests.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Cancellation</h3>
                <p className="text-neutral-300 leading-relaxed mb-6">
                  You may cancel your service at any time by contacting us. Cancellation terms vary depending 
                  on the specific service agreement.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Price Changes</h3>
                <p className="text-neutral-300 leading-relaxed">
                  We reserve the right to modify our pricing with 30 days' notice. Existing contracts will 
                  honor the original pricing terms until renewal.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Termination and Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Termination
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Governing Law
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
                RekaKarya operates, without regard to its conflict of law provisions.
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@rekakarya.com" className="text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 underline">
                legal@rekakarya.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}