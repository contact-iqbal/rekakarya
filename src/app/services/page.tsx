'use client'

import { useRef, useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Code, Palette, Smartphone, Globe, Database, Shield } from 'lucide-react'

const services = [
  {
    id: 1,
    title: "Web Development",
    subtitle: "Custom Digital Solutions",
    description: "We create modern, responsive websites and web applications that deliver exceptional user experiences. From simple landing pages to complex e-commerce platforms, our development team uses cutting-edge technologies to bring your vision to life.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "from-blue-500 to-blue-600",
    features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration", "Performance Optimization", "SEO Implementation"]
  },
  {
    id: 2,
    title: "Mobile Development",
    subtitle: "Native & Cross-Platform Apps",
    description: "Transform your ideas into powerful mobile applications. We develop native iOS and Android apps, as well as cross-platform solutions that work seamlessly across all devices, ensuring your users have the best possible mobile experience.",
    image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "from-purple-500 to-purple-600",
    features: ["iOS & Android", "React Native", "Flutter", "App Store Deployment", "Push Notifications", "Offline Functionality"]
  },
  {
    id: 3,
    title: "UI/UX Design",
    subtitle: "Beautiful User Experiences",
    description: "Our design team creates intuitive, beautiful interfaces that users love. We focus on user research, wireframing, and prototyping to ensure every interaction is meaningful and every design decision is backed by data and user feedback.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "from-orange-500 to-orange-600",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing", "Brand Integration"]
  },
  {
    id: 4,
    title: "Digital Strategy",
    subtitle: "Strategic Digital Transformation",
    description: "We help businesses navigate the digital landscape with comprehensive strategies that drive growth. Our strategic approach combines market analysis, technology consulting, and growth planning to ensure your digital transformation is successful.",
    image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "from-green-500 to-green-600",
    features: ["Market Analysis", "Technology Consulting", "Growth Strategy", "Digital Roadmap", "Competitive Analysis", "ROI Optimization"]
  },
  {
    id: 5,
    title: "Backend Development",
    subtitle: "Scalable Server Solutions",
    description: "Build robust, scalable backend systems that power your applications. We specialize in cloud architecture, database optimization, and API development to ensure your applications can handle growth and provide reliable performance.",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "from-indigo-500 to-indigo-600",
    features: ["Cloud Architecture", "Database Optimization", "API Development", "Security Implementation", "Microservices", "Performance Monitoring"]
  },
  {
    id: 6,
    title: "DevOps & Security",
    subtitle: "Secure Infrastructure Management",
    description: "Ensure your applications are secure, scalable, and efficiently deployed. Our DevOps team handles everything from CI/CD pipelines to security audits, giving you peace of mind and allowing you to focus on your business.",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "from-gray-500 to-gray-600",
    features: ["CI/CD Pipelines", "Cloud Deployment", "Security Audits", "Performance Monitoring", "Automated Testing", "Infrastructure as Code"]
  }
]

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentService, setCurrentService] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Transform scroll progress to service index
  const serviceProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, services.length - 1]
  )

  useEffect(() => {
    const unsubscribe = serviceProgress.onChange((latest) => {
      setCurrentService(Math.round(latest))
    })
    return unsubscribe
  }, [serviceProgress])

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 font-sans">
      <Navigation />
      
      {/* Horizontal Scrolling Services */}
      <div ref={containerRef} className="relative">
        {/* Fixed height container for scroll trigger */}
        <div className="h-[600vh]">
          {/* Sticky container */}
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Services slider */}
            <motion.div
              className="flex h-full"
              style={{
                x: useTransform(scrollYProgress, [0, 1], ['0%', `-${(services.length - 1) * 100}%`])
              }}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="min-w-full h-full flex items-center py-8 md:py-0"
                >
                  <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
                    <div className="max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                        
                        {/* Left Content */}
                        <motion.div
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="space-y-6 md:space-y-8 order-2 lg:order-1"
                        >
                          <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-3 md:mb-4 leading-tight tracking-tight">
                              {service.title}
                            </h2>
                            <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 mb-4 md:mb-6 font-medium">
                              {service.subtitle}
                            </p>
                            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {service.description}
                            </p>
                          </div>

                          {/* Features Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {service.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + featureIndex * 0.1 }}
                                className="flex items-center space-x-2"
                              >
                                <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full"></div>
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <motion.button
                            whileHover={{ scale: 1.05, x: 10 }}
                            whileTap={{ scale: 0.95 }}
                            className="group inline-flex items-center gap-3 text-neutral-900 dark:text-white font-semibold text-base md:text-lg hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors tracking-tight"
                          >
                            <span className="border-b border-neutral-400 dark:border-neutral-500 group-hover:border-neutral-600 dark:group-hover:border-neutral-400 transition-colors pb-1">
                              Learn More
                            </span>
                            <ArrowUpRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </motion.button>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="relative order-1 lg:order-2"
                        >
                          <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                            {/* Colored overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 mix-blend-multiply`} />
                            
                            {/* Service number */}
                            <div className="absolute top-4 left-4 md:top-6 md:left-6">
                              <span className="text-white font-black text-xl md:text-2xl tracking-tight">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-neutral-100 dark:bg-neutral-800 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 md:mb-6 tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8 leading-relaxed px-4">
              Let's create something amazing together. Contact us to discuss your project 
              and see how we can bring your vision to life.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-lg tracking-tight"
            >
              <span>Get Started</span>
              <ArrowUpRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}