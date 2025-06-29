import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { scholarships as initialScholarshipsData, mockStudentProfile } from '@/data/scholarships';
import { toast } from '@/components/ui/use-toast';
import HeroSection from '@/components/layout/HeroSection';
import StatsSection from '@/components/layout/StatsSection';
import MainTabs from '@/components/layout/MainTabs';

function App() {
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('studentProfile');
      return saved ? JSON.parse(saved) : mockStudentProfile;
    } catch (error) {
      console.error("Error parsing studentProfile from localStorage", error);
      return mockStudentProfile;
    }
  });
  
  const [scholarships, setScholarships] = useState(() => {
    try {
      const saved = localStorage.getItem('scholarships');
      const parsed = saved ? JSON.parse(saved) : initialScholarshipsData;
      return Array.isArray(parsed) ? parsed.filter(Boolean) : initialScholarshipsData.filter(Boolean);
    } catch (error) {
      console.error("Error parsing scholarships from localStorage", error);
      return initialScholarshipsData.filter(Boolean);
    }
  });
  
  const [filters, setFilters] = useState({
    search: '',
    amountRange: '',
    category: '',
    field: '',
    location: '',
    deadline: '',
    sentiment: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem('studentProfile', JSON.stringify(studentProfile));
    } catch (error) {
      console.error("Error saving studentProfile to localStorage", error);
    }
  }, [studentProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('scholarships', JSON.stringify(scholarships));
    } catch (error) {
      console.error("Error saving scholarships to localStorage", error);
    }
  }, [scholarships]);

  const handleProfileUpdate = (updatedProfile) => {
    setStudentProfile(updatedProfile);
    toast({
      title: "Profile Updated! ✨",
      description: "Your scholarship matches will be updated based on your new profile."
    });
  };

  const handleNewScholarships = (newScholarshipsArray) => {
    if (newScholarshipsArray && Array.isArray(newScholarshipsArray) && newScholarshipsArray.length > 0) {
      const validNewScholarships = newScholarshipsArray.filter(Boolean);
      const uniqueNewScholarships = validNewScholarships.filter(
        newS => !scholarships.some(existingS => existingS.id === newS.id || existingS.title === newS.title)
      );

      if (uniqueNewScholarships.length > 0) {
        setScholarships(prev => [...prev, ...uniqueNewScholarships]);
        toast({
          title: "New Scholarships Added! 🎉",
          description: `${uniqueNewScholarships.length} new unique scholarships have been discovered and added.`
        });
      } else if (validNewScholarships.length > 0) {
         toast({
          title: "Scholarships Found",
          description: `Discovered ${validNewScholarships.length} scholarships, but they already exist in your list.`
        });
      }
    }
  };

  const filterScholarships = () => {
    return scholarships.filter(scholarship => {
      if (!scholarship) return false;
      
      const searchLower = filters.search.toLowerCase();
      if (filters.search && 
          !(scholarship.title || '').toLowerCase().includes(searchLower) &&
          !(scholarship.provider || '').toLowerCase().includes(searchLower) &&
          !(scholarship.description || '').toLowerCase().includes(searchLower) &&
          !(scholarship.category || '').toLowerCase().includes(searchLower) &&
          !(scholarship.field || '').toLowerCase().includes(searchLower)
        ) {
        return false;
      }

      if (filters.amountRange) {
        const amount = parseInt((scholarship.amount || '0').replace(/[^0-9]/g, ''));
        const [minStr, maxStr] = filters.amountRange.split('-');
        const min = parseInt(minStr);
        if (filters.amountRange.endsWith('+')) { // Handle "20000+"
            if (amount < min) return false;
        } else {
            const max = maxStr ? parseInt(maxStr) : Infinity;
            if (amount < min || (max !== Infinity && amount > max)) {
              return false;
            }
        }
      }

      if (filters.category && scholarship.category !== filters.category) return false;
      if (filters.field && scholarship.field !== filters.field && scholarship.field !== "Any Field") return false;
      if (filters.location && scholarship.location !== filters.location && scholarship.location !== "Nationwide") return false;

      if (filters.deadline) {
        const deadlineDate = new Date(scholarship.deadline);
        if (isNaN(deadlineDate.getTime())) return true; // If deadline is invalid, don't filter out yet
        const now = new Date();
        const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return false; // Always filter expired

        const daysMap = { 'week': 7, 'month': 30, 'quarter': 90, 'halfyear': 180 };
        if (daysMap[filters.deadline] && diffDays > daysMap[filters.deadline]) return false;
      }

      if (filters.sentiment && filters.sentiment !== "all") {
        if (typeof scholarship.sentiment !== 'number') return false; // Filter out if no sentiment score
        if (filters.sentiment === 'high' && scholarship.sentiment < 0.8) return false;
        if (filters.sentiment === 'medium' && scholarship.sentiment < 0.6) return false;
      }
      return true;
    });
  };

  const getMatchScore = (scholarship) => {
    if (!scholarship || !studentProfile) return 0;
    let score = 0;
    const eligibility = scholarship.eligibility || [];
    
    if (studentProfile.gpa) {
      const gpa = parseFloat(studentProfile.gpa);
      const gpaReqEntry = eligibility.find(req => (req || '').toLowerCase().includes('gpa'));
      if (gpaReqEntry) {
        const reqGpa = parseFloat(gpaReqEntry.match(/[\d.]+/)?.[0] || 0);
        if (gpa >= reqGpa) score += 25;
        else score -= 10; // Penalty if GPA doesn't meet
      } else {
        score += 5; 
      }
    }
    
    if (studentProfile.major && scholarship.field && scholarship.field !== 'Any Field') {
      if ((scholarship.field || '').toLowerCase().includes(studentProfile.major.toLowerCase()) ||
          (studentProfile.major || '').toLowerCase().includes(scholarship.field.toLowerCase())) {
        score += 30;
      }
    } else if (scholarship.field === 'Any Field') {
      score += 15;
    }
    
    if (studentProfile.location && scholarship.location && scholarship.location !== 'Nationwide') {
      if (scholarship.location === studentProfile.location) {
        score += 20;
      }
    } else if (scholarship.location === 'Nationwide') {
      score += 10;
    }
    
    if (studentProfile.interests && studentProfile.interests.length > 0) {
      const hasInterestMatch = studentProfile.interests.some(interest =>
        (scholarship.description || '').toLowerCase().includes(interest.toLowerCase()) ||
        (scholarship.title || '').toLowerCase().includes(interest.toLowerCase()) ||
        (eligibility.join(' ') || '').toLowerCase().includes(interest.toLowerCase())
      );
      if (hasInterestMatch) score += 15;
    }

    if (studentProfile.financialNeed && eligibility.some(req => (req || '').toLowerCase().includes('financial need'))) {
        score += 10;
    }
    
    return Math.max(0, Math.min(score, 100)); // Ensure score is between 0 and 100
  };

  const sortedScholarships = filterScholarships().sort((a, b) => {
    const scoreA = getMatchScore(a);
    const scoreB = getMatchScore(b);
    if (scoreB !== scoreA) return scoreB - scoreA;
    // Secondary sort by deadline (sooner first)
    const deadlineA = new Date(a.deadline);
    const deadlineB = new Date(b.deadline);
    if (!isNaN(deadlineA.getTime()) && !isNaN(deadlineB.getTime())) {
      return deadlineA - deadlineB;
    }
    return 0;
  });

  const resetFilters = () => {
    setFilters({
      search: '', amountRange: '', category: '', field: '',
      location: '', deadline: '', sentiment: ''
    });
    toast({
      title: "Filters Reset! 🔄",
      description: "All search filters have been cleared."
    });
  };

  const safeScholarships = Array.isArray(scholarships) ? scholarships.filter(Boolean) : [];
  const stats = {
    totalScholarships: safeScholarships.length,
    totalAmount: safeScholarships.reduce((sum, s) => sum + parseInt((s.amount || '0').replace(/[^0-9]/g, '')), 0),
    avgSentiment: safeScholarships.length > 0 ? safeScholarships.reduce((sum, s) => sum + (s.sentiment || 0.5), 0) / safeScholarships.length : 0,
    matchingScholarships: sortedScholarships.length
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <StatsSection stats={stats} />

      <div className="container mx-auto px-4 pb-16">
        <MainTabs
          studentProfile={studentProfile}
          onProfileUpdate={handleProfileUpdate}
          scholarships={safeScholarships}
          handleNewScholarships={handleNewScholarships}
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          sortedScholarships={sortedScholarships}
          getMatchScore={getMatchScore}
        />
      </div>
      <Toaster />
    </div>
  );
}

export default App;