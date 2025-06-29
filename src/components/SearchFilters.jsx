import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchFilters = ({ filters, onFiltersChange, onReset }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const filterOptions = {
    amountRange: [
      { value: "", label: "Any Amount" },
      { value: "0-2500", label: "$0 - $2,500" },
      { value: "2500-5000", label: "$2,500 - $5,000" },
      { value: "5000-10000", label: "$5,000 - $10,000" },
      { value: "10000-20000", label: "$10,000 - $20,000" },
      { value: "20000+", label: "$20,000+" },
    ],
    category: [
      { value: "", label: "All Categories" },
      { value: "Merit-Based", label: "Merit-Based" },
      { value: "Need-Based", label: "Need-Based" },
      { value: "Field-Specific", label: "Field-Specific" },
      { value: "Community Service", label: "Community Service" },
      { value: "Minority", label: "Minority" },
      { value: "Athletic", label: "Athletic" },
      { value: "Research", label: "Research" },
      { value: "Essay Contest", label: "Essay Contest" },
    ],
    field: [
      { value: "", label: "Any Field" },
      { value: "STEM", label: "STEM" },
      { value: "Business", label: "Business" },
      { value: "Arts", label: "Arts" },
      { value: "Medicine", label: "Medicine" },
      { value: "Education", label: "Education" },
      { value: "Humanities", label: "Humanities" },
      { value: "Social Sciences", label: "Social Sciences" },
      { value: "Law", label: "Law" },
      { value: "Environmental Science", label: "Environmental Science" },
      { value: "Journalism", label: "Journalism" },
    ],
    location: [
      { value: "", label: "Any Location" },
      { value: "Nationwide", label: "Nationwide" },
      { value: "California", label: "California" },
      { value: "Texas", label: "Texas" },
      { value: "Florida", label: "Florida" },
      { value: "New York", label: "New York" },
      { value: "Illinois", label: "Illinois" },
      { value: "Online", label: "Online" },
      { value: "International", label: "International" },
    ],
    deadline: [
      { value: "", label: "Any Deadline" },
      { value: "week", label: "Next 7 days" },
      { value: "month", label: "Next 30 days" },
      { value: "quarter", label: "Next 3 months" },
      { value: "halfyear", label: "Next 6 months" },
    ],
    sentiment: [
      { value: "", label: "Any Rating" },
      { value: "high", label: "Highly Rated (80%+)" },
      { value: "medium", label: "Well Rated (60%+)" },
      { value: "all", label: "All (incl. unrated)" },
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-6"
    >
      <Card className="scholarship-card shadow-lg">
        <CardHeader className="bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-t-lg py-4 px-5">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filter Scholarships
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by keyword..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 bg-input border-border focus:ring-ring"
            />
          </div>
          
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key}>
              <label className="text-sm font-medium mb-1.5 block text-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              <Select
                value={filters[key]}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                className="bg-input border-border focus:ring-ring text-foreground"
              >
                {options.map(opt => (
                  <option key={opt.value} value={opt.value} className="text-foreground bg-background">
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            onClick={onReset}
            className="w-full border-primary text-primary hover:bg-primary/10"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All Filters
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SearchFilters;