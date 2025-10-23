"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Style That Defines You",
    subtitle: "Discover premium fashion & lifestyle essentials.",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1600&q=80",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Exclusive Deals This Season",
    subtitle: "Get up to 50% off on selected collections.",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
    cta: "Explore Deals",
  },
  {
    id: 3,
    title: "Flexin New Arrivals",
    subtitle: "Be the first to grab the latest trends.",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
    cta: "View Collection",
  },
];

export  function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: index === current ? 1 : 0, scale: index === current ? 1 : 1.05 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.img}
            alt={slide.title}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col justify-center items-start px-10 lg:px-24 text-white">
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold mb-4"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg mb-6 max-w-xl text-gray-200"
            >
              {slide.subtitle}
            </motion.p>
            <Button size="lg" className="bg-white text-black font-semibold hover:bg-gray-200">
              {slide.cta}
            </Button>
          </div>
        </motion.div>
      ))}

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-6">
        <button
          onClick={prevSlide}
          className="p-2 cursor-pointer rounded-full bg-white/20 hover:bg-white/40 transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 cursor-pointer rounded-full bg-white/20 hover:bg-white/40 transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white w-5" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
