import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Brain, Award } from 'lucide-react';

const AboutTabContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 gradient-text">About K-Scholar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              AI-Powered Matching
            </h3>
            <p className="text-gray-600 mb-4">
              Our advanced algorithm analyzes your academic profile, interests, and goals to find the most relevant scholarship opportunities. Get personalized matches with accuracy scores.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Web Scraping Technology
            </h3>
            <p className="text-gray-600 mb-4">
              Automatically discover new scholarships from major educational platforms and websites. Our scraping engine continuously finds fresh opportunities you might miss.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Sentiment Analysis
            </h3>
            <p className="text-gray-600 mb-4">
              Evaluate scholarship quality through sentiment analysis of reviews and descriptions. Make informed decisions based on community feedback and ratings.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-600" />
              Comprehensive Database
            </h3>
            <p className="text-gray-600 mb-4">
              Access thousands of scholarships from various categories including merit-based, need-based, field-specific, and community service awards.
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
              <h4 className="font-medium mb-1">Complete Profile</h4>
              <p className="text-sm text-gray-600">Fill out your academic and personal information</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
              <h4 className="font-medium mb-1">AI Matching</h4>
              <p className="text-sm text-gray-600">Our AI finds relevant scholarships for you</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
              <h4 className="font-medium mb-1">Review & Apply</h4>
              <p className="text-sm text-gray-600">Browse matches and apply to scholarships</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">4</div>
              <h4 className="font-medium mb-1">Track Progress</h4>
              <p className="text-sm text-gray-600">Monitor applications and deadlines</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutTabContent;