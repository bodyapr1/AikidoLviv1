// Статична версія: усі дані беруться з js/data.js, сервер не потрібен
const fmt = (iso, o) => new Date(iso).toLocaleDateString('uk-UA', o);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const longDate = { day: 'numeric', month: 'long', year: 'numeric' };
const $ = id => document.getElementById(id);
const nl = s => esc(s).replace(/\n/g, '<br>');
const initials = n => n.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

function renderNews(items, box) {
  box.innerHTML = items.length ? items.map(n => `
    <a class="news-card" href="news.html?id=${encodeURIComponent(n.id)}">
      <time datetime="${esc(n.date)}">${fmt(n.date, longDate)}</time>
      <h3>${esc(n.title)}</h3><p>${esc(String(n.text).split(/\n\s*\n/)[0])}</p></a>`).join('') : '<p class="muted">Новин поки немає.</p>';
}

function renderEvents(items, box) {
  box.innerHTML = items.length ? items.map(e => `
    <li><time class="ev-date" datetime="${esc(e.date)}">${fmt(e.date, { day: 'numeric', month: 'short' })}<br>${new Date(e.date).getFullYear()}</time>
    <div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></div></li>`).join('') : '<li><p>Найближчих подій поки немає.</p></li>';
}

(function () {
  if ($('news-list')) {
    const all = (typeof NEWS !== 'undefined' ? NEWS : []).slice().sort(byDateDesc);
    const id = new URLSearchParams(location.search).get('id');
    const one = id && all.find(n => String(n.id) === id);
    const onNewsPage = /news(\.html)?$/.test(location.pathname);
    if (one) {
      document.title = one.title + ' — Айкідо Львів';
      $('news-list').className = 'article';
      $('news-list').innerHTML = `<a class="back" href="news.html">← Усі новини</a><br><time class="muted" datetime="${esc(one.date)}">${fmt(one.date, longDate)}</time><h2>${esc(one.title)}</h2><p>${nl(one.text)}</p>`;
    } else {
      renderNews(onNewsPage ? all : all.slice(0, 3), $('news-list'));
    }
  }

  if ($('events-list')) {
    const today = new Date().setHours(0, 0, 0, 0);
    const upcoming = (typeof EVENTS !== 'undefined' ? EVENTS : [])
      .filter(e => new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    renderEvents(upcoming, $('events-list'));
  }

  if ($('instructors-list') && typeof INSTRUCTORS !== 'undefined' && INSTRUCTORS.length) {
    $('instructors-list').innerHTML = INSTRUCTORS.map(i => `
      <article class="card"><div class="avatar">${esc(initials(i.name))}</div><h3>${esc(i.name)}</h3>
      ${i.role ? `<p class="role">${esc(i.role)}</p>` : ''}${i.bio ? `<p>${nl(i.bio)}</p>` : ''}
      ${i.link ? `<a class="more" href="${esc(i.link)}">Докладніше</a>` : ''}</article>`).join('');
  }

  if ($('halls-list') && typeof HALLS !== 'undefined' && HALLS.length) {
    $('halls-list').innerHTML = HALLS.map(x => `
      <article class="card"><h3>${esc(x.name)}</h3>${x.address ? `<p>${esc(x.address)}</p>` : ''}${x.schedule ? `<p>${nl(x.schedule)}</p>` : ''}</article>`).join('');
  }
})();
