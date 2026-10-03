(async () => {
  let checks = 0;
  const $ = s => document.querySelector(s);
  const all = s => [...document.querySelectorAll(s)];
  const ok = (value, label) => { if (!value) throw Error(label); checks++; };
  const settle = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const click = async s => { const el = $(s); if (!el) throw Error('Missing ' + s); el.focus(); el.click(); await settle(); };
  const select = async (s, value) => { $(s).value = value; $(s).dispatchEvent(new Event('change', {bubbles:true})); await settle(); };
  const layout = label => {
    ok(document.documentElement.scrollWidth <= document.documentElement.clientWidth, label + ' page overflow');
    if ($('#detail').open) ok($('#detail').scrollWidth <= $('#detail').clientWidth, label + ' dialog overflow');
  };
  if ($('#detail').open) await click('#detail [data-close]');
  for (const lang of ['en','ja','zh-Hans']) {
    await click('#app [data-lang="' + lang + '"]');
    await click('[data-reset]');
    ok(all('.dish').length === 32, '32 menus'); layout('menu');
    for (const [spice, count] of [[0,11],[1,4],[2,4]]) {
      await click('[data-quick-spice="'+spice+'"]');
      ok(all('.dish').length === count, 'exact spice count'); layout('filter');
    }
    await click('[data-quick-spice="0"]'); await select('#country','JP');
    ok(all('.dish').length === 3, 'country intersection');
    await click('[data-guide]'); layout('guide spice');
    ok(!$('#detail [data-guide-goal]'), 'no budget or pairing feature');
    for (const spice of [0,1,2]) {
      await click('#detail [data-guide-spice="'+spice+'"]');
      ok(all('#detail .guide-choice').length === 3, '3 guide choices'); layout('choices');
      ok(all('#detail .guide-choice .spice').every(e=>e.classList.contains('spice-'+spice)), 'guide exact spice');
      if (spice === 0) ok(!$('#detail .spice svg'), 'no peppers on non-spicy choices');
      await click('#detail [data-guide-choice="0"]');
      ok(all('#detail h3[lang="ko"]').length === 1, 'one Korean dish for staff'); layout('guide staff');
      await click('#detail [data-guide-back="results"]'); await click('#detail [data-guide-back="spice"]');
    }
    await click('#detail [data-close]'); ok(document.activeElement.hasAttribute('data-guide'), 'guide focus restored');
    ok(all('.dish').length === 3 && $('#country').value === 'JP', 'full menu filters preserved');
    await click('[data-reset]'); await select('#country','VN');
    ok(all('.dish').length === 1 && $('#dish-M009'), 'Vietnam favorite'); layout('Vietnam');
    await click('[data-reset]');
    await click('[data-ingredient-help]'); ok(!$('#detail .staff-question'), 'no assumed dietary preference');
    for (const question of ['meat','allergy']) {
      await click('#detail [data-ingredient-question="'+question+'"]');
      ok($('#detail .staff-question [lang="ko"]').textContent.length > 20, 'Korean question'); layout('ingredient question');
    }
    await click('#detail [data-close]'); ok(document.activeElement.hasAttribute('data-ingredient-help'), 'help focus restored');
    ok(all('[data-avoid]:disabled').length === 11, 'unverified exclusion disabled');
    await click('[data-detail="M006"]'); layout('ingredients'); await click('#detail [data-staff]'); layout('staff'); await click('#detail [data-close]');
    await click('[data-photo="M006"]'); ok(!!$('#detail .expanded-photo'), 'photo zoom'); layout('photo'); await click('#detail [data-close]');
    for (const page of ['how','visit']) { await click('[data-page="'+page+'"]'); layout(page); }
    await click('[data-home]');
  }
  await click('#app [data-lang="en"]');
  window.scrollTo(0,0);
  return {checks, width:innerWidth, height:innerHeight, menus:all('.dish').length};
})();
