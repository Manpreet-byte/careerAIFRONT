export const mockResumes = [
  {
    id: 'r-1',
    name: 'Avery Patel Resume.pdf',
    size: 142350, // bytes
    type: 'application/pdf',
    uploadedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
]

export const sampleResumeAnalysis = {
  overall: 87,
  ats: 92,
  content: 85,
  skills: 89,
  experience: 83,
  strengths: [
    'Strong React experience',
    'Good JavaScript fundamentals',
    'Relevant backend experience',
    'Clear project descriptions',
  ],
  improvements: [
    'Add measurable achievements',
    'Improve summary section',
    'Add cloud deployment experience',
    'Reduce unnecessary wording',
  ],
  missingKeywords: ['Docker', 'AWS', 'Redis', 'CI/CD', 'Testing'],
  suggestions: [
    {
      id: 's-1',
      before: 'Worked on a React project.',
      after: 'Developed a responsive React application with reusable components and REST API integration.',
    },
  ],
}
