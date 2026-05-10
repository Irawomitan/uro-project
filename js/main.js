// NAV TOGGLE
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id'); });
  navAs.forEach(a => { a.style.color = a.getAttribute('href') === '#' + current ? 'var(--clay2)' : ''; });
}, { passive: true });

// PDF MODAL
const pdfModal = document.getElementById('pdf-modal');
const pdfFrame = document.getElementById('pdf-frame');
const pdfModalTitle = document.getElementById('pdf-modal-title');
const pdfDlBtn = document.getElementById('pdf-dl-btn');

function openPdf(src, title) {
  if (!src || src === '#') return;
  pdfModalTitle.textContent = title;
  pdfDlBtn.href = src;
  pdfDlBtn.download = src.split('/').pop();
  pdfFrame.src = src;
  pdfModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePdf() {
  pdfModal.classList.remove('open');
  pdfFrame.src = '';
  document.body.style.overflow = '';
}

document.getElementById('pdf-close')?.addEventListener('click', closePdf);
pdfModal?.addEventListener('click', (e) => { if (e.target === pdfModal) closePdf(); });
document.querySelectorAll('.view-pdf-btn').forEach(btn => {
  btn.addEventListener('click', () => openPdf(btn.dataset.src, btn.dataset.title));
});

// CATALOGUE MODAL
const catModal = document.getElementById('cat-modal');
const catModalTitle = document.getElementById('cat-modal-title');
const catModalBody = document.getElementById('cat-modal-body');

const CATALOGUES = {
  flashcards: {
    title: 'Flashcard Sets',
    items: [
      { title: 'Food & Fruit',              file: '/uploads/resources/flashcards-food-fruit.pdf' },
      { title: 'Household & Common Things', file: '/uploads/resources/flashcards-household.pdf' },
      { title: 'Trees, Garden & Nature',    file: '/uploads/resources/flashcards-nature.pdf' },
      { title: 'Uro Numbers',              file: '/uploads/resources/flashcards-numbers.pdf' },
      { title: 'Animals',                  file: '/uploads/resources/flashcards-animals.pdf' },
    ]
  },
  stories: {
    title: 'Community Stories',
    items: [
      { title: 'Journey',              file: '/uploads/resources/story-journey.pdf' },
      { title: 'The Boy from Uro',     file: '/uploads/resources/story-boy-from-uro.pdf' },
      { title: 'The Sun and The Moon', file: '/uploads/resources/story-sun-and-moon.pdf' },
      { title: 'This is My Friend',    file: '/uploads/resources/story-this-is-my-friend.pdf' },
    ]
  },
  games: {
    title: 'Language Games',
    items: [
      { title: 'Uro Game',        url: '/uploads/games/uro-game.html' },
      { title: 'Uro Number Game', url: '/uploads/games/uro-numbers-hub.html' },
    ]
  }
};

function openCatalogue(type) {
  const cat = CATALOGUES[type];
  if (!cat) return;
  catModalTitle.textContent = cat.title;
  catModalBody.innerHTML = cat.items.map(item => {
    const isGame = !!item.url;
    const actionBtn = isGame
      ? `<a href="${item.url}" target="_blank" rel="noopener" class="rc-view">Play &#8594;</a>`
      : `<button class="rc-view" onclick="closeCat();openPdf('${item.file}','${item.title.replace(/'/g,"\\'")}')">View</button>
         <a href="${item.file}" download class="rc-view" style="background:var(--bark2);">&#8595;</a>`;
    return `
      <div class="cat-item">
        <div class="cat-item-info"><h4>${item.title}</h4></div>
        <div class="cat-item-actions">${actionBtn}</div>
      </div>`;
  }).join('');
  catModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCat() {
  catModal.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('fc-btn')?.addEventListener('click', () => openCatalogue('flashcards'));
document.getElementById('st-btn')?.addEventListener('click', () => openCatalogue('stories'));
document.getElementById('gm-btn')?.addEventListener('click', () => openCatalogue('games'));
document.getElementById('cat-close')?.addEventListener('click', closeCat);
catModal?.addEventListener('click', (e) => { if (e.target === catModal) closeCat(); });

// CONTACT FORM — sends via Formspree
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/xeenpzdb', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.innerHTML = `
          <div style="text-align:center;padding:3rem 1rem;">
            <div style="font-family:var(--serif);font-size:1.8rem;color:var(--bark);margin-bottom:0.8rem;">Thank you.</div>
            <p style="color:var(--bark2);font-size:0.95rem;line-height:1.8;">Your message has been received.<br>The team will be in touch shortly.</p>
          </div>`;
      } else {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        alert('Something went wrong. Please email us directly at documentationofuro@gmail.com');
      }
    } catch {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      alert('Something went wrong. Please email us directly at documentationofuro@gmail.com');
    }
  });
}

// NETLIFY IDENTITY
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', user => {
    if (!user) {
      window.netlifyIdentity.on('login', () => { document.location.href = '/admin/'; });
    }
  });
}
