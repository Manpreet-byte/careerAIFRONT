import api from './api';

export async function createInterview(config) {
  const { data } = await api.post('/interviews', config);
  return data.data.interview;
}

export async function startInterview(id) {
  const { data } = await api.post(`/interviews/${id}/start`);
  return data.data.interview;
}

export async function getCurrentQuestion(id) {
  const { data } = await api.get(`/interviews/${id}/current`);
  return data.data.question;
}

export async function submitInterviewAnswer(id, questionId, answer) {
  const { data } = await api.post(`/interviews/${id}/answer`, { questionId, answer });
  return data.data; // { evaluation, score, isComplete }
}

export async function completeInterview(id) {
  const { data } = await api.post(`/interviews/${id}/complete`);
  return data.data.interview;
}

export async function getInterviews() {
  const { data } = await api.get('/interviews');
  return data.data.interviews;
}

export async function getInterviewResults(id) {
  const { data } = await api.get(`/interviews/${id}/results`);
  return data.data.interview;
}