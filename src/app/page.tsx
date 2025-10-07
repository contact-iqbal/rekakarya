'use client'

import { useEffect, useRef, useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette, faCode, faBullhorn, faObjectGroup, faCheck } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className="overflow-x-hidden w-full min-h-screen bg-gradient-to-br from-[#ffffff] via-[#fff5f5] to-[#fefce8] dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 transition-colors duration-500">
      <Navigation />

      {/* Hero Section */}
      <section className="w-full pt-40 pb-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f5f2da] to-transparent dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 dark:text-white flex flex-col justify-center gap-4 text-center items-center pl-3 pr-3">
        <img src="/dotpreview.png" className='w-[10rem] sm:w-[15rem]' alt="" />
        <h1 className="text-4xl font-extrabold md:text-5xl max-w-[600px] dark:max-w-[900px] font-[mono-space] dark:font-[arial]">
          Affordable And Professional Website Solutions
        </h1>

        <p className="text-sm md:text-md max-w-[440px] text-gray-500 dark:text-neutral-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad deserunt corporis voluptate reiciendis voluptatibus dolor ratione nihil dolorum doloremque id, non
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-3 font-[arial] w-full">
          <span className="p-3 flex items-center gap-2 font-semibold">
            <FontAwesomeIcon icon={faCheck} className="text-[#fb835b] dark:text-white" />
            Pixel Perfect Designs
          </span>
          <span className="p-3 flex items-center gap-2 font-semibold">
            <FontAwesomeIcon icon={faCheck} className="text-[#fb835b] dark:text-white" />
            Fast Performance
          </span>
          <span className="p-3 flex items-center gap-2 font-semibold">
            <FontAwesomeIcon icon={faCheck} className="text-[#fb835b] dark:text-white" />
            Scalable Solutions
          </span>
        </div>
      </section>

      {/* UI Image Section */}
      <section className="w-full flex h-auto gap-4 justify-center items-center p-5 relative">
        <span className='absolute h-full w-32 left-0 z-[1] bg-gradient-to-l from-transparent to-[#fff5f5] dark:to-neutral-900'></span>
        <img src="/map1.png" className='max-w-[20rem] md:max-w-[40rem] shadow-lg rounded-xl' alt="imagepreview" />
        <img src="/map2.png" className='max-w-[20rem] md:max-w-[40rem] shadow-lg rounded-xl' alt="imagepreview" />
        <img src="/map3.png" className='max-w-[20rem] md:max-w-[40rem] shadow-lg rounded-xl' alt="imagepreview" />
        <img src="/map4.png" className='max-w-[20rem] md:max-w-[40rem] shadow-lg rounded-xl' alt="imagepreview" />
        <span className='absolute h-full w-32 right-0 z-[1] bg-gradient-to-r from-transparent to-[#fff5f5] dark:to-neutral-900'></span>
      </section>

      {/* Trusted Section */}
      <section className="w-full flex flex-col justify-center items-center gap-4 px-4 py-16">
        <p className="text-neutral-500 text-xs sm:text-sm md:text-base font-semibold text-center">
          Dipercaya oleh Perusahaan & Komunitas
        </p>

        <div className="w-full flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14 mt-4">
          <img
            src="/forest.png"
            className="w-24 sm:w-28 md:w-36 grayscale opacity-60 hover:opacity-100 transition-opacity duration-300"
            alt="forest"
          />
          <img
            src="/ych.png"
            className="w-24 sm:w-28 md:w-36 grayscale opacity-60 hover:opacity-100 transition-opacity duration-300"
            alt="ych"
          />
          <img
            src="/antartika2.png"
            className="w-24 sm:w-28 md:w-36 grayscale opacity-60 hover:opacity-100 transition-opacity duration-300"
            alt="antartika2"
          />
        </div>
      </section>


      {/* your ideas */}
      <section className="w-full flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20 transition-colors duration-500">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 dark:text-white leading-snug">
          We Connect Your <span className="text-[#fb835b]">Big Ideas</span>
        </h2>

        <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base max-w-md sm:max-w-2xl mb-10">
          Bringing every detail of your unique message to life with powerful, resonant design that goes beyond aesthetics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl text-left">
          {/* Left Column */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="font-semibold text-base sm:text-lg flex items-start sm:items-center gap-2 dark:text-white">
                <span className="text-[#fb835b] text-lg sm:text-xl">✦</span>
                Promote Innovation and Adaptability
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm mt-1 leading-relaxed">
                To stay at the forefront of design trends and technological advancements.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base sm:text-lg flex items-start sm:items-center gap-2 dark:text-white">
                <span className="text-[#fb835b] text-lg sm:text-xl">✦</span>
                Deliver High-Impact Solutions
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm mt-1 leading-relaxed">
                To consistently provide innovative, creative solutions that address client needs and enhance brand identity.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base sm:text-lg flex items-start sm:items-center gap-2 dark:text-white">
                <span className="text-[#fb835b] text-lg sm:text-xl">✦</span>
                Build Trust and Long-Term Relationships
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm mt-1 leading-relaxed">
                To foster partnerships built on transparency, reliability, and a commitment to client success.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="font-semibold text-base sm:text-lg flex items-start sm:items-center gap-2 dark:text-white">
                <span className="text-[#fb835b] text-lg sm:text-xl">✦</span>
                Create Meaningful Engagement
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm mt-1 leading-relaxed">
                To design visuals that not only capture attention but also foster deep, authentic connections with audiences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base sm:text-lg flex items-start sm:items-center gap-2 dark:text-white">
                <span className="text-[#fb835b] text-lg sm:text-xl">✦</span>
                Champion a Collaborative Process
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm mt-1 leading-relaxed">
                To work closely with clients at every stage, from concept development to final execution.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-base sm:text-lg flex items-start sm:items-center gap-2 dark:text-white">
                <span className="text-[#fb835b] text-lg sm:text-xl">✦</span>
                Drive Consistency and Clarity
              </h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm mt-1 leading-relaxed">
                To maintain a consistent design language across all platforms.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Our Services Section */}
      <section className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 py-16 sm:py-20 transition-colors duration-500">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 dark:text-white">
          Our Services
        </h2>
        <p className="text-gray-600 dark:text-neutral-400 max-w-2xl text-sm sm:text-base mb-12 sm:mb-14">
          Our team combines creativity and technical precision to deliver results-driven strategies that reflect the essence of your brand.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-6xl w-full">
          {/* Service 1 */}
          <div className="flex flex-col text-start p-5 sm:p-6 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <FontAwesomeIcon icon={faPalette} className="mb-4 sm:mb-5 text-2xl text-[#fb835b] dark:text-white" />
            <h3 className="font-semibold text-base sm:text-lg dark:text-white">Graphic Design & Branding</h3>
            <p className="text-gray-600 dark:text-neutral-400 text-sm mt-2 leading-relaxed">
              Building a strong visual identity, from logos and color palettes to promotional materials that enhance customer experience.
            </p>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col text-start p-5 sm:p-6 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <FontAwesomeIcon icon={faCode} className="mb-4 sm:mb-5 text-2xl text-[#fb835b] dark:text-white" />
            <h3 className="font-semibold text-base sm:text-lg dark:text-white">Web Development</h3>
            <p className="text-gray-600 dark:text-neutral-400 text-sm mt-2 leading-relaxed">
              Developing responsive, accessible, and optimized websites that deliver the best user experience.
            </p>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col text-start p-5 sm:p-6 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <FontAwesomeIcon icon={faBullhorn} className="mb-4 sm:mb-5 text-2xl text-[#fb835b] dark:text-white" />
            <h3 className="font-semibold text-base sm:text-lg dark:text-white">Digital Marketing</h3>
            <p className="text-gray-600 dark:text-neutral-400 text-sm mt-2 leading-relaxed">
              Expanding your business reach and visibility through SEO, PPC ads, social media, and digital content.
            </p>
          </div>

          {/* Service 4 */}
          <div className="flex flex-col text-start p-5 sm:p-6 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <FontAwesomeIcon icon={faObjectGroup} className="mb-4 sm:mb-5 text-2xl text-[#fb835b] dark:text-white" />
            <h3 className="font-semibold text-base sm:text-lg dark:text-white">UI/UX Design</h3>
            <p className="text-gray-600 dark:text-neutral-400 text-sm mt-2 leading-relaxed">
              Designing intuitive user experiences and visually appealing interfaces for your apps or website.
            </p>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="w-full flex justify-center items-center px-4 sm:px-6 md:px-10 py-10 sm:py-16 transition-colors duration-500">
        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Card 1 */}
          <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-center items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-2">98%</h3>
            <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xs">
              98% satisfied clients with the quality of our work and give appreciation.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-center items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-2">15,000</h3>
            <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xs">
              Over 15,000 clients have chosen us to bring their digital visions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-neutral-950 rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10 flex flex-col justify-center items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-2">10K+</h3>
            <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xs">
              With more than 10,000 projects successfully launched.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
