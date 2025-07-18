'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  avatar: string
  quote: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Isabella Rodriguez",
    position: "CEO and Co-founder",
    company: "ABC Company",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    quote: "Their ability to capture our brand essence in every project is unparalleled - an invaluable creative collaborator.",
    rating: 5
  },
  {
    id: 2,
    name: "Gabrielle Williams",
    position: "CEO and Co-founder",
    company: "ABC Company",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    quote: "Creative geniuses who listen, understand, and craft captivating visuals - an agency that truly understands our needs.",
    rating: 5
  },
  {
    id: 3,
    name: "Samantha Johnson",
    position: "CEO and Co-founder",
    company: "ABC Company",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    quote: "Exceeded our expectations with innovative designs that brought our vision to life - a truly remarkable creative agency.",
    rating: 5
  },
  {
    id: 4,
    name: "Victoria Thompson",
    position: "CEO and Co-founder",
    company: "ABC Company",
    avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150",
    quote: "A refreshing and imaginative agency that consistently delivers exceptional results - highly recommended for any project.",
    rating: 5
  },
  {
    id: 5,
    name: "John Peter",
    position: "CEO and Co-founder",
    company: "ABC Company",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    quote: "Their team's artistic flair and strategic approach resulted in remarkable campaigns - a reliable creative partner.",
    rating: 5
  },
  {
    id: 6,
    name: "Natalie Martinez",
    position: "CEO and Co-founder",
    company: "ABC Company",
    avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
    quote: "From concept to execution, their creativity knows no bounds - a game-changer for our brand's success.",
    rating: 5
  }
]

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const topRowRef = useRef<HTMLDivElement>(null)
  const bottomRowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  
  const [isPaused, setIsPaused] = useState(false)

  // Split testimonials into two rows
  const topRowTestimonials = testimonials.slice(0, 3)
  const bottomRowTestimonials = testimonials.slice(3, 6)

  useEffect(() => {
    if (!isInView) return

    const animateRow = (element: HTMLElement, direction: 'left' | 'right') => {
      if (!element || isPaused) return

      const scrollWidth = element.scrollWidth
      const clientWidth = element.clientWidth
      const maxScroll = scrollWidth - clientWidth

      if (maxScroll <= 0) return

      let currentScroll = element.scrollLeft
      const speed = 1.2 // pixels per frame - much faster
      
      const animate = () => {
        if (isPaused) return

        if (direction === 'right') {
          currentScroll += speed
          if (currentScroll >= maxScroll) {
            currentScroll = 0
          }
        } else {
          currentScroll -= speed
          if (currentScroll <= 0) {
            currentScroll = maxScroll
          }
        }
        
        element.scrollLeft = currentScroll
        requestAnimationFrame(animate)
      }
      
      animate()
    }

    const topElement = topRowRef.current
    const bottomElement = bottomRowRef.current

    if (topElement && bottomElement) {
      animateRow(topElement, 'right')
      animateRow(bottomElement, 'left')
    }
  }, [isInView, isPaused])

  const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div
      className="flex-shrink-0 w-80 md:w-96 bg-white dark:bg-black rounded-2xl p-6 md:p-8 shadow-lg border border-neutral-300 dark:border-neutral-700 mr-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote size={32} className="text-neutral-800 dark:text-neutral-200" />
      </div>

      {/* Quote Text */}
      <blockquote className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-6 font-medium">
        {testimonial.quote}
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-neutral-900 dark:text-white text-sm md:text-base">
            {testimonial.name}
          </h4>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm">
            {testimonial.position} of {testimonial.company}
          </p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center space-x-1 mt-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="text-neutral-800 dark:text-neutral-200 fill-current"
          />
        ))}
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-50 dark:bg-neutral-900 py-20 md:py-28 lg:py-36 transition-colors duration-500 overflow-hidden"
    >
      {/* Testimonials Grid - Two Rows with Fade Effects */}
      <div className="space-y-8">
        {/* Top Row - Scrolling Right */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-neutral-50 dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
          
          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-neutral-50 dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
          
          <div
            ref={topRowRef}
            className="flex overflow-x-hidden scrollbar-hide"
            style={{ 
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Duplicate testimonials for seamless loop */}
            {[...topRowTestimonials, ...topRowTestimonials, ...topRowTestimonials].map((testimonial, index) => (
              <TestimonialCard
                key={`top-${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>

        {/* Bottom Row - Scrolling Left */}
        <div className="relative">
          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-neutral-50 dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
          
          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-neutral-50 dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
          
          <div
            ref={bottomRowRef}
            className="flex overflow-x-hidden scrollbar-hide"
            style={{ 
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Duplicate testimonials for seamless loop */}
            {[...bottomRowTestimonials, ...bottomRowTestimonials, ...bottomRowTestimonials].map((testimonial, index) => (
              <TestimonialCard
                key={`bottom-${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection