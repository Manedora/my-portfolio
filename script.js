const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'بستن منو' : 'باز کردن منو');
  menuButton.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) {
      menuButton.textContent = '☰';
      menuButton.setAttribute('aria-label', 'باز کردن منو');
    }
  });
});

const typedElement = document.querySelector('.typed');
if (typedElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = (typedElement.dataset.words || '').split(',');
  let wordIndex = 0, charIndex = words[0]?.length || 0, deleting = true;
  function typeLoop() {
    const word = words[wordIndex];
    if (!word) return;
    if (deleting) {
      charIndex--;
      typedElement.textContent = word.slice(0, Math.max(0, charIndex));
      if (charIndex <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeLoop, 350);
        return;
      }
    } else {
      const nextWord = words[wordIndex];
      charIndex++;
      typedElement.textContent = nextWord.slice(0, charIndex);
      if (charIndex >= nextWord.length) {
        deleting = true;
        setTimeout(typeLoop, 1500);
        return;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 85);
  }
  setTimeout(typeLoop, 1600);
}

document.getElementById('year').textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => observer.observe(section));
}
