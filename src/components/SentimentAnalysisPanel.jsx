
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageSquare, Loader2, TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSentimentAnalysis } from '@/hooks/useSentimentAnalysis';

const SentimentAnalysisPanel = ({ scholarships }) => {
  const { analyzeSentiment, getSentimentColor, getSentimentEmoji, isAnalyzing } = useSentimentAnalysis();
  const [customText, setCustomText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyzeText = async () => {
    if (!customText.trim()) return;
    
    try {
      const result = await analyzeSentiment(customText);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const getOverallSentiment = () => {
    if (!scholarships.length) return null;
    
    const totalSentiment = scholarships.reduce((sum, scholarship) => {
      return sum + (scholarship.sentiment || 0.5);
    }, 0);
    
    return totalSentiment / scholarships.length;
  };

  const getSentimentDistribution = () => {
    if (!scholarships.length) return { positive: 0, neutral: 0, negative: 0 };
    
    return scholarships.reduce((dist, scholarship) => {
      const sentiment = scholarship.sentiment || 0.5;
      if (sentiment > 0.6) dist.positive++;
      else if (sentiment < 0.4) dist.negative++;
      else dist.neutral++;
      return dist;
    }, { positive: 0, neutral: 0, negative: 0 });
  };

  const overallSentiment = getOverallSentiment();
  const distribution = getSentimentDistribution();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="scholarship-card">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Sentiment Analysis Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Overall Statistics */}
          {scholarships.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Scholarship Sentiment Overview
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">
                    {overallSentiment ? (
                      <span className={getSentimentColor(overallSentiment)}>
                        {getSentimentEmoji(overallSentiment)} {(overallSentiment * 100).toFixed(0)}%
                      </span>
                    ) : 'N/A'}
                  </div>
                  <div className="text-sm text-gray-600">Overall Rating</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {scholarships.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Scholarships</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Sentiment Distribution:</h4>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-green-600">
                    😊 Positive: {distribution.positive}
                  </Badge>
                  <Badge variant="outline" className="text-yellow-600">
                    😐 Neutral: {distribution.neutral}
                  </Badge>
                  <Badge variant="outline" className="text-red-600">
                    😞 Negative: {distribution.negative}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Custom Text Analysis */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Analyze Custom Text
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Analyze the sentiment of scholarship reviews, descriptions, or any text
            </p>
            
            <div className="space-y-3">
              <Input
                placeholder="Enter text to analyze (e.g., scholarship review, description...)"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                disabled={isAnalyzing}
              />
              
              <Button 
                onClick={handleAnalyzeText}
                disabled={isAnalyzing || !customText.trim()}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze Sentiment
                  </>
                )}
              </Button>
            </div>
            
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gray-50 rounded-lg"
              >
                <h4 className="font-medium mb-2">Analysis Result:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Sentiment:</span>
                    <Badge className={getSentimentColor(analysisResult.score)}>
                      {getSentimentEmoji(analysisResult.score)} {analysisResult.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Score:</span>
                    <span className={`font-bold ${getSentimentColor(analysisResult.score)}`}>
                      {(analysisResult.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Confidence:</span>
                    <span className="font-medium">
                      {(analysisResult.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Top Rated Scholarships */}
          {scholarships.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Top Rated Scholarships
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {scholarships
                  .filter(s => s.sentiment)
                  .sort((a, b) => b.sentiment - a.sentiment)
                  .slice(0, 5)
                  .map((scholarship, index) => (
                    <motion.div
                      key={scholarship.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center p-2 bg-white rounded border"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">{scholarship.title}</div>
                        <div className="text-xs text-gray-600">{scholarship.provider}</div>
                      </div>
                      <div className={`font-bold ${getSentimentColor(scholarship.sentiment)}`}>
                        {getSentimentEmoji(scholarship.sentiment)} {(scholarship.sentiment * 100).toFixed(0)}%
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">How Sentiment Analysis Works:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Analyzes text for positive, negative, and neutral language</li>
              <li>• Scores range from 0% (very negative) to 100% (very positive)</li>
              <li>• Helps identify the best-reviewed scholarships</li>
              <li>• Useful for evaluating scholarship provider reputation</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SentimentAnalysisPanel;
