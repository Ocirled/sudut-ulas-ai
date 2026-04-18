document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navHamburger = document.getElementById('navHamburger');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  const navbar = document.getElementById('navbar');

  if (navHamburger) {
    navHamburger.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '80px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(10, 15, 30, 0.95)';
      navLinks.style.padding = '2rem';
      
      navCta.style.display = navCta.style.display === 'flex' ? 'none' : 'flex';
      navCta.style.flexDirection = 'column';
      navCta.style.position = 'absolute';
      navCta.style.top = '280px';
      navCta.style.left = '0';
      navCta.style.width = '100%';
      navCta.style.background = 'rgba(10, 15, 30, 0.95)';
      navCta.style.padding = '2rem';
    });
  }

  // Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if(navbar) navbar.style.background = 'rgba(10, 15, 30, 0.95)';
    } else {
      if(navbar) navbar.style.background = 'rgba(10, 15, 30, 0.8)';
    }
  });

  // Reveal Elements on Scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  // Counter Animation
  const stats = document.querySelectorAll('.stat-number');
  
  const runCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const inc = target / 50; // speed
    let count = 0;
    
    const updateCount = () => {
      count += inc;
      if (count < target) {
        el.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        el.innerText = target;
      }
    };
    
    updateCount();
  };

  let statsAnimated = false;
  window.addEventListener('scroll', () => {
    if (!statsAnimated && stats.length > 0) {
      const statsTop = document.querySelector('.hero-stats').getBoundingClientRect().top;
      if (statsTop < window.innerHeight) {
        stats.forEach(runCounter);
        statsAnimated = true;
      }
    }
  });

  // Preview Chart (Landing Page)
  const ctxPreview = document.getElementById('previewChart');
  if (ctxPreview) {
    new Chart(ctxPreview, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Ulasan Positif',
          data: [150, 180, 210, 240],
          backgroundColor: '#10B981',
          borderRadius: 4
        }, {
          label: 'Ulasan Negatif',
          data: [40, 55, 35, 20],
          backgroundColor: '#EF4444',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }

  // --- DASHBOARD LOGIC ---
  const isDashboard = document.querySelector('.dashboard-layout') !== null;
  
  if (isDashboard) {
    // Tab Navigation
    const navItems = document.querySelectorAll('.dash-nav-item');
    const panels = document.querySelectorAll('.panel');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        // Only allow click if visible
        if (item.style.display === 'none') return;
        
        const targetId = item.getAttribute('data-target');
        
        // Update Active states
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
        
        panels.forEach(p => p.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        
        // Re-render word cloud if needed
        if (targetId === 'panel-wordcloud') {
          setTimeout(initWordCloud, 100);
        }
      });
    });

    // Simulation Flow
    const btnUploadSim = document.getElementById('btnUploadSim');
    const uploadArea = document.getElementById('uploadArea');
    const processingState = document.getElementById('processingState');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    if (btnUploadSim) {
      btnUploadSim.addEventListener('click', (e) => {
        e.stopPropagation();
        runSimulation();
      });
      
      uploadArea.addEventListener('click', () => {
        runSimulation();
      });
    }

    function runSimulation() {
      uploadArea.style.display = 'none';
      processingState.style.display = 'block';
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        progressText.innerText = progress + '%';
        
        if (progress === 100) {
          clearInterval(interval);
          setTimeout(showDashboardData, 500);
        }
      }, 300);
    }

    function showDashboardData() {
      // Reveal menu items
      document.getElementById('navDashboard').style.display = 'flex';
      document.getElementById('navWordcloud').style.display = 'flex';
      document.getElementById('navBenchmark').style.display = 'flex';
      document.getElementById('navReport').style.display = 'flex';
      
      // Auto switch to Dashboard tab
      document.getElementById('navDashboard').click();
      
      // Init Charts
      initCharts();
    }

    // Chart.js Global Settings for Dark Mode
    Chart.defaults.color = '#9CA3AF';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.05)';

    function initCharts() {
      const configDoughnut = (pos, net, neg) => ({
        type: 'doughnut',
        data: {
          labels: ['Positif', 'Netral', 'Negatif'],
          datasets: [{
            data: [pos, net, neg],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '75%',
          plugins: { legend: { display: false } }
        }
      });

      // 4 Aspek
      new Chart(document.getElementById('chartProduk'), configDoughnut(72, 18, 10));
      new Chart(document.getElementById('chartPelayanan'), configDoughnut(85, 10, 5));
      new Chart(document.getElementById('chartPengemasan'), configDoughnut(15, 45, 40));
      new Chart(document.getElementById('chartLogistik'), configDoughnut(60, 15, 25));

      // Bar Chart Distribusi
      new Chart(document.getElementById('chartBarDistribusi'), {
        type: 'bar',
        data: {
          labels: ['Produk', 'Pelayanan', 'Pengemasan', 'Logistik'],
          datasets: [
            { label: 'Positif', data: [72, 85, 15, 60], backgroundColor: '#10B981', borderRadius: 4 },
            { label: 'Netral', data: [18, 10, 45, 15], backgroundColor: '#F59E0B', borderRadius: 4 },
            { label: 'Negatif', data: [10, 5, 40, 25], backgroundColor: '#EF4444', borderRadius: 4 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { stacked: true },
            y: { stacked: true, max: 100 }
          }
        }
      });

      // Radar Chart Benchmarking
      new Chart(document.getElementById('chartRadar'), {
        type: 'radar',
        data: {
          labels: ['Rasa Produk', 'Harga', 'Kecepatan Pelayanan', 'Kualitas Kemasan', 'Kecepatan Pengiriman'],
          datasets: [{
            label: 'Toko Sambal Bu Sari',
            data: [88, 75, 95, 40, 60],
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: '#6366F1',
            pointBackgroundColor: '#6366F1'
          }, {
            label: 'Rata-rata Industri',
            data: [80, 80, 80, 65, 75],
            backgroundColor: 'rgba(156, 163, 175, 0.1)',
            borderColor: '#9CA3AF',
            borderDash: [5, 5]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              pointLabels: { color: '#F3F4F6', font: { size: 12 } },
              ticks: { display: false, min: 0, max: 100 }
            }
          }
        }
      });

      // Trend Chart
      new Chart(document.getElementById('chartTrend'), {
        type: 'line',
        data: {
          labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
          datasets: [{
            label: 'Sentimen Positif',
            data: [65, 70, 75, 80],
            borderColor: '#10B981',
            tension: 0.4
          }, {
            label: 'Sentimen Negatif',
            data: [30, 28, 40, 20], // Lonjakan di minggu 3 karena pengemasan
            borderColor: '#EF4444',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }

    let wordCloudInited = false;
    function initWordCloud() {
      if (wordCloudInited) return;
      if (typeof WordCloud === 'undefined') return;
      
      const wcPos = document.getElementById('wcPositif');
      const wcNeg = document.getElementById('wcNegatif');
      
      // Fix canvas wrapper for lib
      const cvsPos = document.createElement('canvas');
      cvsPos.width = wcPos.clientWidth;
      cvsPos.height = wcPos.clientHeight;
      wcPos.appendChild(cvsPos);
      
      const cvsNeg = document.createElement('canvas');
      cvsNeg.width = wcNeg.clientWidth;
      cvsNeg.height = wcNeg.clientHeight;
      wcNeg.appendChild(cvsNeg);

      WordCloud(cvsPos, {
        list: [
          ['enak', 45], ['gurih', 40], ['pedas pas', 35], ['cepat', 30],
          ['ramah', 25], ['mantap', 20], ['nagih', 18], ['seller baik', 15],
          ['segar', 12], ['murah', 10], ['langganan', 8], ['oke', 5]
        ],
        weightFactor: function (size) { return size * 1.5; },
        color: 'random-light',
        backgroundColor: 'transparent',
        rotateRatio: 0
      });

      WordCloud(cvsNeg, {
        list: [
          ['bocor', 50], ['tumpah', 45], ['lama', 35], ['minyak merembes', 30],
          ['hancur', 25], ['kurir jelek', 20], ['tutup penyok', 15], ['basi', 10],
          ['kecewa', 8], ['nyangkut', 5]
        ],
        weightFactor: function (size) { return size * 1.2; },
        color: () => {
          const colors = ['#EF4444', '#F87171', '#FCA5A5'];
          return colors[Math.floor(Math.random() * colors.length)];
        },
        backgroundColor: 'transparent',
        rotateRatio: 0
      });
      
      wordCloudInited = true;
    }
  }
});
