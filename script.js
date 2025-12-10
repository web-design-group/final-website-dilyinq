document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.collections-grid');
  const leftBtn = document.querySelector('.arrow.left');
  const rightBtn = document.querySelector('.arrow.right');

  if (!grid || !leftBtn || !rightBtn) return;
  
  const cardWidth = 450;
  const gap = 30;
  const scrollAmount = cardWidth + gap;

  rightBtn.addEventListener('click', () => {
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  leftBtn.addEventListener('click', () => {
    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}` || 
          link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});