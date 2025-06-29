import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Users, Globe, Brain, Sparkles, Info } from 'lucide-react';
import StudentProfile from '@/components/StudentProfile';
import WebScrapingPanel from '@/components/WebScrapingPanel';
import SentimentAnalysisPanel from '@/components/SentimentAnalysisPanel';
import AboutTabContent from '@/components/layout/AboutTabContent';
import ScholarshipsTabContent from '@/components/layout/ScholarshipsTabContent';

const MainTabs = ({
  studentProfile,
  onProfileUpdate,
  scholarships,
  handleNewScholarships,
  filters,
  setFilters,
  resetFilters,
  sortedScholarships,
  getMatchScore
}) => {
  const tabItems = [
    { value: "scholarships", label: "Find Scholarships", shortLabel: "Find", icon: <Search className="h-4 w-4" /> },
    { value: "profile", label: "My Profile", shortLabel: "Profile", icon: <Users className="h-4 w-4" /> },
    { value: "scraping", label: "Web Scraping", shortLabel: "Scraping", icon: <Globe className="h-4 w-4" /> },
    { value: "sentiment", label: "Sentiment Analysis", shortLabel: "Analysis", icon: <Brain className="h-4 w-4" /> },
    { value: "about", label: "About Us", shortLabel: "About", icon: <Info className="h-4 w-4" /> }
  ];

  return (
    <Tabs defaultValue="scholarships" className="space-y-8">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-card shadow-lg rounded-lg p-2 border border-border">
        {tabItems.map(tab => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value} 
            className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-secondary transition-colors rounded-md"
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.shortLabel}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="scholarships" className="space-y-6">
        <ScholarshipsTabContent
          sortedScholarships={sortedScholarships}
          filters={filters}
          onFiltersChange={setFilters}
          onReset={resetFilters}
          getMatchScore={getMatchScore}
        />
      </TabsContent>

      <TabsContent value="profile">
        <StudentProfile 
          profile={studentProfile}
          onProfileUpdate={onProfileUpdate}
        />
      </TabsContent>

      <TabsContent value="scraping">
        <WebScrapingPanel onNewScholarships={handleNewScholarships} />
      </TabsContent>

      <TabsContent value="sentiment">
        <SentimentAnalysisPanel scholarships={scholarships} />
      </TabsContent>

      <TabsContent value="about">
        <AboutTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default MainTabs;