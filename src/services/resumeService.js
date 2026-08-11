import api from './api';

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append('resume', file);

  const { data } = await api.post('/resumes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data.resume;
}

export async function getResumes() {
  const { data } = await api.get('/resumes');
  return data.data.resumes;
}

export async function getResume(id) {
  const { data } = await api.get(`/resumes/${id}`);
  return data.data.resume;
}

export async function getResumeAnalysis(id) {
  const { data } = await api.get(`/resumes/${id}/analysis`);
  return data.data;
}

export async function deleteResume(id) {
  const { data } = await api.delete(`/resumes/${id}`);
  return data.data;
}