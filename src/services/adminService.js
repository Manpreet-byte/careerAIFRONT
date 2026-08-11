import api from './api';

export async function getAIObservabilityMetrics() {
  const { data } = await api.get('/admin/metrics/ai');
  return data.data;
}

export async function getAILogs(params = {}) {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.append('page', params.page);
  if (params.limit) searchParams.append('limit', params.limit);
  if (params.feature) searchParams.append('feature', params.feature);
  if (params.status) searchParams.append('status', params.status);
  
  const { data } = await api.get(`/admin/logs/ai?${searchParams.toString()}`);
  return data.data; // { logs, pagination }
}

export default { getAIObservabilityMetrics, getAILogs };
