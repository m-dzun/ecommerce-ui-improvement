import { api } from './api.js';
let charts = [];
const colors = ['#8c9bb3', '#5c94fc', '#43b047'];
export async function renderStatistics(toast) {
  const root = document.createElement('div');
  root.innerHTML = `<section class="hero"><div class="hero-copy"><span class="eyebrow">WORLD 1-1 · PLAYER REPORT</span><h1>HÀNH TRÌNH CỦA BẠN</h1><p>Số liệu thật được cập nhật trực tiếp từ cơ sở dữ liệu.</p></div></section><div class="stats-kpis" data-kpis style="margin:20px 0"></div><div class="stats-layout"><section class="panel"><div class="panel-heading"><h2>🍄 TRẠNG THÁI NHIỆM VỤ</h2></div><div class="chart-box"><canvas id="status-chart" aria-label="Biểu đồ nhiệm vụ theo trạng thái"></canvas></div></section><section class="panel"><div class="panel-heading"><h2>📅 7 NGÀY GẦN NHẤT</h2></div><div class="chart-box"><canvas id="weekly-chart" aria-label="Biểu đồ nhiệm vụ 7 ngày"></canvas></div></section><section class="panel"><div class="panel-heading"><h2>⭐ ĐỘ ƯU TIÊN</h2></div><div class="chart-box"><canvas id="priority-chart" aria-label="Biểu đồ nhiệm vụ theo ưu tiên"></canvas></div></section><section class="panel"><div class="panel-heading"><h2>🏁 TỔNG QUAN</h2></div><div data-facts></div></section></div>`;
  try {
    const [summary, weekly, priorities] = await Promise.all([api.summary(), api.weekly(), api.priorities()]);
    const kpis = [['Tổng nhiệm vụ',summary.total,'🧱'],['Hoàn thành',summary.completed,'✅'],['Chưa làm',summary.todo,'🍄'],['Đang làm',summary.inProgress,'⚡'],['Hoàn thành',`${summary.completionRate}%`,'🏁'],['Quá hạn',summary.overdue,'⏰']];
    root.querySelector('[data-kpis]').replaceChildren(...kpis.map(([label,value,icon])=>{const n=document.createElement('div');n.className='stats-kpi';const b=document.createElement('b');b.textContent=`${icon} ${value}`;const s=document.createElement('span');s.textContent=label;n.append(b,s);return n;}));
    root.querySelector('[data-facts]').textContent = `Bạn đã tích lũy ${summary.coins} coins từ ${summary.completed} nhiệm vụ hoàn thành. Tỉ lệ hoàn thành hiện tại là ${summary.completionRate}%.`;
    charts.forEach(c=>c.destroy()); charts=[];
    if (window.Chart) {
      charts.push(new Chart(root.querySelector('#status-chart'),{type:'doughnut',data:{labels:['Chưa làm','Đang thực hiện','Đã hoàn thành'],datasets:[{data:[summary.todo,summary.inProgress,summary.completed],backgroundColor:colors,borderColor:'#fff',borderWidth:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom'}}}}));
      charts.push(new Chart(root.querySelector('#weekly-chart'),{type:'bar',data:{labels:weekly.map(x=>new Intl.DateTimeFormat('vi-VN',{weekday:'short',day:'numeric'}).format(new Date(`${x.date}T12:00:00`))),datasets:[{label:'Tổng nhiệm vụ',data:weekly.map(x=>x.total),backgroundColor:'#9ec0ff',borderRadius:5},{label:'Hoàn thành',data:weekly.map(x=>x.completed),backgroundColor:'#43b047',borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,scales:{y:{beginAtZero:true,ticks:{precision:0}}}}}));
      charts.push(new Chart(root.querySelector('#priority-chart'),{type:'bar',data:{labels:priorities.map(x=>({Low:'Thấp',Medium:'Trung bình',High:'Cao'}[x.priority])),datasets:[{label:'Nhiệm vụ',data:priorities.map(x=>x.count),backgroundColor:['#43b047','#ffc942','#e52521'],borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',scales:{x:{beginAtZero:true,ticks:{precision:0}}},plugins:{legend:{display:false}}}}));
    } else toast('Không tải được Chart.js. Hãy kiểm tra kết nối internet.', 'error');
  } catch (e) { root.querySelector('[data-kpis]').textContent = `Không thể tải thống kê: ${e.message}`; toast(e.message, 'error'); }
  return root;
}
