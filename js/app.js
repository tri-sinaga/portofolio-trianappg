/* ==========================================================================
   PPG PRAJABATAN E-PORTFOLIO APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavigation();
  initTimelines();
  initOverallJourney();
  initProjectsGrid();
  initDocumentRepository();
  initModals();
  initScrollReveal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   01. SCROLL PROGRESS INDICATOR & BACK TO TOP
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   02. NAVIGATION & ACTIVE SECTION OBSERVER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when link clicked
    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   03. TIMELINE & REFLECTIONS (SEMESTER 1 & SEMESTER 2)
   -------------------------------------------------------------------------- */
function initTimelines() {
  renderSemesterTimeline('semester1Container', reflectionsData.semester1);
  renderSemesterTimeline('semester2Container', reflectionsData.semester2);
}

function renderSemesterTimeline(containerId, courses) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = courses.map((course, index) => `
    <div class="timeline-item reveal-on-scroll">
      <div class="timeline-marker"></div>
      <div class="reflection-card">
        <div class="reflection-card-header">
          <div>
            <div class="course-meta">
              <span class="course-code">${course.code}</span>
              <span class="badge badge-gold">Capaian Reflektif</span>
            </div>
            <h3 class="course-title">${course.title}</h3>
          </div>
        </div>

        <p class="lead-text" style="font-size: 0.95rem; margin-bottom: 1rem;">${course.summary}</p>

       

        <div class="reflection-actions">
          <a href="${course.driveUrl || 'https://drive.google.com/'}" target="_blank" rel="noopener noreferrer" class="btn btn-gold" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            View Reflection ↗
          </a>
        </div>
      </div>
    </div>
  `).join('');

  // Attach click events for modal triggers
  container.querySelectorAll('.btn-read-reflection').forEach(btn => {
    btn.addEventListener('click', () => {
      const courseId = btn.dataset.courseId;
      openReflectionModal(courseId);
    });
  });
}

/* --------------------------------------------------------------------------
   04. OVERALL JOURNEY STEPPER
   -------------------------------------------------------------------------- */
function initOverallJourney() {
  const steps = [
    { title: "Awal PPG", desc: "Komitmen Mengabdi" },
    { title: "Mengenal Diri", desc: "Refleksi Jatidiri" },
    { title: "Memahami Peserta Didik", desc: "Asesmen Diagnostik" },
    { title: "Memahami Pedagogi", desc: "UbD & Diferensiasi" },
    { title: "Praktik Mengajar", desc: "PPL Terbimbing & Mandiri" },
    { title: "Refleksi", desc: "Evaluasi Ketercapaian" },
    { title: "Inovasi", desc: "Desain Media & Action" },
    { title: "Guru Profesional", desc: "Pendidik Transformatif" }
  ];

  const stepperContainer = document.getElementById('journeyStepper');
  if (stepperContainer) {
    stepperContainer.innerHTML = steps.map((s, idx) => `
      <div class="journey-step">
        <div class="journey-node">${idx + 1}</div>
        <div class="journey-label">${s.title}<br><span style="font-size: 0.7rem; color: var(--color-text-secondary); font-weight: normal;">${s.desc}</span></div>
      </div>
    `).join('');
  }
}

/* --------------------------------------------------------------------------
   05. PROJECTS GRID & MODAL
   -------------------------------------------------------------------------- */
function initProjectsGrid() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  container.innerHTML = projectsData.map(proj => `
    <div class="project-card reveal-on-scroll">
      <div class="project-thumb-container">
        <div class="project-thumb-icon">💡</div>
        <span class="project-badge-tag">${proj.tag}</span>
      </div>
      <div class="project-card-body">
        <h3 class="project-title">${proj.title}</h3>
        <div class="project-detail-row">
          <strong>Permasalahan:</strong> ${proj.problem}
        </div>
        <div class="project-detail-row">
          <strong>Solusi Inovatif:</strong> ${proj.solution}
        </div>
        <div class="project-detail-row" style="margin-top: 0.5rem;">
          <span class="badge badge-primary">${proj.techUsed}</span>
        </div>
        <div class="project-card-footer">
          <button class="btn btn-primary btn-sm btn-view-project" data-proj-id="${proj.id}" style="width: 100%;">
            View Project Details
          </button>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-view-project').forEach(btn => {
    btn.addEventListener('click', () => {
      openProjectModal(btn.dataset.projId);
    });
  });
}

/* --------------------------------------------------------------------------
   06. DOCUMENT REPOSITORY & FILTERS
   -------------------------------------------------------------------------- */
function initDocumentRepository() {
  const container = document.getElementById('docGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

  function renderDocs(category = 'ALL') {
    const filtered = category === 'ALL'
      ? documentsData
      : documentsData.filter(d => d.category === category);

    container.innerHTML = filtered.map(doc => `
      <div class="doc-card reveal-on-scroll">
        <div class="doc-icon-header">
          <div class="doc-icon">${doc.icon}</div>
          <span class="badge badge-gold">${doc.categoryLabel}</span>
        </div>
        <h4 class="doc-title">${doc.title}</h4>
        <p class="doc-desc">${doc.description}</p>
        <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
          📅 ${doc.date} &nbsp;•&nbsp; 📁 ${doc.fileType}
        </div>
        <div class="doc-actions">
          <button class="btn btn-secondary btn-sm btn-view-doc" data-doc-id="${doc.id}" style="flex: 1;">
            Preview
          </button>
          <a href="${doc.driveUrl || 'https://drive.google.com/'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 0.25rem; text-decoration: none;">
            Google Drive ↗
          </a>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-view-doc').forEach(btn => {
      btn.addEventListener('click', () => openDocViewerModal(btn.dataset.docId));
    });
  }

  renderDocs('ALL');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDocs(btn.dataset.filter);
    });
  });
}

