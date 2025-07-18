'use client'

import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Code, Palette, Smartphone, Globe, Database, Shield, Zap, Users, Briefcase, Target, Lightbulb, Rocket } from 'lucide-react'

const services = [
  {
    icon: <Code size={32} />,
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications",
    features: ["iOS & Android", "React Native", "Flutter", "App Store Deployment"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Palette size={32} />,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that users love",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <Globe size={32} />,
    title: "Digital Strategy",
    description: "Strategic planning for digital transformation",
    features: ["Market Analysis", "Technology Consulting", "Growth Strategy", "Digital Roadmap"],
    color: "from-green-500 to-teal-500"
  },
  {
    icon: <Database size={32} />,
    title: "Backend Development",
    description: "Scalable server-side solutions and APIs",
    features: ["Cloud Architecture", "Database Optimization", "API Development", "Security Implementation"],
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: <Shield size={32} />,
    title: "DevOps & Security",
    description: "Secure deployment and infrastructure management",
    features: ["CI/CD Pipelines", "Cloud Deployment", "Security Audits", "Performance Monitoring"],
    color: "from-gray-500 to-slate-500"
  }
]

const process = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We start by understanding your business goals, target audience, and technical requirements through detailed consultations and research.",
    icon: <Target size={24} />
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Our design team creates wireframes, mockups, and interactive prototypes to visualize your project before development begins.",
    icon: <Palette size={24} />
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "We build your solution using best practices, conduct thorough testing, and ensure everything works perfectly across all platforms.",
    icon: <Code size={24} />
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "After successful deployment, we provide ongoing support, maintenance, and optimization to ensure your project continues to succeed.",
    icon: <Rocket size={24} />
  }
]

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Figma", category: "Design" },
  { name: "React Native", category: "Mobile" }
]

export default function WhatWeDoPage() {
  const processRef = useRef(null)
  const isProcessInView = useInView(processRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <span className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-medium px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-full backdrop-blur-sm bg-neutral-100/50 dark:bg-neutral-800/50">
                What We Do
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-neutral-900 dark:text-white mb-8 tracking-tight leading-tight">
              We Create Digital
              <br />
              <span className="text-neutral-700 dark:text-neutral-300">
                Experiences
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              From concept to launch, we provide comprehensive digital solutions that help 
              businesses thrive in the modern world. Our expertise spans across web development, 
              mobile apps, design, and digital strategy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Our Services
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We offer a full range of digital services to help your business succeed online.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full"></div>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/btn inline-flex items-center gap-2 text-neutral-900 dark:text-white font-semibold hover:gap-3 transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Our Process
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We follow a proven methodology to ensure every project is delivered 
              on time, within budget, and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-600 dark:to-transparent z-0"></div>
                )}

                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white dark:border-neutral-900 shadow-lg">
                    <div className="text-neutral-700 dark:text-neutral-300">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                      {step.step}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-2">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Technologies We Use
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We work with the latest and most reliable technologies to build 
              robust, scalable solutions.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-neutral-900 px-6 py-4 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-center">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {tech.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Let's Build Something Amazing
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              Ready to transform your ideas into reality? Let's discuss your project 
              and create a digital solution that drives results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-lg"
              >
                <span>Start Your Project</span>
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-3 border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors"
              >
                <span>View Our Work</span>
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}