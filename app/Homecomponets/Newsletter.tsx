"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import TopInfo from "../__global_components/TopInfo";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = async () => {
    if (!email.trim()) return toast.error("Please enter your email!");
    if (!isValidEmail(email)) return toast.error("Invalid email format!");
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500)); // simulate API
      toast.success("You're now subscribed 🎉");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubscribe();
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Header */}
      <TopInfo
        title="Stay in the Loop"
        desc="Subscribe to get exclusive offers, style updates, and 10% off your first order."
      />

      {/* Input box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-xl mx-auto mt-10 flex flex-col sm:flex-row items-center gap-3 bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-2xl shadow-gray-100 px-5 py-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter your email address"
          className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-800 placeholder-gray-400 px-2"
        />

        <motion.button
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          onClick={handleSubscribe}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-black text-white text-sm sm:text-base font-medium px-6 py-2.5 rounded-xl hover:bg-gray-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-4 h-4  border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <Send className="w-4 h-4" />
              Subscribe
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Gradient background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-r from-pink-200 via-blue-200 to-purple-200 blur-[120px] rounded-full -z-10" />
    </section>
  );
}
