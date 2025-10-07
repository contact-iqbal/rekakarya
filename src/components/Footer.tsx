'use client'

import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer: React.FC = () => {
  return (
    <footer className="dark:from-neutral-950 dark:to-neutral-900 text-neutral-800 dark:text-white">
      {/* CTA Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mb-6">
          Let’s create something impactful together with{' '}
          <span className="text-[#fb835b]">RekaKarya</span>.
        </h2>
        <Link
          href="/contact"
          className="bg-[#fb835b] hover:bg-[#e46b45] text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300"
        >
          Let’s Talk
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-extrabold mb-4">
            RekaKarya<span className="text-[#fb835b]">.</span>
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 max-w-sm mx-auto md:mx-0">
            We build digital experiences that empower your business — websites, mobile apps, and beyond.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center justify-center space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#fb835b] dark:hover:text-white">Home</Link>
          <Link href="/services" className="hover:text-[#fb835b] dark:hover:text-white">Services</Link>
          <Link href="/product" className="hover:text-[#fb835b] dark:hover:text-white">Product</Link>
          <Link href="/careers" className="hover:text-[#fb835b] dark:hover:text-white">Careers</Link>
          <Link href="/contact" className="hover:text-[#fb835b] dark:hover:text-white">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end items-center space-x-6">
          <a href="https://www.tiktok.com/@rekakarya.studio?_t=ZS-90LNY02trim&_r=1" aria-label="TikTok" className="transition-transform hover:scale-110 duration-200">
            <FontAwesomeIcon icon={faTiktok} className="text-[#fb835b] dark:text-white text-xl hover:text-[#e46b45] transition-colors duration-200" />
          </a>

          <a href="https://www.instagram.com/rekakarya.studio?igsh=MWswaHFreG1hdGJnYg==" aria-label="Instagram" className="transition-transform hover:scale-110 duration-200">
            <FontAwesomeIcon icon={faInstagram} className="text-[#fb835b] dark:text-white text-xl hover:text-[#e46b45] transition-colors duration-200" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 md:px-16 text-sm text-neutral-500 dark:text-neutral-400">
          <p>© 2025 RekaKarya. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-[#fb835b] dark:hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#fb835b] dark:hover:text-white">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-[#fb835b] dark:hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