/* --------------------------------------------------------------------------
   07. MODAL UTILITIES & CONTENT GENERATOR
   -------------------------------------------------------------------------- */
function initModals() {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalCloseBtn');

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });
  }
}

function openModal(title, contentHtml, footerHtml = '') {
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalFooter = document.getElementById('modalFooter');

  if (!modalOverlay) return;

  if (modalTitle) modalTitle.textContent = title;
  if (modalBody) modalBody.innerHTML = contentHtml;
  if (modalFooter) modalFooter.innerHTML = footerHtml;

  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* Modal Content Generators */
function openReflectionModal(courseId) {
  const allCourses = [...reflectionsData.semester1, ...reflectionsData.semester2];
  const course = allCourses.find(c => c.id === courseId);
  if (!course) return;

  const html = `
    <div style="margin-bottom: 1.5rem;">
      <span class="badge badge-primary">${course.code}</span>
      <h3 style="margin-top: 0.5rem; color: var(--color-dark);">${course.title}</h3>
      <p class="lead-text">${course.summary}</p>
    </div>

    
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
     <div style="background: var(--color-gold-light); padding: 1.25rem; border: 1px solid var(--color-gold); border-radius: 6px;">
        <h4 style="color: var(--color-dark); margin-bottom: 0.4rem;">📎 Artefak Bukti Belajar</h4>
        <p><strong>${course.artifactTitle}</strong> (${course.artifactType})</p>
        <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin-top: 0.5rem; line-height: 1.6;">${course.framework.artefak}</p>
      </div>
    </div>
    
  `;

  const footer = `
    <a href="${course.driveUrl || 'https://drive.google.com/'}" target="_blank" rel="noopener noreferrer" class="btn btn-gold" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem;">View Related Artifact ↗</a>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
  `;

  openModal(`Analisis Reflektif — ${course.title}`, html, footer);
}

function openArtifactModal(courseId) {
  const allCourses = [...reflectionsData.semester1, ...reflectionsData.semester2];
  const course = allCourses.find(c => c.id === courseId);
  if (!course) return;

  const driveUrl = course.driveUrl || "https://drive.google.com/";
  window.open(driveUrl, '_blank');
}

function openProjectModal(projId) {
  const proj = projectsData.find(p => p.id === projId);
  if (!proj) return;

  const html = `
    <div style="margin-bottom: 1.5rem;">
      <span class="badge badge-gold">${proj.tag}</span>
      <h3 style="margin-top: 0.5rem; color: var(--color-dark);">${proj.title}</h3>
      <p class="lead-text">${proj.details}</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div style="background: #FFF5F5; border-left: 4px solid #E53E3E; padding: 1.25rem; border-radius: 6px;">
        <h4 style="color: #9B2C2C; margin-bottom: 0.4rem;">⚠️ Permasalahan Pembelajaran</h4>
        <p>${proj.problem}</p>
      </div>

      <div style="background: #F0FFF4; border-left: 4px solid var(--color-green); padding: 1.25rem; border-radius: 6px;">
        <h4 style="color: var(--color-green); margin-bottom: 0.4rem;">💡 Solusi & Kebaharuan (Inovasi)</h4>
        <p>${proj.solution}</p>
        <p style="margin-top: 0.5rem; font-size: 0.9rem;"><strong>Elemen Inovatif:</strong> ${proj.innovation}</p>
      </div>

      <div style="background: var(--color-primary-light); padding: 1.25rem; border-radius: 6px;">
        <h4 style="color: var(--color-primary); margin-bottom: 0.4rem;">🛠️ Teknologi & Tools Digunakan</h4>
        <p style="font-weight: 600;">${proj.techUsed}</p>
      </div>

      <div style="background: var(--color-gold-light); padding: 1.25rem; border-radius: 6px;">
        <h4 style="color: var(--color-dark); margin-bottom: 0.4rem;">📈 Impact / Dampak Terukur</h4>
        <p>${proj.impact}</p>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn btn-primary" onclick="alert('Membuka dokumentasi lengkap proyek inovasi...')">View Full Documentation</button>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
  `;

  openModal(`Karya Inovasi — ${proj.title}`, html, footer);
}

function openDocViewerModal(docId) {
  const doc = documentsData.find(d => d.id === docId);
  if (!doc) return;

  const driveUrl = doc.driveUrl || "https://drive.google.com/";

  const html = `
    <div class="doc-viewer-sim">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <span class="badge badge-gold">${doc.categoryLabel}</span>
        <span class="badge badge-primary" style="background: #E8F0FE; color: #1A73E8; border: 1px solid #C2E7FF;">Google Drive Storage</span>
      </div>
      <h3 style="margin-top: 0.5rem; color: var(--color-dark);">${doc.title}</h3>
      <p class="caption-text">Tanggal: ${doc.date} | Format: ${doc.fileType}</p>

      <div class="doc-sheet-paper" style="margin-top: 1.5rem;">
        <h4 style="border-bottom: 2px solid var(--color-gold); padding-bottom: 0.5rem; margin-bottom: 1rem; color: var(--color-primary);">
          PREVIEW DOKUMEN REPOSITORI AKADEMIK
        </h4>
        <pre style="white-space: pre-wrap; font-family: var(--font-body); font-size: 0.9rem; color: var(--color-text-primary); line-height: 1.6;">${doc.contentSnippet}</pre>
        
        <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--color-border); font-size: 0.8rem; color: var(--color-text-secondary);">
          * Dokumen ini terverifikasi secara legal sebagai hasil karya portofolio akademik PPG Prajabatan yang tersimpan di Google Drive.
        </div>
      </div>
    </div>
  `;

  const footer = `
    <a href="${driveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      Buka Berkas di Google Drive
    </a>
    <button class="btn btn-secondary" onclick="closeModal()">Tutup</button>
  `;

  openModal(`Document Viewer — ${doc.title}`, html, footer);
}

function triggerDownloadSimulation(id) {
  const allCourses = [...reflectionsData.semester1, ...reflectionsData.semester2];
  const course = allCourses.find(c => c.id === id);
  const doc = documentsData.find(d => d.id === id);
  const targetUrl = (course && course.driveUrl) || (doc && doc.driveUrl) || "https://drive.google.com/";

  window.open(targetUrl, '_blank');
}

window.openSummaryModal = function () {
  const html = `
    <div style="text-align: center; padding: 1rem 0;">
      <img src="asset/IMG_4645.JPG" alt="Foto Profil Mahasiswa" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; object-position: center top; margin: 0 auto 1rem auto; border: 2px solid var(--color-gold); display: block;">
      <h3 style="color: var(--color-dark);">PORTOFOLIO AKADEMIK PPG PRAJABATAN</h3>
      <p style="font-weight: 600; color: var(--color-primary);">[NAMA LENGKAP] | NIM: [NIM]</p>
      <p class="caption-text">Program Studi: [PROGRAM STUDI] | Lokasi PPL: [LOKASI PPL]</p>
    </div>

    <div style="background: var(--color-bg); padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
      <h4 style="color: var(--color-dark); margin-bottom: 0.75rem;">Ringkasan Capaian Portofolio:</h4>
      <ul style="padding-left: 1.25rem; font-size: 0.925rem; line-height: 1.8;">
        <li><strong>Total Mata Kuliah Direfleksikan:</strong> 11 Mata Kuliah (Semester 1 & 2)</li>
        <li><strong>Kerangka Refleksi:</strong> Refleksi Akademik & Artefak Bukti Belajar</li>
        <li><strong>Karya Inovasi Utama:</strong> Media AR GeoNusantara, Modul UbD, App Asesmen</li>
        <li><strong>Projek Kepemimpinan:</strong> Pojok Baca & Literasi Inklusif Komunitas</li>
        <li><strong>Status Penilaian LPTK:</strong> Lengkap & Terverifikasi (2026)</li>
      </ul>
    </div>
  `;

  const footer = `
    <button class="btn btn-primary" onclick="alert('Mengunduh Ringkasan Cetak Portofolio PDF...')">Download Summary PDF</button>
    <button class="btn btn-secondary" onclick="closeModal()">Close</button>
  `;

  openModal('Ringkasan Portofolio Akademik PPG', html, footer);
};

/* --------------------------------------------------------------------------
   08. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   09. CONTACT FORM HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Terima kasih! Pesan dan undangan kolaborasi Anda telah berhasil terkirim.');
      form.reset();
    });
  }
}
