
const certificateItems = [
  {
    title: 'Google Project Management Professional Certificate',
    provider: 'Google / Coursera',
    date: 'In Progress',
    theme: 'course'
  },
  {
    title: 'Foundations of Project Management',
    provider: 'Google / Coursera',
    date: 'Mar 23, 2026',
    image: 'assets/certificates/foundations-of-project-management.jpg'
  },
  {
    title: 'Advanced Practical DevOps',
    provider: 'SoftServe Academy',
    date: 'September 19, 2025',
    image: 'assets/certificates/advanced-practical-devops.jpg'
  },
  {
    title: 'Python Fundamentals',
    provider: 'SoftServe Academy',
    date: 'July 11, 2025',
    image: 'assets/certificates/python.png'

  },
  {
    title: 'Database Fundamentals',
    provider: 'SoftServe Academy',
    date: 'April 25, 2025',
    image: 'assets/certificates/database_softserve.png'

  },
  {
    title: 'DevOps II: CI/CD, Containers and Cloud Fundamentals',
    provider: 'SoftServe Academy',
    date: 'February 21, 2025',
    image: 'assets/certificates/devops2.png'

  },
  {
    title: 'DevOps I: Linux and Networks Fundamentals',
    provider: 'SoftServe Academy',
    date: 'December 20, 2024',
    image: 'assets/certificates/devops1.png'
  },
  {
    title: 'Learn SQL Course',
    provider: 'Codecademy',
    date: 'October 16, 2024',
    image: 'assets/certificates/learn-sql.jpg'
  },
  {
    title: 'Менеджмент',
    provider: 'Prometheus',
    date: '13.03.2025',
    image: 'assets/certificates/management.jpg'
  },
  {
    title: 'Зрозуміло про конфлікт інтересів',
    provider: 'Prometheus',
    date: '22.10.2024',
    image: 'assets/certificates/conflict-of-interest.jpg'
  },
  {
    title: 'Критичне мислення в українському контексті',
    provider: 'Prometheus',
    date: '17.10.2024',
    image: 'assets/certificates/critical-thinking.jpg'
  },
  {
    title: 'Децентралізація: від патерналізму до відповідального розвитку',
    provider: 'Prometheus',
    date: '08.10.2024',
    image: 'assets/certificates/decentralization.jpg'
  },
  {
    title: 'Java Development Full Course',
    provider: 'IT Service',
    date: '2015',
  }
];

const certificateGrid = document.getElementById('certificateGrid');
const modal = document.getElementById('certificateModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = [...document.querySelectorAll('.nav a')];

function renderFallbackVisual(item) {
  return `
    <div class="certificate-fallback ${item.theme === 'course' ? 'certificate-fallback--course' : ''}">
      <div class="certificate-fallback-top">
        <span>${item.provider}</span>
        <span>${item.date}</span>
      </div>
      <div class="certificate-fallback-body">
        <h3>${item.title}</h3>
        <strong>Vladyslav Yashchenko</strong>
      </div>
      <div class="certificate-fallback-footer">
        <span>${item.series || ''}</span>
        <span>${item.theme === 'course' ? '' : 'Certificate'}</span>
      </div>
    </div>
  `;
}

function renderCertificates() {
  certificateGrid.innerHTML = certificateItems
    .map((item, index) => {
      const visual = item.image
        ? `<div class="certificate-visual"><img src="${item.image}" alt="${item.title}" loading="lazy" /></div>`
        : `<div class="certificate-visual">${renderFallbackVisual(item)}</div>`;

      return `
        <article class="certificate-card reveal-child" data-index="${index}" tabindex="0" aria-label="Open ${item.title}">
          ${visual}
          <div class="certificate-copy">
            <h3>${item.title}</h3>
            <div class="certificate-meta">
              <span>${item.provider}</span>
              <span>${item.date}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function openModal(index) {
  const item = certificateItems[index];
  if (!item) return;

  const visual = item.image
    ? `<div class="modal-image-wrap"><img src="${item.image}" alt="${item.title}" /></div>`
    : `<div class="certificate-visual">${renderFallbackVisual(item)}</div>`;

  modalContent.innerHTML = `
    ${visual}
    <div class="modal-text">
      <h3>${item.title}</h3>
      <p>${item.provider} · ${item.date}</p>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

renderCertificates();

certificateGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.certificate-card');
  if (!card) return;
  openModal(Number(card.dataset.index));
});

certificateGrid.addEventListener('keydown', (event) => {
  const card = event.target.closest('.certificate-card');
  if (!card) return;
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openModal(Number(card.dataset.index));
  }
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen && !modal.classList.contains('open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (!modal.classList.contains('open')) {
      document.body.classList.remove('menu-open');
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
