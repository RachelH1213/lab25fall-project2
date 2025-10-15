(function () {
  const GROUPS = ['type','era','album','mood','theme'];

  
  const ALLOWED = {
    mood:  ['energetic','calm','dark','other'],
    theme: ['love','breakup','self','memory','escape','other']
  };
  const FIXED = new Set(['mood','theme']); 

  const searchInput = document.getElementById('search');
  const cards = Array.from(document.querySelectorAll('.post-card'));
  const filtersWrap = document.getElementById('filters');
  const clearBtn = document.getElementById('clear-filters');

  const parseTags = str => (str||'').split(' ').filter(Boolean);
  const norm = s => (s||'').toLowerCase();

  
  const options = Object.fromEntries(GROUPS.map(g => [g, new Set()]));
  
  cards.forEach(card => {
    parseTags(card.getAttribute('data-tags')).forEach(t => {
      const [g,v] = t.toLowerCase().split(':',2);
      if (!GROUPS.includes(g) || !v) return;
      if (FIXED.has(g)) return; 
      options[g].add(v);
    });
  });
  
  for (const [g, list] of Object.entries(ALLOWED)) {
    list.forEach(v => options[g].add(v));
  }


  const active = Object.fromEntries(GROUPS.map(g => [g, new Set()]));
  GROUPS.forEach(g => {
    if (options[g].size === 0) return;
    const box = document.createElement('div');
    box.className = 'filter-group';
    const h = document.createElement('h3'); h.textContent = g.toUpperCase();
    box.appendChild(h);

    Array.from(options[g]).sort().forEach(val => {
      const b = document.createElement('button');
      b.className = 'tag-btn small';
      b.dataset.group = g; b.dataset.value = val;
      b.textContent = `${g}:${val}`;
      b.onclick = () => {
        const set = active[g];
        if (set.has(val)) { set.delete(val); b.classList.remove('is-active'); }
        else { set.add(val); b.classList.add('is-active'); }
        apply();
      };
      box.appendChild(b);
    });
    filtersWrap.appendChild(box);
  });

  function match(card){
    const tags = new Set(parseTags(card.getAttribute('data-tags')).map(norm));
    const q = norm(searchInput?.value);
    const title = norm(card.getAttribute('data-title'));
    if (q && !title.includes(q)) return false;

    for (const g of GROUPS){
      const sel = active[g];
      if (sel.size === 0) continue;
      let ok = false;
      for (const v of sel){ if (tags.has(`${g}:${v}`)) { ok = true; break; } }
      if (!ok) return false;
    }
    return true;
  }

  function apply(){ cards.forEach(c => c.style.display = match(c) ? '' : 'none'); }

  searchInput && searchInput.addEventListener('input', apply);
  clearBtn && clearBtn.addEventListener('click', () => {
    GROUPS.forEach(g => active[g].clear());
    filtersWrap.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('is-active'));
    if (searchInput) searchInput.value = '';
    apply();
  });
})();