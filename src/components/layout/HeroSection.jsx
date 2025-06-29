import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, Globe, Brain } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="hero-pattern text-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="p-5 bg-white/10 rounded-full backdrop-blur-md shadow-lg">
              <GraduationCap className="h-20 w-20 text-yellow-300 animate-float" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 
            bg-gradient-to-r from-yellow-300 via-white to-yellow-200 
            bg-clip-text text-transparent drop-shadow-md">
            K-Scholar
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-beige-100 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            Unlock your future. Discover, analyze, and match with thousands of scholarships using our intelligent platform.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {[
              { icon: <Sparkles className="h-5 w-5 text-yellow-300" />, text: "AI-Powered Matching" },
              { icon: <Globe className="h-5 w-5 text-sky-300" />, text: "Web Scraping Engine" },
              { icon: <Brain className="h-5 w-5 text-pink-300" />, text: "Sentiment Analysis" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="flex items-center gap-2 bg-black/20 px-5 py-3 rounded-full backdrop-blur-sm shadow-md hover:bg-black/30 transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;