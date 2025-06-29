export const scholarships = [
  {
    id: 1,
    title: "Merit Excellence Scholarship",
    provider: "National Education Foundation",
    amount: "$5,000",
    deadline: "2025-09-15",
    eligibility: ["GPA 3.5+", "Undergraduate", "US Citizen"],
    category: "Merit-Based",
    description: "Awarded to outstanding students demonstrating academic excellence and leadership potential.",
    applicationLink: "https://example.com/apply1",
    location: "Nationwide",
    field: "Any Field",
    sentiment: 0.8,
    reviews: [
      { text: "Amazing opportunity! The application process was straightforward.", sentiment: 0.9 },
      { text: "Great scholarship program with excellent support.", sentiment: 0.8 }
    ]
  },
  {
    id: 2,
    title: "STEM Innovation Grant",
    provider: "Tech Future Foundation",
    amount: "$10,000",
    deadline: "2025-10-20",
    eligibility: ["STEM Major", "GPA 3.0+", "Junior/Senior"],
    category: "Field-Specific",
    description: "Supporting the next generation of STEM innovators and researchers.",
    applicationLink: "https://example.com/apply2",
    location: "California",
    field: "STEM",
    sentiment: 0.9,
    reviews: [
      { text: "Incredible program for STEM students! Highly recommend applying.", sentiment: 0.95 },
      { text: "The mentorship component is invaluable.", sentiment: 0.85 }
    ]
  },
  {
    id: 3,
    title: "Community Leadership Award",
    provider: "Civic Engagement Institute",
    amount: "$3,000",
    deadline: "2025-11-10",
    eligibility: ["Community Service 100+ hours", "Any GPA", "Any Major"],
    category: "Community Service",
    description: "Recognizing students who make a difference in their communities.",
    applicationLink: "https://example.com/apply3",
    location: "Texas",
    field: "Any Field",
    sentiment: 0.7,
    reviews: [
      { text: "Good scholarship for community-minded students.", sentiment: 0.7 },
      { text: "Application process could be improved.", sentiment: 0.6 }
    ]
  },
  {
    id: 4,
    title: "First-Generation College Success",
    provider: "Educational Equity Foundation",
    amount: "$7,500",
    deadline: "2025-12-01",
    eligibility: ["First-Generation College Student", "GPA 2.5+", "Financial Need"],
    category: "Need-Based",
    description: "Supporting first-generation college students in achieving their educational goals.",
    applicationLink: "https://example.com/apply4",
    location: "New York",
    field: "Any Field",
    sentiment: 0.85,
    reviews: [
      { text: "Life-changing opportunity for first-gen students!", sentiment: 0.9 },
      { text: "Excellent support system and resources provided.", sentiment: 0.8 }
    ]
  },
  {
    id: 5,
    title: "Creative Arts Excellence",
    provider: "Arts & Culture Foundation",
    amount: "$4,500",
    deadline: "2026-01-15",
    eligibility: ["Arts Major", "Portfolio Required", "GPA 3.2+"],
    category: "Field-Specific",
    description: "Celebrating creativity and artistic achievement in higher education.",
    applicationLink: "https://example.com/apply5",
    location: "Illinois",
    field: "Arts",
    sentiment: 0.75,
    reviews: [
      { text: "Great for creative students, but portfolio requirements are strict.", sentiment: 0.7 },
      { text: "Wonderful opportunity to showcase artistic talent.", sentiment: 0.8 }
    ]
  },
  {
    id: 6,
    title: "Business Leadership Scholarship",
    provider: "Corporate Excellence Institute",
    amount: "$8,000",
    deadline: "2026-02-28",
    eligibility: ["Business Major", "Leadership Experience", "GPA 3.3+"],
    category: "Field-Specific",
    description: "Developing the next generation of business leaders and entrepreneurs.",
    applicationLink: "https://example.com/apply6",
    location: "Florida",
    field: "Business",
    sentiment: 0.82,
    reviews: [
      { text: "Excellent networking opportunities and mentorship.", sentiment: 0.85 },
      { text: "Competitive but worth the effort to apply.", sentiment: 0.8 }
    ]
  }
];

const additionalScholarships = Array.from({ length: 100 }, (_, i) => {
  const id = 7 + i;
  const categories = ["Merit-Based", "Need-Based", "Field-Specific", "Community Service", "Minority", "Athletic"];
  const fields = ["STEM", "Business", "Arts", "Medicine", "Education", "Humanities", "Social Sciences", "Law", "Any Field"];
  const locations = ["Nationwide", "California", "Texas", "New York", "Florida", "Illinois", "Online", "International"];
  const providers = [
    "Global Scholarship Fund", "Future Leaders Initiative", "Academic Achievers Program", "Community Builders Grant",
    "Innovation Hub Scholarships", "Diversity in Tech Award", "Student Success Foundation", "Bright Minds Scholarship",
    "The Hope Scholarship", "Pioneer's Grant"
  ];
  const randomAmount = Math.floor(Math.random() * 19 + 2) * 500; // $1000 to $10000
  const randomGPA = (Math.random() * 1.5 + 2.5).toFixed(1); // GPA 2.5 to 4.0
  const randomSentiment = (Math.random() * 0.4 + 0.5).toFixed(2); // Sentiment 0.5 to 0.9
  const deadlineYear = 2025 + Math.floor(i / 50); // Spread deadlines over 2025 and 2026
  const deadlineMonth = Math.floor(Math.random() * 12) + 1;
  const deadlineDay = Math.floor(Math.random() * 28) + 1;

  return {
    id: id,
    title: `Scholarship Opportunity #${id}`,
    provider: providers[i % providers.length],
    amount: `$${randomAmount.toLocaleString()}`,
    deadline: `${deadlineYear}-${String(deadlineMonth).padStart(2, '0')}-${String(deadlineDay).padStart(2, '0')}`,
    eligibility: [`GPA ${randomGPA}+`, (i % 2 === 0 ? "Undergraduate" : "Graduate"), (i % 3 === 0 ? "US Citizen" : "Any Nationality")],
    category: categories[i % categories.length],
    description: `A promising scholarship for dedicated students in ${fields[i % fields.length]}. This scholarship aims to support students who demonstrate potential in their chosen field and a commitment to their education.`,
    applicationLink: `https://example.com/apply${id}`,
    location: locations[i % locations.length],
    field: fields[i % fields.length],
    sentiment: parseFloat(randomSentiment),
    reviews: [
      { text: "Seems like a good opportunity, worth checking out.", sentiment: Math.max(0.5, parseFloat(randomSentiment) - 0.1) },
      { text: "The provider has a decent reputation.", sentiment: Math.min(0.9, parseFloat(randomSentiment) + 0.1) }
    ]
  };
});

scholarships.push(...additionalScholarships);


export const mockStudentProfile = {
  name: "",
  gpa: "",
  major: "",
  year: "",
  location: "",
  interests: [],
  communityService: "",
  financialNeed: false
};