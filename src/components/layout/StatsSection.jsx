import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Brain, Users } from 'lucide-react';

const StatCard = ({ icon, value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-card text-card-foreground rounded-xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300 glass-effect"
  >
    <div className={`inline-block p-3 rounded-full bg-gradient-to-br ${color} mb-3`}>
      {React.cloneElement(icon, { className: "h-8 w-8 text-white" })}
    </div>
    <div className="text-3xl font-bold text-foreground">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </motion.div>
);


const StatsSection = ({ stats }) => {
  return (
    <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          icon={<Award />} 
          value={stats.totalScholarships} 
          label="Total Scholarships"
          color="from-blue-500 to-indigo-600"
          delay={0.1}
        />
        <StatCard 
          icon={<TrendingUp />} 
          value={`$${(stats.totalAmount / 1000).toFixed(0)}K`}
          label="Total Value"
          color="from-green-500 to-teal-600"
          delay={0.2}
        />
        <StatCard 
          icon={<Brain />} 
          value={`${(stats.avgSentiment * 100).toFixed(0)}%`}
          label="Avg. Positive Rating"
          color="from-purple-500 to-pink-600"
          delay={0.3}
        />
        <StatCard 
          icon={<Users />} 
          value={stats.matchingScholarships} 
          label="Your Potential Matches"
          color="from-yellow-500 to-orange-600"
          delay={0.4}
        />
      </div>
    </div>
  );
};

export default StatsSection;