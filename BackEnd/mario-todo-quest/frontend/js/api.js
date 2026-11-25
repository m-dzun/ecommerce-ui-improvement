import { API_BASE } from './config.js';

const localDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const endpoint = path => `${API_BASE.replace(/\/$/, '')}${path}`;
async function request(path, options = {}) {
  const response = await fetch(endpoint(path), { headers: { 'Content-Type': 'application/json', ...options.headers }, ...options });
  if (!response.ok) {
    let message = `Lỗi máy chủ (${response.status})`;
    try { const body = await response.json(); message = body.message || Object.values(body.errors || {}).flat().join(' ') || message; } catch {}
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}
export const api = {
  date: localDate,
  tasks: (filters = {}, today = false) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) if (value) params.set(key, value);
    if (today) params.set('today', localDate());
    return request(`/api/tasks${today ? '/today' : ''}?${params}`);
  },
  create: data => request('/api/tasks', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  status: (id, status) => request(`/api/tasks/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  remove: id => request(`/api/tasks/${id}`, { method: 'DELETE' }),
  summary: () => request(`/api/statistics/summary?date=${localDate()}`),
  weekly: () => request(`/api/statistics/weekly?date=${localDate()}`),
  priorities: () => request('/api/statistics/priorities')
};
