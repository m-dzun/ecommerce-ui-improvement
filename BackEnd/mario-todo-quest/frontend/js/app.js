import { api } from './api.js';
import { renderTaskPage, setupTasks } from './tasks.js';
import { renderStatistics } from './statistics.js';

const view = document.querySelector('#view');
let pageRefresh = null;
let latestSummary = null;
const toast = (message, type = '') => {
  const region = document.querySelector('#toast-region'); const item = document.createElement('div'); item.className = `toast ${type}`; item.textContent = message; region.append(item); setTimeout(() => item.remove(), 3600);
};
function displayDate() { document.querySelector('#current-date').textContent = new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()); }
function headerStats(tasks) {
  const done = tasks.filter(t => t.status === 'Done').length; const percent = tasks.length ? Math.round(done * 100 / tasks.length) : 0;
  document.querySelector('#header-progress').textContent = `${percent}%`; document.querySelector('#header-progress-bar').style.width = `${percent}%`;
  updateCoins();
}
async function updateCoins() {
  try { latestSummary = await api.summary(); document.querySelector('#coin-count').textContent = latestSummary.coins; } catch { /* page displays request errors */ }
}
function openEditor(task) {
  const form = document.querySelector('#task-form'); form.reset();
  document.querySelector('#task-id').value = task?.id ?? '';
  document.querySelector('#dialog-title').textContent = task ? 'Sửa nhiệm vụ' : 'Nhiệm vụ mới';
  document.querySelector('#task-title').value = task?.title ?? '';
  document.querySelector('#task-description').value = task?.description ?? '';
  document.querySelector('#task-date').value = task?.dueDate ?? api.date();
  document.querySelector('#task-time').value = task?.dueTime?.slice(0,5) ?? '';
  document.querySelector('#task-priority').value = task?.priority ?? 'Medium';
  document.querySelector('#task-status').value = task?.status ?? 'Todo';
  document.querySelector('#title-error').textContent = ''; document.querySelector('#date-error').textContent = '';
  document.querySelector('#task-dialog').showModal(); document.querySelector('#task-title').focus();
}
async function navigate() {
  const route = location.hash.slice(1) || 'today';
  document.querySelectorAll('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.route === route));
  view.setAttribute('aria-busy', 'true'); view.replaceChildren(); pageRefresh = null;
  if (route === 'stats') view.append(await renderStatistics(toast));
  else { const page = await renderTaskPage({ today: route !== 'all', all: route === 'all' }); pageRefresh = page.refresh; view.append(page); }
  view.setAttribute('aria-busy', 'false');
  if (route !== 'today') updateCoins();
}
setupTasks({ toast, openEditor, refresh: async () => { if (pageRefresh) await pageRefresh(); else await navigate(); await updateCoins(); }, headerStats });
document.querySelector('#close-dialog').addEventListener('click', () => document.querySelector('#task-dialog').close());
document.querySelector('#cancel-dialog').addEventListener('click', () => document.querySelector('#task-dialog').close());
document.querySelector('#task-form').addEventListener('submit', async event => {
  event.preventDefault();
  const title = document.querySelector('#task-title').value.trim(); const date = document.querySelector('#task-date').value;
  document.querySelector('#title-error').textContent = title ? '' : 'Vui lòng nhập tên nhiệm vụ.';
  document.querySelector('#date-error').textContent = date ? '' : 'Vui lòng chọn ngày đến hạn.';
  if (!title || !date) return;
  const id = document.querySelector('#task-id').value;
  const payload = { title, description: document.querySelector('#task-description').value.trim() || null, dueDate: date, dueTime: document.querySelector('#task-time').value || null, priority: document.querySelector('#task-priority').value, status: document.querySelector('#task-status').value };
  const save = event.currentTarget.querySelector('[type="submit"]'); save.disabled = true; save.textContent = 'ĐANG LƯU...';
  try { if (id) await api.update(id, payload); else await api.create(payload); document.querySelector('#task-dialog').close(); toast(id ? 'Đã cập nhật nhiệm vụ.' : 'Đã thêm nhiệm vụ mới!', 'success'); if (pageRefresh) await pageRefresh(); else await navigate(); await updateCoins(); }
  catch (e) { toast(e.message, 'error'); }
  finally { save.disabled = false; save.innerHTML = 'LƯU NHIỆM VỤ <span>➜</span>'; }
});
window.addEventListener('hashchange', navigate);
displayDate();
navigate().catch(e => { view.textContent = `Không thể mở ứng dụng: ${e.message}`; toast('Không kết nối được máy chủ.', 'error'); });
