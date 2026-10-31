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
  initLampiranGallery();
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

  container.innerHTML = projectsData.map(proj => {
    const isCtGameLab = proj.type === 'website' ||
      (proj.driveUrl && proj.driveUrl.includes('ct-game-lab.vercel.app')) ||
      Boolean(proj.screenshot);

      let previewContent = '';

        if (isCtGameLab) {
          const siteUrl = proj.websiteUrl || proj.driveUrl || 'https://ct-game-lab.vercel.app/';
          const screenshotImg = proj.screenshot || 'asset/ctgame.png';
          const siteName = proj.siteName || proj.title || 'Media Pembelajaran CT Game Lab';
          const shortDesc = proj.shortDesc || 'Media pembelajaran interaktif Berpikir Komputasional untuk siswa kelas X.';

          previewContent = `
        <div class="project-website-preview">
          <div class="project-website-screen">
            <a href="${siteUrl}" target="_blank" rel="noopener noreferrer" title="Buka Website ${siteName}">
              <img
                src="${screenshotImg}"
                alt="Screenshot Beranda ${siteName}"
                loading="lazy"
              />
            </a>
          </div>
          <div class="project-website-info">
            <h4 class="project-website-name">${siteName}</h4>
            <p class="project-website-desc">${shortDesc}</p>
            <div>
              <a
                href="${siteUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-visit-website"
              >
                <span>Kunjungi Website CT GAME LAB</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      `;
        } else {
          // Ubah tautan Google Drive menjadi tautan preview
          let previewUrl = '';

          if (proj.driveUrl && proj.driveUrl.trim() !== '') {
            previewUrl = proj.driveUrl
              .replace(/\/view(\?.*)?$/, '/preview')
              .replace(/\/edit(\?.*)?$/, '/preview');

            // Jika URL belum memiliki /preview atau /view
            if (!previewUrl.includes('/preview')) {
              previewUrl = previewUrl.replace(
                /\/file\/d\/([^/]+).*$/,
                '/file/d/$1/preview'
              );
            }
          }

          previewContent = `
        <div style="
          width: 100%;
          margin-top: 0.75rem;
          border: 1px solid var(--color-border);
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
        ">
          ${previewUrl
              ? `
                  <iframe
                    src="${previewUrl}"
                    title="Dokumentasi ${proj.title}"
                    width="100%"
                    height="420"
                    style="display:block; border:0;"
                    loading="lazy"
                    allow="autoplay"
                  ></iframe>
                `
              : `
                  <div style="
                    padding: 2rem 1rem;
                    text-align: center;
                    color: var(--color-text-secondary);
                  ">
                    <p>Tautan Google Drive belum ditambahkan.</p>
                    <p style="font-size:0.85rem;">
                      Tambahkan properti driveUrl pada projects-data.js.
                    </p>
                  </div>
                `
            }
        </div>
      `;
        }

        return `
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

          <div class="project-detail-row" style="margin-top: 1rem;">
            <strong>Dokumentasi Karya:</strong>
          </div>

          ${previewContent}
        </div>
      </div>
    `;
      }).join('');
}



/* --------------------------------------------------------------------------
   06. DOCUMENT REPOSITORY & FILTERS (HORIZONTAL ROWS PER CATEGORY)
   -------------------------------------------------------------------------- */
function initDocumentRepository() {
  const container = document.getElementById('docGrid');
  const filterBtns = document.querySelectorAll('.doc-filter-bar .filter-btn');

  if (!container) return;

  // Daftar kategori terstruktur sesuai tombol filter
  const REPO_CATEGORIES = [
    { id: 'REFLECTION', label: 'REFLECTION', icon: '' },
    { id: 'TEACHING MATERIAL', label: 'TEACHING MATERIAL', icon: '' },
    { id: 'HASIL MURID', label: 'HASIL MURID', icon: '' },
  ];

  // Samakan format kategori agar tidak sensitif terhadap huruf,
  // spasi, tanda hubung, atau garis bawah, serta menormalkan variasi penulisan.
  function normalizeCategory(value) {
    let cat = String(value || '')
      .trim()
      .toUpperCase()
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ');

    if (cat === 'ASSESMENT' || cat === 'ASSESSMENT') {
      cat = 'HASIL MURID';
    }

    return cat;
  }

  function renderCard(doc) {
    const driveUrl = String(doc.driveUrl || '');
    const previewUrl = driveUrl.replace(/\/view(\?.*)?$/, '/preview');

    return `
      <div class="doc-card reveal-on-scroll is-visible">
        <div class="doc-icon-header">
          <span class="badge badge-gold">
            ${doc.categoryLabel || doc.category || ''}
          </span>
        </div>

        <h4 class="doc-title">${doc.title || ''}</h4>
        <p class="doc-desc">${doc.description || ''}</p>

        <div style="font-size: 0.75rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
          ${doc.fileType || ''}
        </div>

        ${previewUrl ? `
          <div class="doc-preview-frame" style="margin: 1rem 0;">
            <iframe
              src="${previewUrl}"
              title="Preview ${doc.title || 'dokumen'}"
              width="100%"
              height="320"
              style="border: 1px solid #ddd; border-radius: 10px;"
              loading="lazy"
              allow="autoplay"
            ></iframe>
          </div>
        ` : ''}

        ${driveUrl ? `
          <div class="doc-actions">
            <a
              href="${driveUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary btn-sm"
              style="text-decoration: none;"
            >
              Buka di Google Drive ↗
            </a>
          </div>
        ` : ''}
      </div>
    `;
  }

  function renderCategorySection(cat, docs) {
    const hasDocs = docs && docs.length > 0;

    return `
      <div class="doc-category-section reveal-on-scroll is-visible" data-category="${cat.id}">
        <div class="doc-category-header">
          <div class="doc-category-title-wrap">
            <h3 class="doc-category-title">
              <span>${cat.icon}</span> ${cat.label}
            </h3>
            <span class="doc-category-count">${docs.length} Berkas</span>
          </div>

          ${hasDocs && docs.length > 1 ? `
            <div class="doc-scroll-controls">
              <button type="button" class="doc-scroll-btn doc-scroll-prev" aria-label="Geser ke kiri ${cat.label}" title="Geser ke kiri">‹</button>
              <button type="button" class="doc-scroll-btn doc-scroll-next" aria-label="Geser ke kanan ${cat.label}" title="Geser ke kanan">›</button>
            </div>
          ` : ''}
        </div>

        ${hasDocs ? `
          <div class="doc-scroll-wrapper">
            <div class="doc-scroll-track">
              ${docs.map(renderCard).join('')}
            </div>
          </div>
        ` : `
          <div class="doc-empty-message" style="text-align: center; padding: 3rem 1.5rem; color: var(--color-text-secondary); background: #FFFFFF; border-radius: var(--radius-md); border: 1px dashed var(--color-border); margin: 0.5rem 0;">
            <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📂</div>
            <p style="font-size: 0.95rem; font-weight: 500; margin: 0;">
              Belum ada dokumen untuk kategori <strong>${cat.label}</strong>.
            </p>
          </div>
        `}
      </div>
    `;
  }

  function renderDocs(category = 'ALL') {
    const selectedCategory = normalizeCategory(category);
    const data = (typeof documentsData !== 'undefined' && Array.isArray(documentsData))
      ? documentsData
      : [];

    let categoriesToDisplay = [];

    if (selectedCategory === 'ALL') {
      // Tampilkan seluruh kategori yang memiliki dokumen
      categoriesToDisplay = REPO_CATEGORIES.filter(cat => {
        const catDocs = data.filter(doc => normalizeCategory(doc.category) === cat.id);
        return catDocs.length > 0;
      });

      // Tangani jika ada dokumen dengan kategori di luar daftar baku
      const knownCatIds = new Set(REPO_CATEGORIES.map(c => c.id));
      const extraCategories = [];
      data.forEach(doc => {
        const norm = normalizeCategory(doc.category);
        if (norm && !knownCatIds.has(norm) && !extraCategories.includes(norm)) {
          extraCategories.push(norm);
        }
      });

      extraCategories.forEach(extraId => {
        categoriesToDisplay.push({
          id: extraId,
          label: extraId,
          icon: '📁'
        });
      });

      if (!categoriesToDisplay.length) {
        container.innerHTML = `
          <div class="doc-empty-message" style="text-align: center; padding: 3.5rem 1.5rem; color: var(--color-text-secondary); background: #FFFFFF; border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📂</div>
            <p style="font-size: 1rem; font-weight: 500; margin: 0;">
              Belum ada dokumen di repositori.
            </p>
          </div>
        `;
        return;
      }

      container.innerHTML = categoriesToDisplay.map(cat => {
        const catDocs = data.filter(doc => normalizeCategory(doc.category) === cat.id);
        return renderCategorySection(cat, catDocs);
      }).join('');

    } else {
      // Tampilkan hanya kategori yang dipilih
      const catDef = REPO_CATEGORIES.find(c => c.id === selectedCategory) || {
        id: selectedCategory,
        label: selectedCategory,
        icon: '📁'
      };

      const catDocs = data.filter(doc => normalizeCategory(doc.category) === selectedCategory);
      container.innerHTML = renderCategorySection(catDef, catDocs);
    }

    // Pasang tombol navigasi geser (Prev/Next) dan drag horizontal
    container.querySelectorAll('.doc-category-section').forEach(section => {
      const scrollWrapper = section.querySelector('.doc-scroll-wrapper');
      const prevBtn = section.querySelector('.doc-scroll-prev');
      const nextBtn = section.querySelector('.doc-scroll-next');

      if (scrollWrapper && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          scrollWrapper.scrollBy({ left: -360, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
          scrollWrapper.scrollBy({ left: 360, behavior: 'smooth' });
        });
      }

      if (scrollWrapper) {
        attachDragScroll(scrollWrapper);
      }
    });
  }

  function attachDragScroll(el) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    el.addEventListener('mousedown', (e) => {
      if (e.target.closest('a, button, iframe')) return;
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => {
      isDown = false;
    });

    el.addEventListener('mouseup', () => {
      isDown = false;
    });

    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter || btn.getAttribute('data-filter') || 'ALL';
      renderDocs(filterVal);
    });
  });

  renderDocs('ALL');
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
      <p class="caption-text">Format: ${doc.fileType}</p>

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

window.handleLampiranImgError = function (img, categoryLabel, isLightbox = false) {
  if (!img || !img.parentElement) return;
  const parent = img.parentElement;
  if (isLightbox) {
    parent.innerHTML = `
      <div class="lampiran-lightbox-placeholder">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
        <h3>Foto Dokumentasi PPL</h3>
        <p>File foto belum ditemukan di folder <code>asset/dokumentasi-ppl/</code>. Pastikan file foto sudah diletakkan di folder tersebut dan namanya sesuai dengan konfigurasi di <code>js/lampiran-data.js</code>.</p>
      </div>
    `;
  } else {
    parent.innerHTML = `
      <span class="lampiran-category-badge">${categoryLabel}</span>
      <div class="lampiran-placeholder">
        <div class="lampiran-placeholder-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </div>
        <div class="lampiran-placeholder-title">Dokumentasi PPL</div>
        <span class="lampiran-placeholder-tag">[Siap Ditambahkan Foto]</span>
      </div>
      <div class="lampiran-thumb-overlay">
        <span class="lampiran-overlay-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          Perbesar Foto
        </span>
      </div>
    `;
  }
};

window.handleLampiranVideoThumbError = function (img, categoryLabel) {
  if (!img || !img.parentElement) return;
  const parent = img.parentElement;
  img.remove();
  const placeholder = document.createElement('div');
  placeholder.innerHTML = `
    <div class="lampiran-placeholder">
      <div class="lampiran-placeholder-icon-wrap">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      </div>
      <div class="lampiran-placeholder-title">Dokumentasi Video</div>
      <span class="lampiran-placeholder-tag">[${categoryLabel || 'Video'}]</span>
    </div>
  `;
  parent.insertBefore(placeholder.firstElementChild, parent.firstChild);
};

/* --------------------------------------------------------------------------
   10. LAMPIRAN DOKUMENTASI PPL (SMAN 3 YOGYAKARTA)
   -------------------------------------------------------------------------- */
function initLampiranGallery() {
  const filterBar = document.getElementById('lampiranFilterBar');
  const gridContainer = document.getElementById('lampiranGrid');
  const paginationWrapper = document.getElementById('lampiranPagination');
  const lightboxOverlay = document.getElementById('lampiranLightbox');

  if (!gridContainer || typeof lampiranData === 'undefined') return;

  let currentCategory = 'ALL';
  let currentPage = 1;
  const itemsPerPage = 6;
  let activeItems = [...lampiranData];
  let currentLightboxIndex = 0;
  let currentLightboxPhotoIndex = 0;

  // Deteksi apakah item merupakan dokumentasi video
  function isVideoItem(item) {
    if (!item || typeof item !== 'object') return false;
    return item.type === 'video' ||
      item.mediaType === 'video' ||
      item.category === 'VIDEO' ||
      (typeof item.videoUrl === 'string' && item.videoUrl.trim() !== '') ||
      (typeof item.video === 'string' && item.video.trim() !== '');
  }

  function extractYouTubeId(url) {
    if (!url || typeof url !== 'string') return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/i);
    return match ? match[1] : null;
  }

  function extractGoogleDriveId(url) {
    if (!url || typeof url !== 'string') return null;
    const match = url.match(/drive\.google\.com\/(?:file\/d\/([a-zA-Z0-9_-]+)|open\?id=([a-zA-Z0-9_-]+)|uc\?id=([a-zA-Z0-9_-]+))/i);
    if (match) {
      return match[1] || match[2] || match[3] || null;
    }
    return null;
  }

  // Menyesuaikan pemutar dengan sumber video: YouTube, Google Drive, atau file lokal
  function parseVideoSource(rawUrl) {
    const url = typeof rawUrl === 'string' ? rawUrl.trim() : '';
    if (!url) {
      return {
        type: 'empty',
        url: '',
        id: null,
        embedUrl: '',
        badgeLabel: 'Video',
        defaultThumbnail: ''
      };
    }

    const ytId = extractYouTubeId(url);
    if (ytId) {
      return {
        type: 'youtube',
        url: url,
        id: ytId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`,
        badgeLabel: 'YouTube',
        defaultThumbnail: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
      };
    }

    const driveId = extractGoogleDriveId(url);
    if (driveId) {
      return {
        type: 'drive',
        url: url,
        id: driveId,
        embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
        badgeLabel: 'Google Drive',
        defaultThumbnail: ''
      };
    }

    return {
      type: 'local',
      url: url,
      id: null,
      embedUrl: url,
      badgeLabel: 'Video Lokal',
      defaultThumbnail: ''
    };
  }

  function renderVideoPlayerHtml(videoInfo, title, isLightbox = false) {
    if (!videoInfo || !videoInfo.url) {
      return `
        <div class="lampiran-placeholder lampiran-video-placeholder">
          <p style="font-size: 0.9rem; color: #CBD5E1;">Tautan berkas video belum dikonfigurasi.</p>
        </div>
      `;
    }

    const safeTitle = (title || 'Video Dokumentasi').replace(/"/g, '&quot;');

    if (videoInfo.type === 'youtube') {
      return `
        <div class="${isLightbox ? 'lampiran-lightbox-video-wrapper' : 'lampiran-video-inline-frame'}">
          <iframe
            src="${videoInfo.embedUrl}"
            title="${safeTitle}"
            style="width: 100%; height: 100%; border: 0;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>
      `;
    }

    if (videoInfo.type === 'drive') {
      return `
        <div class="${isLightbox ? 'lampiran-lightbox-video-wrapper' : 'lampiran-video-inline-frame'}">
          <iframe
            src="${videoInfo.embedUrl}"
            title="${safeTitle}"
            style="width: 100%; height: 100%; border: 0;"
            allow="autoplay; fullscreen"
            allowfullscreen>
          </iframe>
        </div>
      `;
    }

    // Video Lokal / berkas langsung (MP4, WebM, dsb.)
    return `
      <div class="${isLightbox ? 'lampiran-lightbox-video-wrapper' : 'lampiran-video-inline-element'}" style="background: #000; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
        <video
          src="${videoInfo.url}"
          controls
          autoplay
          playsinline
          class="${isLightbox ? 'lampiran-lightbox-video-element' : 'lampiran-video-inline-element'}"
          title="${safeTitle}">
          <source src="${videoInfo.url}" type="video/mp4">
          Browser Anda tidak mendukung pemutar video HTML5.
        </video>
      </div>
    `;
  }

  function getVideoPlaceholderHtml(categoryLabel) {
    return `
      <div class="lampiran-placeholder">
        <div class="lampiran-placeholder-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
        </div>
        <div class="lampiran-placeholder-title">Dokumentasi Video</div>
        <span class="lampiran-placeholder-tag">[${categoryLabel || 'Video'}]</span>
      </div>
    `;
  }

  // Mendukung beberapa foto pada satu kegiatan melalui properti images: [].
  // Properti image lama tetap didukung agar data sebelumnya tidak rusak.
  function getItemImages(item) {
    if (Array.isArray(item.images)) {
      const validImages = item.images.filter(src => typeof src === 'string' && src.trim() !== '');
      if (validImages.length) return validImages;
    }
    return item.image && item.image.trim() !== '' ? [item.image] : [];
  }

  function changeLightboxPhoto(step) {
    const item = activeItems[currentLightboxIndex];
    if (!item || isVideoItem(item)) return;
    const images = getItemImages(item);
    if (images.length <= 1) return;
    currentLightboxPhotoIndex = (currentLightboxPhotoIndex + step + images.length) % images.length;
    updateLightboxContent();
  }

  function getPlaceholderHtml(categoryLabel, isLightbox = false) {
    if (isLightbox) {
      return `
        <div class="lampiran-lightbox-placeholder">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <h3>Foto Dokumentasi PPL</h3>
          <p>Area dokumentasi kegiatan di SMA Negeri 3 Yogyakarta. Untuk menampilkan foto asli, simpan file foto pada folder <code>asset/dokumentasi-ppl/</code> dan perbarui jalur foto di <code>js/lampiran-data.js</code>.</p>
        </div>
      `;
    }

    return `
      <div class="lampiran-placeholder">
        <div class="lampiran-placeholder-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
        </div>
        <div class="lampiran-placeholder-title">Dokumentasi PPL</div>
        <span class="lampiran-placeholder-tag">[Siap Ditambahkan Foto]</span>
      </div>
    `;
  }

  // Render Filter Buttons
  if (filterBar && typeof lampiranCategories !== 'undefined') {
    filterBar.innerHTML = lampiranCategories.map(cat => `
      <button class="lampiran-filter-btn ${cat.id === 'ALL' ? 'active' : ''}" data-cat-id="${cat.id}">
        ${cat.label}
      </button>
    `).join('');

    filterBar.querySelectorAll('.lampiran-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.lampiran-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.catId;
        currentPage = 1;
        updateGallery();
      });
    });
  }

  function updateGallery() {
    // Filter kategori:
    // - ALL: tampilkan semua dokumentasi (foto dan video)
    // - VIDEO: tampilkan hanya video
    // - Lainnya: tampilkan dokumentasi sesuai kategori
    if (currentCategory === 'ALL') {
      activeItems = lampiranData;
    } else if (currentCategory === 'VIDEO') {
      activeItems = lampiranData.filter(item => isVideoItem(item));
    } else {
      activeItems = lampiranData.filter(item => {
        if (currentCategory === 'SEKOLAH') {
          return item.category === 'SEKOLAH' || item.category === 'KEGIATAN SEKOLAH';
        }
        return item.category === currentCategory;
      });
    }

    const totalItems = activeItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = activeItems.slice(startIndex, startIndex + itemsPerPage);

    if (pageItems.length === 0) {
      if (currentCategory === 'VIDEO') {
        gridContainer.innerHTML = `
          <div class="lampiran-empty-state">
            <div class="lampiran-empty-icon">🎬</div>
            <h4 class="lampiran-empty-title">Dokumentasi Video Belum Tersedia</h4>
            <p class="lampiran-empty-desc">Saat ini belum ada dokumentasi video yang ditambahkan. Video kegiatan PPL (YouTube, Google Drive, atau file video lokal) dapat ditambahkan melalui file <code>js/lampiran-data.js</code>.</p>
          </div>
        `;
      } else {
        gridContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; color: var(--color-text-secondary); background: #FFFFFF; border-radius: var(--radius-md); border: 1px dashed var(--color-border);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📂</div>
            <p style="font-size: 1rem; font-weight: 500;">Belum ada dokumentasi untuk kategori ini.</p>
          </div>
        `;
      }
    } else {
      gridContainer.innerHTML = pageItems.map((item, index) => {
        const itemGlobalIndex = startIndex + index;
        const isVideo = isVideoItem(item);

        if (isVideo) {
          const videoUrl = (typeof item.videoUrl === 'string' && item.videoUrl.trim() !== '')
            ? item.videoUrl.trim()
            : (typeof item.video === 'string' ? item.video.trim() : '');

          let iframeSrc = videoUrl;
          if (iframeSrc.includes('drive.google.com') && iframeSrc.includes('/view')) {
            iframeSrc = iframeSrc.replace('/view', '/preview');
          } else if (extractYouTubeId(iframeSrc)) {
            const ytId = extractYouTubeId(iframeSrc);
            iframeSrc = `https://www.youtube-nocookie.com/embed/${ytId}`;
          }

          const hasVideoUrl = Boolean(iframeSrc);

          return `
            <div class="lampiran-card lampiran-video-card reveal-on-scroll is-visible" data-index="${itemGlobalIndex}" tabindex="0" role="button" aria-label="${item.title}">
              <div class="lampiran-thumb-wrap lampiran-video-thumb-wrap" id="lampiranThumb_${itemGlobalIndex}">
                <span class="lampiran-category-badge">${item.categoryLabel || 'Video'}</span>
                ${hasVideoUrl ? `
                  <iframe
                    src="${iframeSrc}"
                    class="lampiran-video-iframe"
                    title="${(item.title || 'Video Dokumentasi').replace(/"/g, '&quot;')}"
                    allow="autoplay; fullscreen"
                    allowfullscreen
                    loading="lazy">
                  </iframe>
                ` : `
                  <div class="lampiran-placeholder">
                    <p style="font-size: 0.85rem; color: var(--color-text-secondary); padding: 1.5rem 1rem;">Tautan video belum dikonfigurasi.</p>
                  </div>
                `}
              </div>

              <div class="lampiran-card-body" data-open-lightbox="${itemGlobalIndex}">
                <h3 class="lampiran-card-title">${item.title}</h3>
                <p class="lampiran-card-desc">${item.description}</p>
                <div class="lampiran-card-footer">
                  <span class="lampiran-footer-play-btn" data-action="play">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                    Putar Video
                  </span>
                  <span class="lampiran-footer-detail-btn" data-action="detail">Detail ↗</span>
                </div>
              </div>
            </div>
          `;
        }

        // Tampilan kartu dokumentasi foto standar
        const itemImages = getItemImages(item);
        const hasValidImage = itemImages.length > 0;
        const thumbnailImage = itemImages[0];

        return `
          <div class="lampiran-card reveal-on-scroll is-visible" data-index="${itemGlobalIndex}" tabindex="0" role="button" aria-label="${item.title}">
            <div class="lampiran-thumb-wrap">
              <span class="lampiran-category-badge">${item.categoryLabel}</span>
              ${hasValidImage ? `
                <img src="${thumbnailImage}" alt="${item.title}" class="lampiran-thumb-img" onerror="handleLampiranImgError(this, '${item.categoryLabel}', false);">
              ` : getPlaceholderHtml(item.categoryLabel)}
              ${itemImages.length > 1 ? `<span class="lampiran-photo-count">📷 ${itemImages.length} foto</span>` : ''}
              <div class="lampiran-thumb-overlay">
                <span class="lampiran-overlay-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  Perbesar Foto
                </span>
              </div>
            </div>

            <div class="lampiran-card-body">
              <h3 class="lampiran-card-title">${item.title}</h3>
              <p class="lampiran-card-desc">${item.description}</p>
              <div class="lampiran-card-footer">
                <span>Detail ↗</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Pasang event listener untuk kartu galeri
      gridContainer.querySelectorAll('.lampiran-card').forEach(card => {
        const index = parseInt(card.dataset.index, 10);
        const item = activeItems[index];
        const isVideo = isVideoItem(item);

        if (isVideo) {
          // Kartu video: klik pada body kartu (termasuk Putar Video dan Detail) membuka Lightbox
          const cardBody = card.querySelector('.lampiran-card-body');
          if (cardBody) {
            cardBody.addEventListener('click', () => {
              openLightbox(index);
            });
          }
        } else {
          // Kartu foto: klik pada kartu membuka Lightbox
          card.addEventListener('click', () => {
            openLightbox(index);
          });
        }

        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
          }
        });
      });
    }

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!paginationWrapper) return;

    if (totalPages <= 1) {
      paginationWrapper.innerHTML = '';
      return;
    }

    let buttonsHtml = `
      <div class="lampiran-pagination">
        <button class="pagination-btn" id="lampiranPrevPageBtn" ${currentPage === 1 ? 'disabled' : ''} aria-label="Halaman Sebelumnya">
          &lsaquo;
        </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      buttonsHtml += `
        <button class="pagination-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">
          ${p}
        </button>
      `;
    }

    buttonsHtml += `
        <button class="pagination-btn" id="lampiranNextPageBtn" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Halaman Berikutnya">
          &rsaquo;
        </button>
      </div>
    `;

    paginationWrapper.innerHTML = buttonsHtml;

    paginationWrapper.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page, 10);
        updateGallery();
        const lampiranSection = document.getElementById('lampiran');
        if (lampiranSection) {
          lampiranSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const prevPageBtn = document.getElementById('lampiranPrevPageBtn');
    if (prevPageBtn) {
      prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          updateGallery();
          const lampiranSection = document.getElementById('lampiran');
          if (lampiranSection) {
            lampiranSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }

    const nextPageBtn = document.getElementById('lampiranNextPageBtn');
    if (nextPageBtn) {
      nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          updateGallery();
          const lampiranSection = document.getElementById('lampiran');
          if (lampiranSection) {
            lampiranSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }
  }

  // Lightbox Implementation
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxMediaContainer = document.getElementById('lightboxMediaContainer');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  function openLightbox(index) {
    if (!lightboxOverlay || activeItems.length === 0) return;
    currentLightboxIndex = index;
    currentLightboxPhotoIndex = 0;
    updateLightboxContent();
    lightboxOverlay.classList.add('open');
    lightboxOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('open');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Hentikan pemutaran video jika ada yang sedang berjalan di lightbox
    if (lightboxMediaContainer) {
      lightboxMediaContainer.innerHTML = '';
    }
  }

  function updateLightboxContent() {
    if (currentLightboxIndex < 0) currentLightboxIndex = activeItems.length - 1;
    if (currentLightboxIndex >= activeItems.length) currentLightboxIndex = 0;

    const item = activeItems[currentLightboxIndex];
    if (!item) return;

    if (lightboxCategory) lightboxCategory.textContent = item.categoryLabel || 'Dokumentasi';
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDesc) lightboxDesc.textContent = item.description;

    // Jika item adalah video
    if (isVideoItem(item)) {
      const videoInfo = parseVideoSource(item.videoUrl || item.video || '');
      if (lightboxCounter) lightboxCounter.textContent = `🎬 ${videoInfo.badgeLabel}`;
      if (lightboxPrevBtn) lightboxPrevBtn.style.display = 'none';
      if (lightboxNextBtn) lightboxNextBtn.style.display = 'none';

      if (lightboxMediaContainer) {
        lightboxMediaContainer.innerHTML = renderVideoPlayerHtml(videoInfo, item.title, true);
      }
      return;
    }

    // Jika item adalah foto
    const images = getItemImages(item);
    if (currentLightboxPhotoIndex >= images.length) currentLightboxPhotoIndex = 0;

    if (lightboxCounter) lightboxCounter.textContent = images.length
      ? `Foto ${currentLightboxPhotoIndex + 1} dari ${images.length}`
      : 'Belum ada foto';

    // Panah hanya ditampilkan jika kegiatan memiliki lebih dari satu foto.
    const showPhotoNavigation = images.length > 1;
    if (lightboxPrevBtn) lightboxPrevBtn.style.display = showPhotoNavigation ? '' : 'none';
    if (lightboxNextBtn) lightboxNextBtn.style.display = showPhotoNavigation ? '' : 'none';

    if (lightboxMediaContainer) {
      if (images.length) {
        lightboxMediaContainer.innerHTML = `
          <img src="${images[currentLightboxPhotoIndex]}" alt="${item.title} - foto ${currentLightboxPhotoIndex + 1}" class="lampiran-lightbox-img" onerror="handleLampiranImgError(this, '${item.categoryLabel}', true);">
        `;
      } else {
        lightboxMediaContainer.innerHTML = getPlaceholderHtml(item.categoryLabel, true);
      }
    }
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) {
        closeLightbox();
      }
    });
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      changeLightboxPhoto(-1);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      changeLightboxPhoto(1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightboxOverlay && lightboxOverlay.classList.contains('open')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        const item = activeItems[currentLightboxIndex];
        if (item && !isVideoItem(item)) changeLightboxPhoto(-1);
      } else if (e.key === 'ArrowRight') {
        const item = activeItems[currentLightboxIndex];
        if (item && !isVideoItem(item)) changeLightboxPhoto(1);
      }
    }
  });

  // Swipe kiri/kanan pada gambar untuk mengganti foto di perangkat sentuh.
  let touchStartX = null;
  if (lightboxMediaContainer) {
    lightboxMediaContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightboxMediaContainer.addEventListener('touchend', (e) => {
      if (touchStartX === null) return;
      const deltaX = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(deltaX) > 45) {
        const item = activeItems[currentLightboxIndex];
        if (item && !isVideoItem(item)) changeLightboxPhoto(deltaX < 0 ? 1 : -1);
      }
      touchStartX = null;
    }, { passive: true });
  }

  // Initial render
  updateGallery();
}
