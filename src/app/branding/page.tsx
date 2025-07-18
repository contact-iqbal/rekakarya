'use client'

import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Code, Palette, Smartphone, Globe, Database, Shield, Zap, Users, Briefcase, Target, Lightbulb, Rocket } from 'lucide-react'

export default function BrandingPage() {
  const processRef = useRef(null)
  const isProcessInView = useInView(processRef, { once: true, amount: 0.2 })

  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Strategy",
      description: "Comprehensive brand positioning and strategic planning to establish your unique market presence.",
      features: ["Market Research", "Competitor Analysis", "Brand Positioning", "Brand Architecture"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Visual Identity",
      description: "Creating distinctive visual elements that represent your brand across all touchpoints.",
      features: ["Logo Design", "Color Palette", "Typography", "Brand Guidelines"]
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Brand Messaging",
      description: "Crafting compelling brand voice and messaging that resonates with your target audience.",
      features: ["Brand Voice", "Messaging Framework", "Taglines", "Content Strategy"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Brand Experience",
      description: "Designing cohesive brand experiences across digital and physical touchpoints.",
      features: ["Website Design", "Marketing Materials", "Packaging", "Environmental Design"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Brand Management",
      description: "Ongoing brand stewardship to maintain consistency and evolve with your business.",
      features: ["Brand Audits", "Guidelines Training", "Asset Management", "Brand Evolution"]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Brand Launch",
      description: "Strategic brand launch and rollout to maximize impact and market penetration.",
      features: ["Launch Strategy", "Campaign Development", "Stakeholder Training", "Performance Tracking"]
    }
  ]

  const process = [
    {
      step: "01",
      title: "Discovery & Research",
      description: "We dive deep into your business, market, and audience to understand your unique challenges and opportunities."
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "Based on our research, we develop a comprehensive brand strategy that aligns with your business goals."
    },
    {
      step: "03",
      title: "Creative Execution",
      description: "Our creative team brings your brand to life through compelling visual identity and messaging."
    },
    {
      step: "04",
      title: "Implementation",
      description: "We help implement your new brand across all touchpoints, ensuring consistency and impact."
    },
    {
      step: "05",
      title: "Launch & Support",
      description: "We support your brand launch and provide ongoing guidance to maintain brand integrity."
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <span className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-medium px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-full backdrop-blur-sm bg-neutral-100/50 dark:bg-neutral-800/50">
                Branding
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white mb-8 tracking-tight leading-tight">
              We Build Your Brand
              <br />
              <span className="text-neutral-700 dark:text-neutral-300">
                Identity
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              From brand strategy to visual identity, we create compelling brand experiences that 
              resonate with your audience and drive business growth. Our comprehensive branding 
              services help establish your unique market position.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Our Branding Services
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Comprehensive branding solutions to establish and elevate your brand presence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-neutral-900 dark:text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center">
                      <div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Our Process
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              A proven methodology that ensures your brand resonates with your audience and drives results
            </p>
          </motion.div>

          <div className="space-y-12">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isProcessInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="text-6xl md:text-7xl font-black text-neutral-200 dark:text-neutral-700 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900 dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your Brand?
            </h2>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
              Let's create a brand identity that sets you apart from the competition and resonates with your audience.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-white text-neutral-900 font-semibold rounded-full hover:bg-neutral-100 transition-colors duration-300"
            >
              Start Your Brand Journey
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}