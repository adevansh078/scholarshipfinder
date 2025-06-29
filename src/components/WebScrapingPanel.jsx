import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Globe, Search, Loader2, Database, Trash2, ExternalLink, PlusCircle, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebScraping } from '@/hooks/useWebScraping';
import { toast } from '@/components/ui/use-toast';

const WebScrapingPanel = ({ onNewScholarships }) => {
  const { scrapeScholarships, scrapeFromUrl, clearScrapedData, isScrapingActive, scrapedData } = useWebScraping();
  const [customUrl, setCustomUrl] = useState('');
  const [scrapingSources, setScrapingSources] = useState([
    'TopScholarships.com', 'GrantFinder.org', 'EduAwards.net', 'FutureFund.org', 'StudentAidCentral.com'
  ]);
  const [newSource, setNewSource] = useState('');

  const handleAutoScrape = async () => {
    if (scrapingSources.length === 0) {
      toast({
        title: "No Sources Selected",
        description: "Please add at least one scraping source.",
        variant: "destructive"
      });
      return;
    }
    try {
      const newItems = await scrapeScholarships(scrapingSources);
      if (newItems && newItems.length > 0) {
        onNewScholarships(newItems);
      }
    } catch (error) {
      console.error('Scraping failed:', error);
    }
  };

  const handleUrlScrape = async () => {
    if (!customUrl.trim()) return;
    try {
      const newItems = await scrapeFromUrl(customUrl);
       if (newItems && newItems.length > 0) {
        onNewScholarships(newItems);
      }
      setCustomUrl('');
    } catch (error) {
      console.error('URL scraping failed:', error);
    }
  };

  const addScrapingSource = () => {
    if (newSource.trim() && !scrapingSources.includes(newSource.trim())) {
      setScrapingSources(prev => [...prev, newSource.trim()]);
      setNewSource('');
      toast({ title: "Source Added", description: `${newSource.trim()} added to scraping list.` });
    }
  };

  const removeScrapingSource = (sourceToRemove) => {
    setScrapingSources(prev => prev.filter(source => source !== sourceToRemove));
    toast({ title: "Source Removed", description: `${sourceToRemove} removed from scraping list.` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="scholarship-card shadow-xl">
        <CardHeader className="bg-gradient-to-br from-purple-600 to-pink-600 text-primary-foreground rounded-t-lg py-5 px-6">
          <CardTitle className="flex items-center gap-2.5 text-xl">
            <Globe className="h-6 w-6" />
            Scholarship Discovery Engine
          </CardTitle>
          <CardDescription className="text-primary-foreground/80 text-sm">
            Automatically find new scholarships from various online sources.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-foreground">
                <ListChecks className="h-5 w-5 text-primary" />
                Manage Scraping Sources
              </h3>
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Add new source URL (e.g., myscholarships.com)"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  disabled={isScrapingActive}
                  className="bg-input border-border focus:ring-ring"
                />
                <Button onClick={addScrapingSource} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  <PlusCircle size={16} className="mr-2"/> Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 min-h-[2.5rem]">
                <AnimatePresence>
                  {scrapingSources.map(source => (
                    <motion.div
                      key={source}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-sm py-1 px-2.5 bg-muted text-muted-foreground cursor-pointer hover:bg-destructive/20 hover:text-destructive"
                        onClick={() => removeScrapingSource(source)}
                      >
                        {source} <span className="ml-1.5 font-bold">×</span>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <Button 
                onClick={handleAutoScrape}
                disabled={isScrapingActive || scrapingSources.length === 0}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-primary-foreground text-base py-3"
              >
                {isScrapingActive ? (
                  <><Loader2 className="h-5 w-5 mr-2 animate-spin" />Scraping...</>
                ) : (
                  <><Search className="h-5 w-5 mr-2" />Scrape from Managed Sources</>
                )}
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-foreground">
                <ExternalLink className="h-5 w-5 text-primary" />
                Scrape from Specific URL
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/scholarships-page"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  disabled={isScrapingActive}
                  className="bg-input border-border focus:ring-ring"
                />
                <Button 
                  onClick={handleUrlScrape}
                  disabled={isScrapingActive || !customUrl.trim()}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  {isScrapingActive ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {scrapedData.length > 0 && (
            <div className="border-t border-border pt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold flex items-center gap-2 text-foreground">
                  <Database className="h-5 w-5 text-primary" />
                  Recently Discovered ({scrapedData.length})
                </h3>
                <Button 
                  onClick={clearScrapedData}
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </div>
              
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-2">
                <AnimatePresence>
                {scrapedData.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="p-3.5 bg-secondary/50 rounded-lg border border-border"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.provider}</p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                            {item.amount}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">
                            {item.source ? new URL(`http://${item.source.replace(/^https?:\/\//, '')}`).hostname : 'Unknown Source'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WebScrapingPanel;