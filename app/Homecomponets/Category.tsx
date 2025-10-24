'use client';
import { motion } from 'framer-motion';
import { Shirt, ShoppingBag, Watch, Gem, ShoppingBasket, Handbag } from 'lucide-react';
import TopInfo from '../__global_components/TopInfo';

const categories = [
    { name: 'Men', icon: <Shirt className="w-10 h-10 text-rose-500" /> },
    { name: 'Women', icon: <ShoppingBag className="w-10 h-10 text-yellow-500" /> },
    { name: 'Accessories', icon: <Watch className="w-10 h-10" /> },
    { name: 'Jewelry', icon: <Gem className="w-10 h-10 text-purple-500" /> },
    { name: 'Shoes', icon: <ShoppingBasket className="w-10 h-10 text-indigo-500" /> },
    { name: 'Bags', icon: <Handbag className="w-10 h-10 text-red-500" /> },
];

export default function CategoryMarquee() {
    return (
        <section className="relative py-16 bg-white overflow-hidden">
     <TopInfo title="Shop by Category" desc="Explore the best styles curated for you." />

            

            <div className="relative w-full overflow-hidden">
                <motion.div
                    className="flex gap-8 items-center"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'easeIn' }}
                >
                    {[...categories, ...categories].map((cat, i) => (
                        <motion.div
                            key={i}
                          
                            className="flex flex-col items-center justify-center min-w-[160px] h-[160px] rounded-2xl   hover:bg-gray-100/60 border border-gray-200/60 shadow-2xl shadow-gray-100  text-gray-800 transition cursor-pointer"
                        >
                            <div className="mb-3 text-gray-600">{cat.icon}</div>
                            <span className="text-base font-semibold">{cat.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
