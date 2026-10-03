import {JSDOM} from 'jsdom';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./',import.meta.url));
const dom=new JSDOM(fs.readFileSync(root+'dist/index.html','utf8'),{url:'https://menu.test/'});
const w=dom.window;
for(const k of ['window','document','location','history'])globalThis[k]=w[k]??w;
let desktop=false;globalThis.matchMedia=()=>({matches:desktop});globalThis.scrollY=0;globalThis.scrollTo=w.scrollTo=()=>{};
w.HTMLElement.prototype.scrollIntoView=()=>{};
w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
w.HTMLDialogElement.prototype.close=function(){this.open=false;};
const tick=()=>new Promise(r=>setTimeout(r,5));
const $=s=>w.document.querySelector(s), $$=s=>[...w.document.querySelectorAll(s)];
const count=()=>$$('.dish').length;
let registered;w.document.modelContext={registerTool(t){registered=t;}};
await import(new URL('./dist/app.js',import.meta.url).href);
assert.equal(count(),32);assert.equal($$('.recommendation-badge').length,7);assert.equal($$('.recommendation-badge img').length,0);
assert.equal($$('.spice-0 svg,.spice-null svg').length,0);
assert.ok($$('.spice-1').every(e=>e.querySelectorAll('svg').length===1));
assert.ok($$('.spice-2').every(e=>e.querySelectorAll('svg').length===2));
assert.equal($$('[data-avoid]:disabled').length,11);
$('.filter-panel').open=true;await tick();
const select=async(id,value)=>{$('[data-'+id+'="'+value+'"]').click();await tick();assert.equal($('.filter-panel').open,true);};
const selected=id=>$('#'+id+' [aria-pressed="true"]').dataset[id];
for(const [v,n] of [['0',11],['1',4],['2',4]]){await select('spice',v);assert.equal(count(),n);assert.ok($$('.dish .spice').every(e=>e.classList.contains('spice-'+v)));assert.equal($('.filter-results').textContent,`${n} menus found`);}
await select('spice','');await select('country','JP');assert.equal(count(),3);
assert.equal($$('.category-links a').length,2);assert.ok($$('.category-links a').every(a=>$(a.getAttribute('href'))));
await select('spice','2');assert.equal(count(),0);assert.ok($('.empty'));assert.equal($$('.category-links a').length,0);
$('[data-reset]').click();await tick();assert.equal(count(),32);assert.equal(selected('spice'),'');assert.equal(selected('country'),'all');
await select('spice','1');$('[data-lang="ja"]').click();await tick();assert.equal(count(),4);assert.equal(selected('spice'),'1');assert.ok($('.filter-panel').open);assert.equal($('.filter-results').textContent,'4件のメニュー');
$('[data-lang="zh-Hans"]').click();await tick();assert.equal($('.filter-results').textContent,'找到 4 道菜品');
$('[data-avoid="pork"]').click();assert.equal(count(),4);
const result=registered.execute({avoid:[],maxSpice:1});assert.equal(result.items.length,15);assert.equal(count(),15);await tick();assert.equal($('#spice [aria-pressed="true"]').textContent,'最多微辣');
// Country selection and optional tool results must describe the same visible dishes.
await select('country','JP');
const intersected=registered.execute({avoid:[],maxSpice:1});
assert.deepEqual(intersected.items.map(d=>d.id),$$('.dish').map(e=>e.id.replace('dish-','')));
assert.equal(count(),3);
// Navigation stays usable on desktop; mobile category closes after selection.
$('[data-reset]').click();desktop=true;$('[data-page="menu"]').click();
assert.ok($('#category-menu').open);$('[data-category="fried"]').click();assert.ok($('#category-menu').open);
desktop=false;$('[data-page="menu"]').click();$('#category-menu').open=true;
$('[data-category="fried"]').click();assert.equal($('#category-menu').open,false);
// Dialog modes, language switching, Escape cleanup, photo and information pages.
$('[data-detail="M006"]').focus();$('[data-detail="M006"]').click();assert.ok($('#detail').open);assert.equal(new URL(w.location).searchParams.get('menu'),'M006');
$('#detail [data-lang="ja"]').click();assert.ok($('#detail-title').textContent);assert.equal(w.document.activeElement.dataset.lang,'ja');
$('#detail [data-staff]').click();assert.ok($('#detail-title').textContent.includes('떡볶이'));
$('#detail').dispatchEvent(new w.Event('cancel',{cancelable:true}));assert.equal($('#detail').open,false);assert.equal(new URL(w.location).searchParams.has('menu'),false);assert.equal(w.document.activeElement.dataset.detail,'M006');
$('[data-photo="M006"]').click();assert.ok($('#detail .expanded-photo'));$('#detail [data-close]').click();
for(const [page,n] of [['how',5],['visit',2]]){$('[data-page="'+page+'"]').click();assert.equal($$('.information-block').length,n);}
$('[data-home]').click();assert.equal(count(),32);
console.log('PASS DOM interactions: filters and counts, three languages, recommendations, spice icons, country/tool consistency, desktop/mobile navigation, dialogs, photo zoom, store information.');
// Quick filters share exact spice and country state with the full form.
$('[data-quick-spice="0"]').click();assert.equal(count(),11);assert.equal(selected('spice'),'0');
await select('country','JP');assert.equal(count(),3);
$('[data-lang="en"]').click();assert.equal($('[data-quick-spice="0"]').getAttribute('aria-pressed'),'true');
$('[data-quick-spice="2"]').click();assert.equal(count(),0);
$('[data-reset]').click();assert.equal(count(),32);
assert.equal($$('[data-show-staff]').length,32);
$('[data-show-staff="M006"]').focus();$('[data-show-staff="M006"]').click();
assert.ok($('#detail').open);assert.ok($('#detail-title').textContent.includes('떡볶이'));
$('#detail [data-lang="ja"]').click();$('#detail [data-close]').click();
assert.equal(w.document.activeElement.dataset.showStaff,'M006');
assert.ok($('#spice').compareDocumentPosition($('.ingredient-section')) & w.Node.DOCUMENT_POSITION_FOLLOWING);
console.log('PASS Quick filters preserve country/language state; direct staff view restores focus after language switching.');
// Guided menu choice preserves language, spice and keyboard navigation.
$('[data-guide]').focus();$('[data-guide]').click();assert.ok($('#detail').open);
assert.equal($('#detail [data-guide-goal]'),null);
$('#detail [data-guide-spice="2"]').click();assert.equal($$('#detail .guide-choice').length,3);
$('#detail [data-lang="zh-Hans"]').click();assert.ok($('#detail .guide-selection').textContent.includes('辣'));
$('#detail [data-guide-choice="0"]').click();assert.equal($$('#detail .guide-item h3[lang="ko"]').length,1);
assert.ok($('#detail .guide-item h3').textContent.includes('떡볶이'));
$('#detail [data-guide-back="results"]').click();$('#detail [data-guide-back="spice"]').click();$('#detail [data-guide-spice="1"]').click();assert.equal($$('#detail .guide-choice').length,3);
$('#detail [data-guide-back="spice"]').click();$('#detail [data-guide-spice="0"]').click();assert.equal($$('#detail .guide-choice').length,3);
$('#detail [data-close]').click();assert.ok(w.document.activeElement.hasAttribute('data-guide'));
$('[data-ingredient-help]').focus();$('[data-ingredient-help]').click();assert.equal($('#detail .staff-question'),null);
$('#detail [data-ingredient-question="meat"]').click();assert.ok($('#detail .staff-question [lang="ko"]').textContent.includes('고기나 생선'));
$('#detail [data-lang="en"]').click();assert.ok($('#detail .staff-question'));$('#detail [data-ingredient-question="allergy"]').click();assert.ok($('#detail .staff-question [lang="ko"]').textContent.includes('교차 접촉'));
$('#detail').dispatchEvent(new w.Event('cancel',{cancelable:true}));assert.ok(w.document.activeElement.hasAttribute('data-ingredient-help'));
assert.equal($$('[data-avoid]:disabled').length,11);assert.equal(count(),32);
console.log('PASS Guided dish choices, back navigation, language retention, staff questions and focus restoration.');
// A collapsed form must not hide active conditions or prevent selective clearing.
for(const lang of ['en','ja','zh-Hans']){
 $('[data-lang="'+lang+'"]').click();$('[data-reset]').click();
 await select('spice','0');await select('country','JP');
 $('.filter-panel').open=false;await tick();
 assert.equal(count(),3);assert.equal($$('[data-clear-filter]').length,2);
 assert.ok($('[data-clear-filter="country"]').getAttribute('aria-label'));
 $('[data-clear-filter="spice"]').click();await tick();
 assert.equal(selected('country'),'JP');assert.equal(selected('spice'),'');assert.equal(count(),3);
 assert.equal($('.filter-panel').open,false);assert.equal(w.document.activeElement.dataset.clearFilter,'country');
 $('[data-clear-filter="country"]').click();await tick();
 assert.equal(count(),32);assert.equal($('.active-filters'),null);assert.ok(w.document.activeElement.hasAttribute('data-quick-spice'));
 assert.equal($('#app [data-ingredient-help]').closest('details'),null);
 $('[data-ingredient-help]').click();assert.ok($('#detail').open);$('#detail [data-close]').click();
 assert.equal($$('#app [data-lang]').length,3);
}
// Maximum-level integrations must not be mislabeled as exact-level filters.
registered.execute({avoid:['pork'],maxSpice:1});
assert.equal(count(),0);assert.ok($('[data-clear-filter="spice"]'));
$('[data-clear-filter="avoid-pork"]').click();assert.equal(count(),15);
$('[data-clear-filter="spice"]').click();assert.equal(count(),32);
console.log('PASS Visible filter chips clear one condition, preserve remaining filters and collapsed state, restore focus, and expose ingredient help in three languages.');
for(const lang of ['en','ja','zh-Hans']){
 $('[data-lang="'+lang+'"]').click();
 assert.equal($$('select').length,0);
 for(const scope of ['#spice','.quick-spice']){
  const buttons=$$(scope+' button');
  assert.equal(buttons.length,4);
  assert.equal(buttons[1].querySelectorAll('.pepper-art svg').length,0);
  assert.equal(buttons[2].querySelectorAll('.pepper-art svg').length,1);
  assert.equal(buttons[3].querySelectorAll('.pepper-art svg').length,2);
 }
 assert.equal($$('#country .country-flag').length,3);
 assert.equal($$('.ingredient-options button:disabled .button-art svg').length,11);
 assert.ok($('#ingredient-filter-status').textContent);
 $('[data-ingredient-contact]').focus();$('[data-ingredient-contact]').click();
 $('#detail [data-lang="en"]').click();$('#detail [data-close]').click();
 assert.ok(w.document.activeElement.hasAttribute('data-ingredient-contact'));
}
console.log('PASS Illustrated exact-spice buttons, flags, disabled ingredient icons and contextual help focus.');
dom.window.close();
