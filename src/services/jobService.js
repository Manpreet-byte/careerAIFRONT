import { mockJobs } from '../data/jobData'

export async function listJobsMock() {
  await new Promise((r) => setTimeout(r, 300))
  return mockJobs
}

export async function analyzeJobMatchMock({ resumeId, jobDescription }) {
  await new Promise((r) => setTimeout(r, 1200))
  return {
    overall: 89,
    breakdown: { skills: 92, experience: 84, education: 95, keywords: 88 },
    strong: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'REST APIs'],
    missing: ['Docker', 'AWS', 'Redis'],
    recommended: ['TypeScript', 'Testing', 'CI/CD'],
    aiRecommendation: 'Your profile is a strong match for this position. Your biggest opportunity is demonstrating cloud deployment and DevOps experience.',
  }
}