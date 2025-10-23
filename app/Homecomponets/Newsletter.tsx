"use client";
import { motion } from "framer-motion";
import TopInfo from "../__global_components/TopInfo";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Newsletter() {
  const [email, setemail] = useState("")
  const handleSubscribe = () => {
if(!email) {
  toast.error("Plese provide a valid email address!!")
  return
}
    
    toast.success("Subscribed!");
    setemail("")
  };
  return (
    <section className="py-20">
      <TopInfo
        title="Stay in the Loop"
        desc="Subscribe to get exclusive offers, style updates, and 10% off your first order."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto mt-8 flex flex-col sm:flex-row items-center gap-3 bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-gray-100 px-4 py-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e)=>setemail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 px-2"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubscribe}
          className="flex items-center gap-2 cursor-pointer bg-black text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all"
        >
          <Send className="w-4 h-4" />
          Subscribe
        </motion.button>
        
      </motion.div>

      {/* Subtle background glow */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-gray-200/30 blur-[100px] rounded-full -z-10 mt-[-100px]" />
    </section>
  );
}
