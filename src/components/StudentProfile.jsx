import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, GraduationCap, MapPin, Heart, DollarSign, BookOpen, CalendarDays, Users as AcademicYearIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const StudentProfile = ({ profile, onProfileUpdate }) => {
  const [formData, setFormData] = useState(profile);
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleInputChange = (field, value) => {
    const updatedProfile = { ...formData, [field]: value };
    setFormData(updatedProfile);
  };

  const handleSaveProfile = () => {
    onProfileUpdate(formData);
    toast({
      title: "Profile Saved! 🥳",
      description: "Your profile has been successfully updated."
    });
  };

  const addInterest = () => {
    if (newInterest.trim() && !(formData.interests || []).includes(newInterest.trim())) {
      const updatedInterests = [...(formData.interests || []), newInterest.trim()];
      handleInputChange('interests', updatedInterests);
      setNewInterest('');
      toast({
        title: "Interest Added! 🎯",
        description: `Added "${newInterest.trim()}" to your interests.`
      });
    }
  };

  const removeInterest = (interestToRemove) => {
    const updatedInterests = (formData.interests || []).filter(interest => interest !== interestToRemove);
    handleInputChange('interests', updatedInterests);
  };

  const majorOptions = ["Computer Science", "Engineering", "Business", "Medicine", "Arts", "Education", "Psychology", "Humanities", "Social Sciences", "Law", "Environmental Science", "Journalism", "Other"];
  const yearOptions = ["High School Senior", "Freshman", "Sophomore", "Junior", "Senior", "Graduate Student", "Postgraduate"];
  const locationOptions = ["Nationwide", "California", "Texas", "New York", "Florida", "Illinois", "Massachusetts", "Washington", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan", "Other US State", "International"];


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="scholarship-card shadow-xl">
        <CardHeader className="bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-t-lg py-5 px-6">
          <CardTitle className="flex items-center gap-2.5 text-xl">
            <User className="h-6 w-6" />
            My Scholarship Profile
          </CardTitle>
          <CardDescription className="text-primary-foreground/80 text-sm">
            Keep your profile up-to-date for the best scholarship matches.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {[
              { id: 'name', label: 'Full Name', icon: <User className="h-4 w-4" />, placeholder: "E.g., Jane Doe" },
              { id: 'gpa', label: 'Current GPA', icon: <GraduationCap className="h-4 w-4" />, type: 'number', step: '0.01', min: '0', max: '5.0', placeholder: "E.g., 3.85" }
            ].map(item => (
              <div key={item.id} className="space-y-1.5">
                <label htmlFor={item.id} className="text-sm font-medium flex items-center gap-2 text-foreground">
                  {item.icon} {item.label}
                </label>
                <Input
                  id={item.id}
                  type={item.type || 'text'}
                  placeholder={item.placeholder}
                  value={formData[item.id] || ''}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  step={item.step} min={item.min} max={item.max}
                  className="bg-input border-border focus:ring-ring"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-1.5">
              <label htmlFor="major" className="text-sm font-medium flex items-center gap-2 text-foreground">
                <BookOpen className="h-4 w-4" /> Major/Field of Study
              </label>
              <Select
                id="major"
                value={formData.major || ''}
                onChange={(e) => handleInputChange('major', e.target.value)}
                className="bg-input border-border focus:ring-ring"
              >
                <option value="">Select your major</option>
                {majorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="year" className="text-sm font-medium flex items-center gap-2 text-foreground">
                <AcademicYearIcon className="h-4 w-4" /> Academic Year
              </label>
              <Select
                id="year"
                value={formData.year || ''}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="bg-input border-border focus:ring-ring"
              >
                <option value="">Select academic year</option>
                {yearOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="location" className="text-sm font-medium flex items-center gap-2 text-foreground">
              <MapPin className="h-4 w-4" /> Location (State/Country)
            </label>
            <Select
              id="location"
              value={formData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="bg-input border-border focus:ring-ring"
            >
              <option value="">Select your location</option>
              {locationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </Select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="interests" className="text-sm font-medium flex items-center gap-2 text-foreground">
              <Heart className="h-4 w-4" /> Interests & Activities
            </label>
            <div className="flex gap-2">
              <Input
                id="interests"
                placeholder="Add interest (e.g., AI, Climate Change, Music)"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                className="bg-input border-border focus:ring-ring"
              />
              <Button onClick={addInterest} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 min-h-[2rem]">
              {(formData.interests || []).map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive/20 hover:text-destructive transition-colors bg-muted text-muted-foreground"
                  onClick={() => removeInterest(interest)}
                >
                  {interest} <span className="ml-1.5 font-bold">×</span>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-1.5">
              <label htmlFor="communityService" className="text-sm font-medium flex items-center gap-2 text-foreground">
                <CalendarDays className="h-4 w-4" /> Community Service Hours
              </label>
              <Input
                id="communityService"
                type="number"
                placeholder="E.g., 150"
                value={formData.communityService || ''}
                onChange={(e) => handleInputChange('communityService', e.target.value)}
                className="bg-input border-border focus:ring-ring"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="financialNeed" className="text-sm font-medium flex items-center gap-2 text-foreground">
                <DollarSign className="h-4 w-4" /> Financial Need
              </label>
              <Select
                id="financialNeed"
                value={formData.financialNeed ? 'yes' : 'no'}
                onChange={(e) => handleInputChange('financialNeed', e.target.value === 'yes')}
                className="bg-input border-border focus:ring-ring"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </Select>
            </div>
          </div>
          <div className="pt-4">
            <Button onClick={handleSaveProfile} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-3">
              Save Profile Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentProfile;