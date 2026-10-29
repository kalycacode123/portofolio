/**
 * Portfolio Kalyca Suganda — versi statis (tanpa backend).
 * Berisi: data, rendering section Skills & Projects, navigasi,
 * scroll reveal, scroll spy, dan validasi form contact.
 */

'use strict';

/* ============================== Data ============================== */

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/kalycacode123' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kalyca-suganda-b50276441?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Instagram', url: 'https://www.instagram.com/kalyca.suganda' },
];

const SKILL_CATEGORIES = ['Pemrograman Web', 'Dasar Pemrograman', 'Tools & Aplikasi'];

const SKILLS = [
  { name: 'HTML5', category: 'Pemrograman Web', icon: 'html5/e34f26', level: 75 },
  { name: 'CSS3', category: 'Pemrograman Web', icon: 'css3/1572b6', level: 70 },
  { name: 'JavaScript Dasar', category: 'Pemrograman Web', icon: 'javascript/F7DF1E', level: 65 },
  { name: 'Logika & Algoritma', category: 'Dasar Pemrograman', icon: 'powershell/5391FE', level: 75 },
  { name: 'C / C++ (Dasar)', category: 'Dasar Pemrograman', icon: 'c/A8B9CC', level: 60 },
  { name: 'Python (Dasar)', category: 'Dasar Pemrograman', icon: 'python/3776AB', level: 60 },
  { name: 'VS Code', category: 'Tools & Aplikasi', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', level: 80 },
  { name: 'Git & GitHub', category: 'Tools & Aplikasi', icon: 'github/e2e8f0', level: 65 },
  { name: 'Figma (Dasar)', category: 'Tools & Aplikasi', icon: 'figma/F24E1E', level: 60 },
];

const PROJECTS = [
  {
    title: 'Website Portofolio Tugas Kuliah',
    category: 'Tugas Web',
    description:
      'Halaman portofolio pribadi responsif yang dibuat untuk tugas mata kuliah pemrograman web menggunakan HTML semantik, tata letak CSS, dan interaktivitas JavaScript.',
    image: 'images/project-blog-platform.svg',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: '#home',
    githubUrl: 'https://github.com/kalycacode123',
  },
  {
    title: 'Aplikasi To-Do List Sederhana',
    category: 'Tugas Praktikum',
    description:
      'Latihan membuat aplikasi pencatat daftar kegiatan dan tugas harian mahasiswa sederhana dengan fitur tambah tugas, penanda selesai, dan simpan data di browser.',
    image: 'images/project-task-management.svg',
    technologies: ['HTML5', 'CSS3', 'JavaScript Dasar'],
    liveUrl: '#projects',
    githubUrl: 'https://github.com/kalycacode123',
  },
  {
    title: 'Mockup Halaman Toko Online Sederhana',
    category: 'Latihan Desain Web',
    description:
      'Tugas latihan merancang tampilan katalog produk sederhana untuk melatih pemahaman grid kartu produk responsif dan navigasi halaman toko online.',
    image: 'images/project-ecommerce.svg',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    liveUrl: '#projects',
    githubUrl: 'https://github.com/kalycacode123',
  },
];

/* ============================== Ikon SVG ============================== */

const ICONS = {
  external:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  github:
    '<img class="brand-icon" src="https://cdn.simpleicons.org/github/94a3b8" alt="" width="18" height="18" loading="lazy" />',
  check:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  alert:
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
};

/* ============================== Rendering ============================== */

/** Render card project ke #projects-grid. */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(
    (project, index) => `
      <article class="project-card glass reveal" style="transition-delay: ${index * 0.1}s">
        <div class="project-thumb">
          <span class="project-category">${project.category}</span>
          <img src="${project.image}" alt="Screenshot project ${project.title}" width="800" height="450" loading="lazy" />
        </div>
        <div class="project-body">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <ul class="tech-list" aria-label="Teknologi ${project.title}">
            ${project.technologies.map((tech) => `<li class="tech-badge">${tech}</li>`).join('')}
          </ul>
          <div class="project-actions">
            <a class="btn btn-primary btn-sm" href="${project.liveUrl}">
              Lihat Demo ${ICONS.external}
            </a>
            <a class="btn btn-ghost btn-sm" href="${project.githubUrl}" target="_blank" rel="noreferrer noopener">
              GitHub ${ICONS.github}
            </a>
          </div>
        </div>
      </article>`
  ).join('');
}

/** URL ikon skill: full URL dipakai langsung, selain itu dari simpleicons CDN. */
function skillIconUrl(skill) {
  if (skill.icon.startsWith('http')) return skill.icon;
  return `https://cdn.simpleicons.org/${skill.icon}`;
}

/** Render grouped skill card ke #skills-groups. */
function renderSkills() {
  const wrapper = document.getElementById('skills-groups');
  if (!wrapper) return;

  const groups = SKILL_CATEGORIES.map((category) => ({
    category,
    items: SKILLS.filter((skill) => skill.category === category),
  })).filter((group) => group.items.length > 0);

  wrapper.innerHTML = groups
    .map(
      (group, groupIndex) => `
      <div class="skill-group reveal" style="transition-delay: ${groupIndex * 0.08}s">
        <div class="skill-group-head">
          <h3>${group.category}</h3>
          <span class="line" aria-hidden="true"></span>
          <span class="count">${group.items.length} skill</span>
        </div>
        <div class="skills-grid">
          ${group.items
            .map(
              (skill) => `
            <article class="skill-card glass" aria-label="${skill.name}, kategori ${skill.category}">
              <div class="skill-icon">
                <img src="${skillIconUrl(skill)}" alt="" width="26" height="26" loading="lazy" />
              </div>
              <h4>${skill.name}</h4>
              <span class="skill-category">${skill.category}</span>
              <div class="skill-bar" style="--level: ${skill.level}%" role="progressbar"
                   aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100"
                   aria-label="Penguasaan ${skill.name}">
                <span></span>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </div>`
    )
    .join('');
}

/* ============================== Scroll Reveal ============================== */

function initReveal() {
  const targets = document.querySelectorAll('.reveal');

  const show = (element) => {
    element.classList.add('visible');
    element.querySelectorAll('.skill-bar').forEach((bar) => bar.classList.add('animate'));
  };

  if (!('IntersectionObserver' in window)) {
    targets.forEach(show);
    return;
  }

  /*
   * Elemen yang sudah berada di viewport saat halaman dimuat
   * langsung ditampilkan agar konten tidak pernah tersembunyi.
   */
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const pending = [];

  targets.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const inViewport = rect.top < viewportHeight && rect.bottom > 0;
    if (inViewport) show(element);
    else pending.push(element);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  pending.forEach((element) => revealObserver.observe(element));
}

/* ============================== Header & Navigasi ============================== */

function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initScrollSpy() {
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const links = Array.from(document.querySelectorAll('a.menu-link'));
  if (!sections.length || !links.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const onScroll = () => {
    const offset = window.scrollY + 140;
    let current = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop <= offset) current = section.id;
    });

    setActive(current);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('hamburger-icon');
  if (!hamburger || !menu || !icon) return;

  const MENU_ICON =
    '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>';
  const CLOSE_ICON = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';

  const closeMenu = () => {
    menu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Buka menu navigasi');
    icon.innerHTML = MENU_ICON;
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    menu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Tutup menu navigasi');
    icon.innerHTML = CLOSE_ICON;
    document.body.classList.add('menu-open');
  };

  hamburger.addEventListener('click', () => {
    if (menu.classList.contains('open')) closeMenu();
    else openMenu();
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900 && menu.classList.contains('open')) closeMenu();
  });
}

/* ============================== Form Contact ============================== */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(name, value) {
  const trimmed = value.trim();

  if (name === 'name') return trimmed.length >= 2;
  if (name === 'email') return EMAIL_PATTERN.test(trimmed);
  if (name === 'message') return trimmed.length >= 10;
  return true;
}

function setFieldState(input, isValid) {
  const field = input.closest('.field');
  if (!field) return;
  field.classList.toggle('invalid', !isValid);
  input.setAttribute('aria-invalid', String(!isValid));
}

function showStatus(type, message) {
  const status = document.getElementById('form-status');
  if (!status) return;

  status.className = `form-status show ${type}`;
  status.innerHTML = `${type === 'success' ? ICONS.check : ICONS.alert}<span>${message}</span>`;
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitLabel = document.getElementById('submit-label');
  if (!form || !submitBtn || !submitLabel) return;

  const inputs = Array.from(form.querySelectorAll('input, textarea'));

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.closest('.field').classList.contains('invalid')) {
        setFieldState(input, validateField(input.name, input.value));
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isFormValid = true;

    inputs.forEach((input) => {
      const isValid = validateField(input.name, input.value);
      setFieldState(input, isValid);
      if (!isValid && isFormValid) {
        isFormValid = false;
        input.focus();
      }
    });

    if (!isFormValid) {
      showStatus('error', 'Mohon lengkapi field yang masih kosong atau tidak valid.');
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = 'Mengirim...';

    /*
     * Versi statis: pengiriman pesan disimulasikan.
     * Bila nanti punya backend, ganti blok setTimeout dengan:
     *   fetch('http://localhost:5000/api/contact', { ... })
     */
    window.setTimeout(() => {
      showStatus('success', 'Pesan berhasil dikirim. Terima kasih sudah menghubungi saya!');
      form.reset();
      inputs.forEach((input) => setFieldState(input, true));
      submitBtn.disabled = false;
      submitLabel.textContent = 'Kirim Pesan';
    }, 900);
  });
}

/* ============================== Inisialisasi ============================== */

function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

function initSmoothAnchor() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    if (link.classList.contains('skip-link')) return;

    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', targetId);
    });
  });
}

function initProfilePhotoHarmony() {
  const images = document.querySelectorAll('.hero-photo img, .about-photo');
  if (!images.length) return;

  images.forEach((img) => {
    const process = () => {
      if (img.dataset.processed === 'true') return;

      try {
        const canvas = document.createElement('canvas');
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        if (!w || !h) return;

        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        let modified = false;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const maxGB = Math.max(g, b);
          const diff = r - maxGB;

          // Deteksi background merah pasfoto: R tinggi, G & B rendah, selisih dominan
          if (r > 110 && maxGB < 70 && diff > 45) {
            modified = true;
            if (diff > 75) {
              data[i + 3] = 0; // Transparan penuh
            } else {
              // Penghalusan tepi & despill merah
              const ratio = Math.max(0, (75 - diff) / 30);
              data[i + 3] = Math.round(data[i + 3] * ratio);
              data[i] = maxGB;
            }
          } else if (maxGB < 45 && r > maxGB + 20) {
            // Despill sisa pantulan merah di tepi hijab/bahu
            data[i] = maxGB;
          }
        }

        if (modified) {
          ctx.putImageData(imgData, 0, 0);
          img.dataset.processed = 'true';
          img.src = canvas.toDataURL('image/png');
          img.classList.remove('profile-blend-filter');
        }
      } catch (err) {
        // Fallback filter SVG jika canvas dibatasi pada file:/// browser lokal
        img.classList.add('profile-blend-filter');
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      process();
    } else {
      img.addEventListener('load', process, { once: true });
    }
  });
}

function init() {
  renderProjects();
  renderSkills();
  initReveal();
  initHeader();
  initScrollSpy();
  initMobileMenu();
  initContactForm();
  initYear();
  initSmoothAnchor();
  initProfilePhotoHarmony();
}

document.addEventListener('DOMContentLoaded', init);
