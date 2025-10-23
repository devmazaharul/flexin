"use client";
import { motion } from "framer-motion";
import TopInfo from "../__global_components/TopInfo";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Flexin has completely changed how I shop online. The quality and service are unmatched!",
  },
  {
    name: "Michael Lee",
    role: "Frequent Customer",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "Fast delivery and amazing product quality. I always find what I’m looking for here!",
  },
  {
    name: "Amina Rahman",
    role: "Fashion Enthusiast",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "The user experience is so smooth and modern. Love how clean everything looks!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 overflow-hidden">
      <TopInfo
        title="What Our Customers Say"
        desc="Real experiences from happy shoppers"
      />

      {/* Smooth marquee motion */}
      <motion.div
        className="flex gap-8 mt-12"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="min-w-[300px] sm:min-w-[340px] bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl shadow-gray-100 transition-all duration-300"
          >
            <Image
            width={300}
            height={300}
              src={t.image}
              alt={t.name}
              className="w-14 h-14 rounded-full mb-4 object-cover border border-gray-200"
            />
            <p className="text-gray-700 text-sm italic mb-4 leading-relaxed px-1">
              “{t.text}”
            </p>
            <h4 className="font-semibold text-gray-900">{t.name}</h4>
            <span className="text-xs text-gray-500">{t.role}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
