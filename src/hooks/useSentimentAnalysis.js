
import { useState, useCallback } from 'react';

export const useSentimentAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simple sentiment analysis function (mock implementation)
  const analyzeSentiment = useCallback((text) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple keyword-based sentiment analysis
        const positiveWords = ['excellent', 'amazing', 'great', 'wonderful', 'fantastic', 'outstanding', 'incredible', 'perfect', 'love', 'best'];
        const negativeWords = ['terrible', 'awful', 'bad', 'horrible', 'worst', 'hate', 'disappointing', 'poor', 'difficult', 'problems'];
        
        const words = text.toLowerCase().split(/\s+/);
        let score = 0.5; // neutral baseline
        
        words.forEach(word => {
          if (positiveWords.includes(word)) {
            score += 0.1;
          } else if (negativeWords.includes(word)) {
            score -= 0.1;
          }
        });
        
        // Clamp score between 0 and 1
        score = Math.max(0, Math.min(1, score));
        
        setIsAnalyzing(false);
        resolve({
          score,
          label: score > 0.6 ? 'Positive' : score < 0.4 ? 'Negative' : 'Neutral',
          confidence: Math.abs(score - 0.5) * 2
        });
      }, 1000);
    });
  }, []);

  const getSentimentColor = useCallback((score) => {
    if (score > 0.6) return 'text-green-600';
    if (score < 0.4) return 'text-red-600';
    return 'text-yellow-600';
  }, []);

  const getSentimentEmoji = useCallback((score) => {
    if (score > 0.7) return '😊';
    if (score > 0.6) return '🙂';
    if (score < 0.3) return '😞';
    if (score < 0.4) return '😐';
    return '😐';
  }, []);

  return {
    analyzeSentiment,
    getSentimentColor,
    getSentimentEmoji,
    isAnalyzing
  };
};
