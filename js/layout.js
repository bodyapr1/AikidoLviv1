// Спільні шапка й підвал для всіх сторінок
const NAV = [
  ['index.html#about', 'Про айкідо'], ['news.html', 'Новини'], ['seminars.html', 'Семінари'],
  ['instructors.html', 'Інструктори'], ['halls.html', 'Зали'], ['exam.html', 'Іспити']
];
const page = location.pathname.split('/').pop() || 'index.html';
document.getElementById('site-header').outerHTML = `
<header class="site-header" id="top"><div class="wrap bar">
  <a class="brand" href="index.html" aria-label="Академія Айкібудзюцу, головна">
    <span class="hanko" aria-hidden="true">合</span>
    <span class="brand-text">Академія Айкібудзюцу<small>Айкідо Йосінкан, Львів</small></span></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="nav">Меню</button>
  <nav id="nav" class="nav" aria-label="Основна навігація">
    ${NAV.map(([h, t]) => `<a href="${h}"${h === page ? ' class="active"' : ''}>${t}</a>`).join('')}
    <a href="index.html#contacts" class="nav-cta">Пробне заняття</a>
  </nav></div></header>`;
document.getElementById('site-footer').outerHTML = `
<footer class="site-footer"><div class="wrap foot">
  <p>© ${new Date().getFullYear()} Львівська обласна академія традиційних бойових мистецтв</p>
  <a href="#top">Нагору</a></div></footer>`;

const btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
btn.addEventListener('click', () => btn.setAttribute('aria-expanded', nav.classList.toggle('open')));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); } });