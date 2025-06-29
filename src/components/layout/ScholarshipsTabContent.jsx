import React from 'react';
import SearchFilters from '@/components/SearchFilters';
import ScholarshipCard from '@/components/ScholarshipCard';
import { motion } from 'framer-motion';
import { Frown } from 'lucide-react';

const ScholarshipsTabContent = ({
  sortedScholarships,
  filters,
  onFiltersChange,
  onReset,
  getMatchScore
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <SearchFilters 
          filters={filters}
          onFiltersChange={onFiltersChange}
          onReset={onReset}
        />
      </div>
      <motion.div 
        className="lg:col-span-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 pb-4 border-b border-border">
          <h2 className="text-3xl font-bold mb-1 text-foreground">
            {sortedScholarships.length > 0 ? 'Your Scholarship Matches' : 'No Scholarships Found'}
          </h2>
          <p className="text-muted-foreground">
            {sortedScholarships.length > 0 
              ? `Showing ${sortedScholarships.length} scholarships, smartly sorted by relevance to your profile.`
              : 'Try adjusting your filters or updating your profile for better matches.'
            }
          </p>
        </div>
        {sortedScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {sortedScholarships.map((scholarship, index) => (
              <ScholarshipCard 
                key={scholarship.id || index} 
                scholarship={scholarship} 
                index={index} 
                matchScore={getMatchScore(scholarship)}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-16 bg-card rounded-lg shadow-md"
          >
            <Frown className="h-20 w-20 text-muted-foreground mb-6" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">No Matches Yet!</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any scholarships matching your current criteria.
              Try broadening your search filters or ensure your profile is complete and up-to-date.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ScholarshipsTabContent;