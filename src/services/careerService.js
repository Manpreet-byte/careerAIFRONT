import api from './api';

export async function createRoadmap(targetRole, targetLevel = 'mid') {
  const { data } = await api.post('/career/roadmaps', { targetRole, targetLevel });
  return data.data.roadmap;
}

export async function getCurrentRoadmap() {
  const { data } = await api.get('/career/roadmaps/current');
  return data.data.roadmap;
}

export async function getSkillGaps(targetRole) {
  const { data } = await api.get(`/career/skills/gaps?targetRole=${targetRole}`);
  return data.data.gaps;
}

export async function getReadinessScore(targetRole) {
  const { data } = await api.get(`/career/readiness?targetRole=${targetRole}`);
  return data.data;
}

export async function getMilestoneAssessment(roadmapId, milestoneId) {
  const { data } = await api.get(`/career/roadmaps/${roadmapId}/milestones/${milestoneId}/assessment`);
  return data.data; // { questions }
}

export async function submitMilestoneAssessment(roadmapId, milestoneId, answers) {
  const { data } = await api.post(`/career/roadmaps/${roadmapId}/milestones/${milestoneId}/assessment/submit`, { answers });
  return data.data; // { score, passed, results }
}

export async function getDashboardAnalytics(targetRole = '') {
  const query = targetRole ? `?targetRole=${encodeURIComponent(targetRole)}` : '';
  const { data } = await api.get(`/career/analytics${query}`);
  return data.data;
}
