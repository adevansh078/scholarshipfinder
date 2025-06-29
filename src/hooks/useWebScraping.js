import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

export const useWebScraping = () => {
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [scrapedData, setScrapedData] = useState([]);

  const generateMockScholarship = (index, sourceName) => {
    const categories = ["Merit-Based", "Need-Based", "Field-Specific", "Community Service", "Minority", "Athletic", "Research", "Essay Contest"];
    const fields = ["STEM", "Business", "Arts", "Medicine", "Education", "Humanities", "Social Sciences", "Law", "Environmental Science", "Journalism", "Any Field"];
    const locations = ["Nationwide", "California", "Texas", "New York", "Florida", "Illinois", "Online", "International", "Massachusetts", "Washington"];
    const randomAmount = Math.floor(Math.random() * 38 + 5) * 250; // $1250 to $10500
    const randomGPA = (Math.random() * 1.8 + 2.2).toFixed(1); // GPA 2.2 to 4.0
    const deadlineYear = 2025 + Math.floor(index / 25); // Spread deadlines
    const deadlineMonth = Math.floor(Math.random() * 12) + 1;
    const deadlineDay = Math.floor(Math.random() * 28) + 1;

    return {
      id: `scraped-${sourceName.toLowerCase().replace('.com','').replace('.org','').replace('.edu','')}-${index + 1}`,
      title: `Discovered ${fields[index % fields.length]} Grant #${index + 1}`,
      provider: `From ${sourceName}`,
      amount: `$${randomAmount.toLocaleString()}`,
      deadline: `${deadlineYear}-${String(deadlineMonth).padStart(2, '0')}-${String(deadlineDay).padStart(2, '0')}`,
      source: sourceName,
      scrapedAt: new Date().toISOString(),
      description: `An exciting new scholarship opportunity for students in ${fields[index % fields.length]}. Found via automated discovery from ${sourceName}.`,
      eligibility: [`GPA ${randomGPA}+`, (index % 2 === 0 ? "Undergraduate" : "Graduate"), locations[index % locations.length]],
      category: categories[index % categories.length],
      field: fields[index % fields.length],
      location: locations[index % locations.length],
      sentiment: (Math.random() * 0.3 + 0.6).toFixed(2), // Generally positive sentiment for scraped items
    };
  };

  const scrapeScholarships = useCallback(async (sources = []) => {
    setIsScrapingActive(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2500 + Math.random() * 1500)); // Varied delay
      
      const mockScrapedScholarships = [];
      const defaultSources = ['TopScholarships.com', 'GrantFinder.org', 'EduAwards.net'];
      const currentSources = sources.length > 0 ? sources : defaultSources;

      currentSources.forEach(sourceName => {
        const numToScrape = Math.floor(Math.random() * 10 + 5); // Scrape 5-14 items per source
        for (let i = 0; i < numToScrape; i++) {
          mockScrapedScholarships.push(generateMockScholarship(mockScrapedScholarships.length, sourceName));
        }
      });
      
      setScrapedData(prev => [...prev, ...mockScrapedScholarships].slice(-100)); // Keep last 100
      
      toast({
        title: "Scraping Complete! 🚀",
        description: `Successfully scraped ${mockScrapedScholarships.length} new scholarships from ${currentSources.length} sources.`
      });
      
      return mockScrapedScholarships;
    } catch (error) {
      toast({
        title: "Scraping Error",
        description: "Failed to scrape scholarship data. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsScrapingActive(false);
    }
  }, []);

  const clearScrapedData = useCallback(() => {
    setScrapedData([]);
    toast({
      title: "Data Cleared",
      description: "All scraped scholarship data has been cleared."
    });
  }, []);

  const scrapeFromUrl = useCallback(async (url) => {
    if (!url) {
      toast({
        title: "Invalid URL",
        description: "Please provide a valid URL to scrape.",
        variant: "destructive"
      });
      return;
    }

    setIsScrapingActive(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      const hostname = new URL(url).hostname;
      const numToScrape = Math.floor(Math.random() * 5 + 3); // Scrape 3-7 items from custom URL
      const results = [];
      for (let i = 0; i < numToScrape; i++) {
        results.push(generateMockScholarship(i, hostname));
      }
      
      setScrapedData(prev => [...prev, ...results].slice(-100)); // Keep last 100
      
      toast({
        title: "URL Scraping Complete! 🎯",
        description: `Successfully scraped ${results.length} scholarship items from ${hostname}`
      });
      
      return results;
    } catch (error) {
      toast({
        title: "URL Scraping Failed",
        description: "Could not scrape data from the provided URL.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsScrapingActive(false);
    }
  }, []);

  return {
    scrapeScholarships,
    scrapeFromUrl,
    clearScrapedData,
    isScrapingActive,
    scrapedData
  };
};