import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, MapPin, ExternalLink, Users, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSentimentAnalysis } from '@/hooks/useSentimentAnalysis';

const ScholarshipCard = ({ scholarship, index, matchScore }) => {
  const { getSentimentColor, getSentimentEmoji } = useSentimentAnalysis();
  
  const formatDeadline = (deadline) => {
    if (!deadline) return 'N/A';
    const date = new Date(deadline);
    if (isNaN(date.getTime())) return 'Invalid Date';
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Due Today!';
    if (diffDays === 1) return 'Due Tomorrow!';
    if (diffDays <= 7) return `${diffDays} days left`;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getUrgencyColor = (deadline) => {
    if (!deadline) return 'text-muted-foreground';
    const date = new Date(deadline);
    if (isNaN(date.getTime())) return 'text-muted-foreground';
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-destructive';
    if (diffDays <= 7) return 'text-orange-600 dark:text-orange-400';
    if (diffDays <= 30) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="scholarship-card h-full flex flex-col overflow-hidden">
        {matchScore && matchScore > 70 && (
          <div className="absolute top-0 right-0 bg-gradient-to-br from-accent to-yellow-500 text-white px-3 py-1.5 text-xs font-bold rounded-bl-lg rounded-tr-md shadow-md z-10 flex items-center gap-1">
            <TrendingUp size={14} /> {matchScore}% Match
          </div>
        )}
        <CardHeader className="pb-3 pt-5 px-5 bg-secondary/30">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold mb-1 text-primary leading-tight">
                {scholarship.title || "Untitled Scholarship"}
              </CardTitle>
              <CardDescription className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                {scholarship.provider || "Unknown Provider"}
              </CardDescription>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xl font-bold text-green-600 dark:text-green-400 mb-0.5">
                {scholarship.amount || "$0"}
              </div>
              {typeof scholarship.sentiment === 'number' && (
                <div className={`text-xs flex items-center justify-end gap-1 ${getSentimentColor(scholarship.sentiment)}`}>
                  {getSentimentEmoji(scholarship.sentiment)} 
                  <span>{(scholarship.sentiment * 100).toFixed(0)}%</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-5 space-y-3 text-sm flex-grow">
          <p className="text-muted-foreground leading-normal line-clamp-3">
            {scholarship.description || "No description available."}
          </p>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span className={`font-medium ${getUrgencyColor(scholarship.deadline)}`}>
                {formatDeadline(scholarship.deadline)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-green-500" />
              <span className="text-muted-foreground">{scholarship.location || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-purple-500" />
              <span className="text-muted-foreground">{scholarship.field || "Any Field"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-yellow-500" />
              <Badge variant="outline" className="px-1.5 py-0.5 text-xs">{scholarship.category || "General"}</Badge>
            </div>
          </div>
          
          {scholarship.eligibility && scholarship.eligibility.length > 0 && (
            <div className="space-y-1 pt-1">
              <h4 className="font-medium text-xs text-foreground">Eligibility:</h4>
              <div className="flex flex-wrap gap-1">
                {scholarship.eligibility.slice(0,3).map((req, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground">
                    {req}
                  </Badge>
                ))}
                {scholarship.eligibility.length > 3 && <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground">...</Badge>}
              </div>
            </div>
          )}
        </CardContent>
        
        <div className="p-4 pt-2 border-t border-border mt-auto">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
            onClick={() => scholarship.applicationLink && window.open(scholarship.applicationLink, '_blank')}
            disabled={!scholarship.applicationLink}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ScholarshipCard;