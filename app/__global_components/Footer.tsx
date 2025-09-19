"use client"
import Link from 'next/link';
import React from 'react';
import { FaTiktok } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { toast } from 'sonner';


const Footer: React.FC = () => {

  const handleSubmit=(e:any)=>{
    e.preventDefault()
    toast.success("Thanks for subscribing")
  }
  return (
    <footer className="bg-gray-950 text-gray-300 my-10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10 pb-10 border-b border-gray-800">
          
          {/* Company Info & Socials */}
          <div className="lg:col-span-2 space-y-4 pr-8">
            <h3 className="text-2xl font-bold text-white tracking-wide"> Flexin</h3>
            <p className="text-sm">
              Redefine your style with our premium collection of clothing, footwear, and accessories. We are committed to bringing you the best in fashion.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook/>
              </a>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaYoutube />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaTiktok  />
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors duration-300">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Careers</Link></li>
            </ul>
          </div>
          
          {/* Shop Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Men&lsquo;s Apparel</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Women&lsquo;s Apparel</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Sale</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors duration-300">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left pt-6 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <h4 className="text-lg font-semibold text-white mb-2">Join Our Newsletter</h4>
            <p className="text-sm mb-4">
              Get the latest updates, offers, and trends delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-800 text-white"
              />
              <button
                type="submit"
                className="py-2 px-6 cursor-pointer bg-sky-600 text-white rounded-r-md hover:bg-sky-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          <div className="w-full md:w-1/2 text-right">
            <p className="text-sm text-gray-500 mt-8 md:mt-0">
              &copy; {new Date().getFullYear()}  Flexin. All rights reserved.
            </p>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;